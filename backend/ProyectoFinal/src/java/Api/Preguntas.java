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

public class Preguntas extends HttpServlet {

    private PrintWriter outter;
    private final SAXBuilder builder = new SAXBuilder();
    private File xmlFile = null;
    private String ruta = "";

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ruta = request.getRealPath("/");
        String queryStr = request.getQueryString();
        xmlFile = new File(ruta + "preguntas.xml");
        outter = response.getWriter();
        response.setContentType("application/json");
        response.addHeader("Access-Control-Allow-Origin", "*");
        try {
            Document document = (Document) builder.build(xmlFile); // Leemos el archivo
            Element rootNode = document.getRootElement(); // Obtener nodo raiz
            List list = rootNode.getChildren("PREGUNTA");
            StringBuilder json = new StringBuilder();
            json.append("[");
            for (Object node : list) {
                Element elemento = (Element) node;
                String id = elemento.getAttributeValue("ID");
                String pregunta = elemento.getAttributeValue("TEXTO");
                String respuesta = elemento.getAttributeValue("RESPUESTA");
                List drags = elemento.getChild("DRAGS").getChildren("OPCION");
                List targets = elemento.getChild("TARGETS").getChildren("OPCION");
                if (queryStr != null) {
                    //Obtener solo el nodo
                    String qId = queryStr.split("=")[1];
                    if (id.equals(qId)) {
                        json.append("{");
                        json.append(jsonValue("id", id)).append(",");
                        json.append(jsonValue("pregunta", pregunta)).append(",");
                        json.append(jsonValue("respuesta", respuesta)).append(",");
                        json.append(convertToJsonArray("drags", drags));
                        json.append(",");
                        json.append(convertToJsonArray("targets", targets));
                        json.append("}");
                    }
                } else {
                    json.append("{");
                    json.append(jsonValue("id", id)).append(",");
                    json.append(jsonValue("pregunta", pregunta)).append(",");
                    json.append(jsonValue("respuesta", respuesta)).append(",");
                    json.append(convertToJsonArray("drags", drags));
                    json.append(",");
                    json.append(convertToJsonArray("targets", targets));
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

   private String convertToJsonArray(String key, List list) {
        StringBuilder jsonArray = new StringBuilder();
        jsonArray.append("\"").append(key).append("\" : [");
        int count = 1;
        for (Object item : list) {
            Element option = (Element) item;
            String imagen = option.getAttributeValue("IMAGEN");
            String value = option.getText();
            jsonArray
                    .append("{")
                    .append(jsonValue("imagen", imagen))
                    .append(",")
                    .append(jsonValue("valor", value))
                    .append("}");
            if (count < list.size()) {
                jsonArray.append(",");
            }
            count++;
        }
        jsonArray.append("]");
        return jsonArray.toString();
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
