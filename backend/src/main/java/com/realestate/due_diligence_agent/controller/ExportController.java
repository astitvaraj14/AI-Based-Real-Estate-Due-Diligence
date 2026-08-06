package com.realestate.due_diligence_agent.controller;

import com.realestate.due_diligence_agent.service.ExcelExportService;
import com.realestate.due_diligence_agent.service.PdfExportService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/export")
public class ExportController {

    private final PdfExportService pdfExportService;
    private final ExcelExportService excelExportService;

    public ExportController(
            PdfExportService pdfExportService,
            ExcelExportService excelExportService) {

        this.pdfExportService = pdfExportService;
        this.excelExportService = excelExportService;
    }

    @GetMapping("/pdf/{propertyId}")
    public ResponseEntity<byte[]> exportPdf(
            @PathVariable Long propertyId) {

        byte[] pdf = pdfExportService.exportPdf(propertyId);

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

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=DueDiligenceReport.xlsx")
                .contentType(MediaType.parseMediaType(
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(excel);
    }
}