package com.realestate.due_diligence_agent;

import com.realestate.due_diligence_agent.service.DueDiligenceReportService;
import com.realestate.due_diligence_agent.service.ExcelExportService;
import com.realestate.due_diligence_agent.service.PdfExportService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("local")
public class TestReport {

    @Autowired
    private org.springframework.test.web.servlet.MockMvc mockMvc;

    @Test
    @org.springframework.security.test.context.support.WithMockUser(username="astitvarajfbg@gmail.com")
    public void testExportEndpoints() throws Exception {
        System.out.println("Testing /api/export/pdf/1");
        org.springframework.test.web.servlet.MvcResult pdfResult = mockMvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get("/api/export/pdf/1"))
                .andReturn();
        System.out.println("PDF HTTP Status: " + pdfResult.getResponse().getStatus());
        if (pdfResult.getResponse().getStatus() != 200) {
            System.err.println(pdfResult.getResponse().getErrorMessage());
            if (pdfResult.getResolvedException() != null) {
                pdfResult.getResolvedException().printStackTrace();
            }
        }
    }

    @Test
    public void testPdfRupeeSymbol() {
        try {
            com.lowagie.text.Document document = new com.lowagie.text.Document();
            com.lowagie.text.pdf.PdfWriter.getInstance(document, new java.io.FileOutputStream("target/test_rupee.pdf"));
            document.open();
            document.add(new com.lowagie.text.Paragraph("Price : ₹1000.0"));
            document.close();
            System.out.println("RUPEE SYMBOL PDF CREATED SUCCESSFULLY");
        } catch (Exception e) {
            System.err.println("RUPEE SYMBOL PDF FAILED:");
            e.printStackTrace();
        }
    }
}
