package Api;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
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
        String nombrePregunta = request.getParameter("questionName");
        String pregunta = request.getParameter("question");
        String respuesta = request.getParameter("answer");
        String drag1 = request.getParameter("drag1");
        String drag2 = request.getParameter("drag2");
        String drag3 = request.getParameter("drag3");
        String drag4 = request.getParameter("drag4");
        String target1 = request.getParameter("target1");
        String target2 = request.getParameter("target2");
        String target3 = request.getParameter("target3");
        String target4 = request.getParameter("target4");

        List<String> dragList = new ArrayList<String>() {
            {
                add(drag1);
                add(drag2);
                add(drag3);
                add(drag4);
            }
        };

        List<String> targetList = new ArrayList<String>() {
            {
                add(target1);
                add(target2);
                add(target3);
                add(target4);
            }
        };

        try {
            SAXBuilder builder = new SAXBuilder();
            File xmlFile = new File(path + "preguntas.xml");
            Document doc = (Document) builder.build(xmlFile);
            Element rootNode = doc.getRootElement();

            List listaPreguntas = rootNode.getChildren("PREGUNTA");
            int currentId = -1;
            // Buscamos el id de la pregunta.
            for (int i = 0; i < listaPreguntas.size(); i++) {
                Element elemento = (Element) listaPreguntas.get(i);
                int tempId = Integer.parseInt(elemento.getAttributeValue("ID"));
                if ((tempId - 1) == id) {
                    currentId = i;
                }

            }

            Element elementPregunta = (Element) listaPreguntas.get(currentId);

            // Reemplazar TEXTO y RESPUESTA
            elementPregunta.getAttribute("TEXTO").setValue(nombrePregunta);
            elementPregunta.getAttribute("RESPUESTA").setValue(respuesta);

            // Reemplazar drags             
            Element drag = elementPregunta.getChild("DRAGS");
            List dragOptionList = drag.getChildren("OPCION");
            for (int j = 0; j < dragOptionList.size(); j++) {
                Element dragOptionElement = (Element) dragOptionList.get(j);
                dragOptionElement.setText(dragList.get(j));
            }

            // Reemplazar targets
            Element target = elementPregunta.getChild("TARGETS");
            List targetOptionList = target.getChildren("OPCION");
            for (int k = 0; k < targetOptionList.size(); k++) {
                Element targetOptionElement = (Element) targetOptionList.get(k);
                targetOptionElement.setText(targetList.get(k));
            }

            // Guardar el documento modificado.
            XMLOutputter xml = new XMLOutputter();
            xml.setFormat(Format.getPrettyFormat());
            FileWriter fw = new FileWriter(path + "preguntas.xml");
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
