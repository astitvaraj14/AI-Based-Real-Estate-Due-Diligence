package com.realestate.due_diligence_agent.service;

import com.realestate.due_diligence_agent.dto.DueDiligenceReportResponse;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
public class ExcelExportService {

    private final DueDiligenceReportService dueDiligenceReportService;

    public ExcelExportService(DueDiligenceReportService dueDiligenceReportService) {
        this.dueDiligenceReportService = dueDiligenceReportService;
    }

    public byte[] exportExcel(Long propertyId) {

        DueDiligenceReportResponse report =
                dueDiligenceReportService.generateReport(propertyId);

        try (
                XSSFWorkbook workbook = new XSSFWorkbook();
                ByteArrayOutputStream outputStream = new ByteArrayOutputStream()
        ) {

            XSSFSheet sheet = workbook.createSheet("Due Diligence Report");

            int rowNum = 0;

            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue("Field");
            row.createCell(1).setCellValue("Value");

            row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue("Property Title");
            row.createCell(1).setCellValue(report.getPropertyTitle());

            row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue("Owner");
            row.createCell(1).setCellValue(report.getOwnerName());

            row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue("Property Type");
            row.createCell(1).setCellValue(report.getPropertyType());

            row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue("City");
            row.createCell(1).setCellValue(report.getCity());

            row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue("State");
            row.createCell(1).setCellValue(report.getState());

            row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue("Price");
            row.createCell(1).setCellValue(report.getPrice() != null ? String.valueOf(report.getPrice()) : "N/A");

            row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue("Area");
            row.createCell(1).setCellValue(report.getArea() != null ? String.valueOf(report.getArea()) : "N/A");

            row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue("Risk Level");
            row.createCell(1).setCellValue(
                    report.getRiskLevel() == null ? "N/A" : report.getRiskLevel());

            row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue("Risk Score");
            row.createCell(1).setCellValue(
                    report.getTotalRiskScore() == null ? "N/A" :
                            report.getTotalRiskScore().toString());

            // Removed autoSizeColumn to prevent headless font exception in Alpine Docker

            workbook.write(outputStream);

            return outputStream.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}