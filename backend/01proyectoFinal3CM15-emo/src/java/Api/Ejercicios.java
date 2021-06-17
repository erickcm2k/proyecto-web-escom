package Api;

import java.io.File;
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

public class Ejercicios extends HttpServlet {

    private PrintWriter outter;
    private final SAXBuilder builder = new SAXBuilder();
    private File xmlFile = null;
    private String ruta = "";

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ruta = request.getRealPath("/");
        String queryStr = request.getQueryString();
        xmlFile = new File(ruta + "/xmlData/ejercicios.xml");
        outter = response.getWriter();
        response.setContentType("application/json");
        response.addHeader("Access-Control-Allow-Origin", "*");
        try {
            Document document = (Document) builder.build(xmlFile); // Leemos el archivo
            Element rootNode = document.getRootElement(); // Obtener nodo raiz
            List list = rootNode.getChildren("NIVEL");
            StringBuilder json = new StringBuilder();
            json.append("[");
            for (Object node : list) {
                Element elemento = (Element) node;
                String id = elemento.getAttributeValue("id");
                String numerador = elemento.getAttributeValue("numeradorM");
                String denominador = elemento.getAttributeValue("denominadorM");
                String b = elemento.getAttributeValue("b");
                if (queryStr != null) {
                    //Obtener solo el nodo
                    String qId = queryStr.split("=")[1];
                    if (id.equals(qId)) {
                        json.append("{");
                        json.append(jsonValue("id", id)).append(",");
                        json.append(jsonValue("numeradorM", numerador)).append(",");
                        json.append(jsonValue("denominadorM", denominador)).append(",");
                        json.append(jsonValue("b", b));
                        json.append("}");
                    }
                } else {
                    json.append("{");
                    json.append(jsonValue("id", id)).append(",");
                    json.append(jsonValue("numeradorM", numerador)).append(",");
                    json.append(jsonValue("denominadorM", denominador)).append(",");
                    json.append(jsonValue("b", b));
                    //json.append(",");
                    json.append("}");
                    if (list.indexOf(node) != list.size() - 1) {
                        json.append(",");
                    }
                }

            }
            json.append("]");
            //System.out.println(json.toString());
            outter.write(json.toString());
        } catch (IOException | JDOMException ex) {
            System.out.println(ex.getMessage());
        }
    }

    private String jsonValue(String key, Object value) {
        return new StringBuilder()
                .append("\"")
                .append(key)
                .append("\" : \"")
                .append(value)
                .append("\"")
                .toString();
    }

}
