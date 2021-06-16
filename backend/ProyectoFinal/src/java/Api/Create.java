/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
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
public class Create extends HttpServlet {

    private PrintWriter outter;

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String path = request.getRealPath("/");
        outter = response.getWriter();
        response.setContentType("application/json");
        response.addHeader("Access-Control-Allow-Origin", "*");

        // Obtención de los parámetros del formulario.
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
            Document document = (Document) builder.build(xmlFile);
            Element rootNode = document.getRootElement();

            // Crear nodo de la nueva pregunta.
            Element preguntaNueva = new Element("PREGUNTA");

            preguntaNueva.setAttribute("TEXTO", nombrePregunta);
            preguntaNueva.setAttribute("RESPUESTA", respuesta);
            preguntaNueva.setAttribute("ID", Integer.toString((int) Math.round((Math.random() * (10000 - 5)) + 5)));

            Element drags = new Element("DRAGS");
            for (int i = 0; i < dragList.size(); i++) {
                Element dragOptionElement = new Element("OPCION");
                dragOptionElement.setAttribute("IMAGEN", "https://via.placeholder.com/150");
                dragOptionElement.setText(targetList.get(i));
                drags.addContent(dragOptionElement);
            }

            Element targets = new Element("TARGETS");
            for (int i = 0; i < dragList.size(); i++) {
                Element dragOptionElement = new Element("OPCION");
                dragOptionElement.setAttribute("IMAGEN", "https://via.placeholder.com/150");
                dragOptionElement.setText(targetList.get(i));
                targets.addContent(dragOptionElement);
            }

            preguntaNueva.addContent(drags);
            preguntaNueva.addContent(targets);

            // Se agrega toda la nueva pregunta.
            rootNode.addContent(preguntaNueva);

            // Guardar el documento modificado
            XMLOutputter xmlOutput = new XMLOutputter();
            xmlOutput.setFormat(Format.getPrettyFormat());
            FileWriter writer = new FileWriter(path + "preguntas.xml");
            xmlOutput.output(document, writer);
            outter.write("Se ha creado con exito una nueva pregunta.");
            System.out.println("Se ha creado con exito una nueva pregunta.");

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
