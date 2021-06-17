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
public class Delete extends HttpServlet {

    private PrintWriter outter;

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.addHeader("Access-Control-Allow-Origin", "*");
        outter = response.getWriter();
        String path = request.getRealPath("/");
        int id = (Integer.parseInt(request.getParameter("id")) - 1);
        
        try {
            SAXBuilder builder = new SAXBuilder();
            File xmlFile = new File(path + "./xmlData/ejercicios.xml");
            Document document = (Document) builder.build(xmlFile);

            Element root = document.getRootElement();
            List list = root.getChildren("NIVEL");

            boolean shouldEliminate = false;
            int indexToEliminate = -1;
            for (int i = 0; i < list.size(); i++) {
                Element elemento = (Element) list.get(i);
                int tempId = Integer.parseInt(elemento.getAttributeValue("id"));
                if ((tempId - 1) == id) {
                    shouldEliminate = true;
                    indexToEliminate = i;
                }

            }

            if (shouldEliminate) {
                list.remove(indexToEliminate);
            } else {
                throw new Error();
            }

            XMLOutputter xmlOutput = new XMLOutputter();
            xmlOutput.setFormat(Format.getPrettyFormat());
            FileWriter writer = new FileWriter(path + "./xmlData/ejercicios.xml");
            xmlOutput.output(document, writer);

        } catch (IOException | JDOMException e) {
            outter.write("No ha sido posible eliminar la pregunta con id: " + (id + 1));
            e.printStackTrace();
        }

        outter.write("Se ha eliminado la pregunta con id: " + (id + 1));

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
