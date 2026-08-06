package com.realestate.due_diligence_agent.service;

import java.time.LocalDate;
import com.realestate.due_diligence_agent.dto.DueDiligenceReportResponse;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
public class PdfExportService {

    private final DueDiligenceReportService dueDiligenceReportService;

    public PdfExportService(DueDiligenceReportService dueDiligenceReportService) {
        this.dueDiligenceReportService = dueDiligenceReportService;
    }

    public byte[] exportPdf(Long propertyId) {

        DueDiligenceReportResponse report =
                dueDiligenceReportService.generateReport(propertyId);

        ByteArrayOutputStream outputStream =
                new ByteArrayOutputStream();

        Document document = new Document();

        try {

            PdfWriter.getInstance(document, outputStream);

            document.open();
            Font titleFont = FontFactory.getFont(
                    FontFactory.HELVETICA_BOLD,
                    18
            );

            Paragraph title = new Paragraph(
                    "Due Diligence Report",
                    titleFont
            );

            title.setAlignment(Element.ALIGN_CENTER);

            document.add(title);

            document.add(new Paragraph(" "));
            document.add(new Paragraph("Report Date : " + LocalDate.now()));
            document.add(new Paragraph("Property ID : " + report.getPropertyId()));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("PROPERTY DETAILS"));

            document.add(new Paragraph("Property Title : " + report.getPropertyTitle()));
            document.add(new Paragraph("Owner Name : " + report.getOwnerName()));
            document.add(new Paragraph("Property Type : " + report.getPropertyType()));
            document.add(new Paragraph("Address : " + report.getAddress()));
            document.add(new Paragraph("City : " + report.getCity()));
            document.add(new Paragraph("State : " + report.getState()));
            document.add(new Paragraph("Area : " + report.getArea()));
            document.add(new Paragraph("Price : ₹" + report.getPrice()));

            document.add(new Paragraph(" "));

            document.add(new Paragraph("OWNERSHIP DETAILS"));

            document.add(new Paragraph(
                    "Owner Verified : " + report.getOwnerVerified()));

            document.add(new Paragraph(
                    "Ownership Type : " + report.getOwnershipType()));

            document.add(new Paragraph(
                    "Ownership Remarks : " + report.getOwnershipRemarks()));

            document.add(new Paragraph(" "));

            document.add(new Paragraph("LEGAL RECORD"));

            document.add(new Paragraph(
                    "Court Cases : " + report.getCourtCases()));

            document.add(new Paragraph(
                    "Case Status : " + report.getCaseStatus()));

            document.add(new Paragraph(
                    "Legal Remarks : " + report.getLegalRemarks()));

            document.add(new Paragraph(" "));

            document.add(new Paragraph("FLOOD ZONE"));

            document.add(new Paragraph(
                    "Flood Risk Level : " + report.getFloodRiskLevel()));

            document.add(new Paragraph(" "));

            document.add(new Paragraph("ZONING"));

            document.add(new Paragraph(
                    "Zone Type : " + report.getZoneType()));

            document.add(new Paragraph(
                    "Construction Allowed : " + report.getConstructionAllowed()));

            document.add(new Paragraph(" "));

            document.add(new Paragraph("TAX HISTORY"));

            document.add(new Paragraph(
                    "Latest Tax Status : " + report.getLatestTaxStatus()));

            document.add(new Paragraph(" "));

            document.add(new Paragraph("RISK ASSESSMENT"));

            document.add(new Paragraph(
                    "Total Risk Score : " + report.getTotalRiskScore()));

            document.add(new Paragraph(
                    "Risk Level : " + report.getRiskLevel()));

            document.add(new Paragraph(
                    "Recommendation : " + report.getRecommendation()));

        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            document.close();
        }

        return outputStream.toByteArray();
    }
}