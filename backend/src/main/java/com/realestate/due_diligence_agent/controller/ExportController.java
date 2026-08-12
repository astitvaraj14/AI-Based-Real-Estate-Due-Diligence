package com.realestate.due_diligence_agent.controller;

import com.realestate.due_diligence_agent.service.ExcelExportService;
import com.realestate.due_diligence_agent.service.PdfExportService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.realestate.due_diligence_agent.service.EmailService;
import com.realestate.due_diligence_agent.service.NotificationService;
import com.realestate.due_diligence_agent.service.UserService;
import com.realestate.due_diligence_agent.entity.User;

@RestController
@RequestMapping("/api/export")
public class ExportController {

    private final PdfExportService pdfExportService;
    private final ExcelExportService excelExportService;
    private final EmailService emailService;
    private final NotificationService notificationService;
    private final UserService userService;

    public ExportController(
            PdfExportService pdfExportService,
            ExcelExportService excelExportService,
            EmailService emailService,
            NotificationService notificationService,
            UserService userService) {

        this.pdfExportService = pdfExportService;
        this.excelExportService = excelExportService;
        this.emailService = emailService;
        this.notificationService = notificationService;
        this.userService = userService;
    }

    @GetMapping("/pdf/{propertyId}")
    public ResponseEntity<byte[]> exportPdf(
            @PathVariable Long propertyId) {

        byte[] pdf = pdfExportService.exportPdf(propertyId);

        User user = userService.getLoggedInUser();
        
        // Send Email
        emailService.sendReportWithAttachment(
            user.getEmail(), 
            "Your Due Diligence PDF Report", 
            "Attached is your newly generated Due Diligence PDF Report.", 
            pdf, 
            "DueDiligenceReport.pdf", 
            "application/pdf"
        );
        
        // Send Notification
        notificationService.createNotification(
            user.getId(), 
            "PDF Report Generated", 
            "Your PDF Due Diligence Report for property ID " + propertyId + " has been successfully generated and sent to your email."
        );

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=DueDiligenceReport.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }
    @GetMapping("/excel/{propertyId}")
    public ResponseEntity<byte[]> exportExcel(
            @PathVariable Long propertyId) {

        byte[] excel = excelExportService.exportExcel(propertyId);

        User user = userService.getLoggedInUser();
        
        // Send Email
        emailService.sendReportWithAttachment(
            user.getEmail(), 
            "Your Due Diligence Excel Report", 
            "Attached is your newly generated Due Diligence Excel Report.", 
            excel, 
            "DueDiligenceReport.xlsx", 
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        
        // Send Notification
        notificationService.createNotification(
            user.getId(), 
            "Excel Report Generated", 
            "Your Excel Due Diligence Report for property ID " + propertyId + " has been successfully generated and sent to your email."
        );

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=DueDiligenceReport.xlsx")
                .contentType(MediaType.parseMediaType(
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(excel);
    }
}