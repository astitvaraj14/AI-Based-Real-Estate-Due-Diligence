import com.lowagie.text.Document;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;
import java.io.FileOutputStream;

public class PdfTest {
    public static void main(String[] args) {
        try {
            Document document = new Document();
            PdfWriter.getInstance(document, new FileOutputStream("test.pdf"));
            document.open();
            document.add(new Paragraph("Price : ₹1000.0"));
            document.close();
            System.out.println("PDF created successfully with Rupee symbol!");
        } catch (Exception e) {
            System.err.println("Exception occurred!");
            e.printStackTrace();
        }
    }
}
