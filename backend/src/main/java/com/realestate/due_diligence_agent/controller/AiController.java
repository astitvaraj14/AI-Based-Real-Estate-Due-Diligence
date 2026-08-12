package com.realestate.due_diligence_agent.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import com.realestate.due_diligence_agent.entity.User;
import com.realestate.due_diligence_agent.entity.Property;
import com.realestate.due_diligence_agent.repository.PropertyRepository;
import com.realestate.due_diligence_agent.service.RiskAssessmentService;
import com.realestate.due_diligence_agent.dto.RiskAssessmentResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final PropertyRepository propertyRepository;
    private final RiskAssessmentService riskAssessmentService;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    public AiController(PropertyRepository propertyRepository, RiskAssessmentService riskAssessmentService) {
        this.propertyRepository = propertyRepository;
        this.riskAssessmentService = riskAssessmentService;
    }

    private User getLoggedInUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> chat(@RequestBody Map<String, String> request) {
        String userMessage = request.get("message");
        User user = getLoggedInUser();
        List<Property> properties;
        if (user.getRole() == com.realestate.due_diligence_agent.entity.Role.ADMIN) {
            properties = propertyRepository.findAll();
        } else {
            properties = propertyRepository.findByUser(user);
        }
        
        String aiResponse = "";
        
        try {
            String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=" + geminiApiKey;
            
            // Build Context
            StringBuilder contextBuilder = new StringBuilder();
            contextBuilder.append("You are PropLens AI, a smart real estate due diligence assistant. ");
            contextBuilder.append("You are helping a user (Role: ").append(user.getRole()).append("). ");
            contextBuilder.append("Here is the JSON data of the properties they can see:\\n");
            
            contextBuilder.append("[");
            for(Property p : properties) {
                contextBuilder.append("{")
                    .append("\\\"title\\\":\\\"").append(p.getTitle() != null ? p.getTitle().replace("\"", "'") : "").append("\\\",")
                    .append("\\\"city\\\":\\\"").append(p.getCity() != null ? p.getCity().replace("\"", "'") : "").append("\\\",")
                    .append("\\\"type\\\":\\\"").append(p.getPropertyType() != null ? p.getPropertyType().replace("\"", "'") : "").append("\\\",")
                    .append("\\\"status\\\":\\\"").append(p.getVerificationStatus() != null ? p.getVerificationStatus().replace("\"", "'") : "").append("\\\",")
                    .append("\\\"score\\\":").append(p.getVerificationScore() != null ? p.getVerificationScore() : 0).append(",")
                    .append("\\\"price\\\":").append(p.getPrice() != null ? p.getPrice() : 0)
                    .append("},");
            }
            contextBuilder.append("]\\n\\n");
            contextBuilder.append("User's Question: ").append(userMessage.replace("\"", "'")).append("\\n\\n");
            contextBuilder.append("Answer the user concisely and accurately based ONLY on the provided properties data. Format nicely in markdown. Do not mention that you were given JSON data.");

            // Create Request Body
            String requestBody = "{\"contents\":[{\"parts\":[{\"text\":\"" + contextBuilder.toString() + "\"}]}]}";
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);
            
            Map<String, Object> geminiResponse = restTemplate.postForObject(url, entity, Map.class);
            
            // Extract the text
            if (geminiResponse != null && geminiResponse.containsKey("candidates")) {
                List<Map<String, Object>> candidates = (List<Map<String, Object>>) geminiResponse.get("candidates");
                if (candidates != null && !candidates.isEmpty()) {
                    Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
                    List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                    if (parts != null && !parts.isEmpty()) {
                        aiResponse = (String) parts.get(0).get("text");
                    }
                }
            }
            
            if (aiResponse == null || aiResponse.isEmpty()) {
                aiResponse = "I'm sorry, I couldn't generate a response based on the data.";
            }

        } catch (Exception e) {
            e.printStackTrace();
            aiResponse = "I'm sorry, I encountered an error connecting to the AI brain. Error: " + e.getMessage();
        }
        
        Map<String, String> response = new HashMap<>();
        response.put("reply", aiResponse);
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/documents/analyze")
    public ResponseEntity<Map<String, Object>> analyzeDocument(
            @RequestParam("file") org.springframework.web.multipart.MultipartFile file,
            @RequestParam("propertyId") Long propertyId) {
        String aiResponse = "";
        Map<String, Object> response = new HashMap<>();
        try {
            String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=" + geminiApiKey;

            byte[] fileBytes = file.getBytes();
            String base64File = java.util.Base64.getEncoder().encodeToString(fileBytes);
            String mimeType = file.getContentType();
            
            if(mimeType == null || mimeType.isEmpty()) {
                mimeType = "image/jpeg";
            }

            String prompt = "You are a Real Estate Due Diligence AI. Analyze this document. Extract the Property ID, Owner Name, Address, and flag any legal anomalies, missing signatures, or risks. " +
                            "You must return ONLY a JSON object (do not wrap it in markdown code blocks). Escape all newlines in the markdownReport string as \\n so it is valid JSON! " +
                            "Structure: " +
                            "{\"markdownReport\": \"Your detailed formatted markdown report here\", " +
                            "\"hasAnomalies\": true/false, " +
                            "\"missingSignatures\": true/false, " +
                            "\"isApproved\": true/false}";
            
            Map<String, Object> textPart = new HashMap<>();
            textPart.put("text", prompt);

            Map<String, Object> inlineData = new HashMap<>();
            inlineData.put("mimeType", mimeType);
            inlineData.put("data", base64File);

            Map<String, Object> blobPart = new HashMap<>();
            blobPart.put("inlineData", inlineData);

            List<Object> parts = java.util.Arrays.asList(textPart, blobPart);

            Map<String, Object> content = new HashMap<>();
            content.put("parts", parts);

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("contents", java.util.Collections.singletonList(content));

            // Force JSON output
            Map<String, Object> generationConfig = new HashMap<>();
            generationConfig.put("responseMimeType", "application/json");
            requestBody.put("generationConfig", generationConfig);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            Map<String, Object> geminiResponse = restTemplate.postForObject(url, entity, Map.class);

            if (geminiResponse != null && geminiResponse.containsKey("candidates")) {
                List<Map<String, Object>> candidates = (List<Map<String, Object>>) geminiResponse.get("candidates");
                if (candidates != null && !candidates.isEmpty()) {
                    Map<String, Object> resContent = (Map<String, Object>) candidates.get(0).get("content");
                    List<Map<String, Object>> resParts = (List<Map<String, Object>>) resContent.get("parts");
                    if (resParts != null && !resParts.isEmpty()) {
                        aiResponse = (String) resParts.get(0).get("text");
                        
                        // Parse JSON response
                        ObjectMapper mapper = new ObjectMapper();
                        try {
                            String cleanJson = aiResponse.trim();
                            if (cleanJson.startsWith("```json")) {
                                cleanJson = cleanJson.substring(7);
                            } else if (cleanJson.startsWith("```")) {
                                cleanJson = cleanJson.substring(3);
                            }
                            if (cleanJson.endsWith("```")) {
                                cleanJson = cleanJson.substring(0, cleanJson.length() - 3);
                            }
                            cleanJson = cleanJson.trim();
                            
                            Map<String, Object> aiJson = mapper.readValue(cleanJson, new TypeReference<Map<String, Object>>(){});
                            String markdownReport = (String) aiJson.getOrDefault("markdownReport", aiResponse);
                            boolean hasAnomalies = (boolean) aiJson.getOrDefault("hasAnomalies", false);
                            boolean missingSignatures = (boolean) aiJson.getOrDefault("missingSignatures", false);
                            boolean isApproved = (boolean) aiJson.getOrDefault("isApproved", true);
                            
                            response.put("analysis", markdownReport);
                            
                            final String finalMarkdownReport = markdownReport;
                            
                            // Update Property based on anomalies
                            propertyRepository.findById(propertyId).ifPresent(property -> {
                                property.setAiReport(finalMarkdownReport);
                                
                                int penalty = 0;
                                if (hasAnomalies) penalty += 25;
                                if (missingSignatures) penalty += 20;
                                if (!isApproved) penalty += 30;
                                
                                if (penalty > 0) {
                                    Double currentScore = property.getVerificationScore();
                                    if (currentScore == null) currentScore = 100.0;
                                    property.setVerificationScore(Math.max(0.0, currentScore - penalty));
                                    
                                    if (penalty >= 20) {
                                        property.setVerificationStatus("REJECTED");
                                    } else {
                                        property.setVerificationStatus("PENDING");
                                    }
                                }
                                propertyRepository.save(property);
                            });
                            
                            // Recalculate Risk Score
                            RiskAssessmentResponse newRisk = riskAssessmentService.generateRiskAssessment(propertyId);
                            response.put("updatedRisk", newRisk);
                            
                        } catch (Exception parseEx) {
                            parseEx.printStackTrace();
                            
                            // Fallback to text matching if AI failed to return valid JSON
                            String lowerResp = aiResponse.toLowerCase();
                            boolean hasAnomalies = lowerResp.contains("anomal");
                            boolean missingSignatures = lowerResp.contains("signature");
                            boolean isApproved = !lowerResp.contains("lack of official approval") && !lowerResp.contains("not approved");
                            
                            response.put("analysis", aiResponse);
                            
                            final String finalAiResponse = aiResponse;
                            
                            propertyRepository.findById(propertyId).ifPresent(property -> {
                                property.setAiReport(finalAiResponse);
                                
                                int penalty = 0;
                                if (hasAnomalies) penalty += 25;
                                if (missingSignatures) penalty += 20;
                                if (!isApproved) penalty += 30;
                                
                                if (penalty > 0) {
                                    Double currentScore = property.getVerificationScore();
                                    if (currentScore == null) currentScore = 100.0;
                                    property.setVerificationScore(Math.max(0.0, currentScore - penalty));
                                    
                                    if (penalty >= 20) {
                                        property.setVerificationStatus("REJECTED");
                                    } else {
                                        property.setVerificationStatus("PENDING");
                                    }
                                }
                                propertyRepository.save(property);
                            });
                            
                            RiskAssessmentResponse newRisk = riskAssessmentService.generateRiskAssessment(propertyId);
                            response.put("updatedRisk", newRisk);
                        }
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.put("analysis", "Error analyzing document: " + e.getMessage());
        }

        return ResponseEntity.ok(response);
    }
}
