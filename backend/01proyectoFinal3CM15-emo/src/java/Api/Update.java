package Api;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;
import org.jdom.output.Format;
import org.jdom.output.XMLOutputter;

/**
 *
 * @author erick
 */
public class Update extends HttpServlet {

    private PrintWriter outter;

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        /* TODO output your page here. You may use following sample code. */
        String path = request.getRealPath("/");
        outter = response.getWriter();
        response.setContentType("application/json");
        response.addHeader("Access-Control-Allow-Origin", "*");

        // Obtener el id de la pregunta y los parámetros del formulario.            
        int id = (Integer.parseInt(request.getParameter("id")) - 1);
        String numeradorM = request.getParameter("numeradorM");
        String denominadorM = request.getParameter("denominadorM");
        String b = request.getParameter("b");

        try {
            SAXBuilder builder = new SAXBuilder();
            File xmlFile = new File(path + "./xmlData/ejercicios.xml");
            Document doc = (Document) builder.build(xmlFile);
            Element rootNode = doc.getRootElement();

            List listaNivel = rootNode.getChildren("NIVEL");
            int currentId = -1;
            // Buscamos el id.
            for (int i = 0; i < listaNivel.size(); i++) {
                Element elemento = (Element) listaNivel.get(i);
                int tempId = Integer.parseInt(elemento.getAttributeValue("id"));
                if ((tempId - 1) == id) {
                    currentId = i;
                }
            }

            Element elementNivel = (Element) listaNivel.get(currentId);

            // Reemplazar
            elementNivel.getAttribute("numeradorM").setValue(numeradorM);
            elementNivel.getAttribute("denominadorM").setValue(denominadorM);
            elementNivel.getAttribute("b").setValue(b);

            // Guardar el documento modificado.
            XMLOutputter xml = new XMLOutputter();
            xml.setFormat(Format.getPrettyFormat());
            FileWriter fw = new FileWriter(path + "./xmlData/ejercicios.xml");
            xml.output(doc, fw);
            outter.write("Se ha modificado la pregunta con id: " + (id + 1));
            System.out.println("Se ha modificado la pregunta con id: " + (id + 1));

        } catch (IOException io) {
            System.out.println(io.getMessage());
        } catch (JDOMException jdomex) {
            System.out.println(jdomex.getMessage());
        }

    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
