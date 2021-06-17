package Api;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.JDOMException;
import org.jdom2.input.SAXBuilder;

public class Login extends HttpServlet {

    private PrintWriter outter;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.addHeader("Access-Control-Allow-Origin", "*");
        outter = response.getWriter();

        String ruta = request.getRealPath("/");
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        PrintWriter out = response.getWriter();
        try {
            boolean isLoggedIn = false;
            SAXBuilder builder = new SAXBuilder();
            File archivoXML = new File(ruta + "/xmlData/usuarios.xml");
            Document documento = builder.build(archivoXML);
            Element raiz = documento.getRootElement();
            List lista = raiz.getChildren("usuario");

            for (int i = 0; i < lista.size(); i++) {
                Element elemento = (Element) lista.get(i);
                String usernamexml = elemento.getAttributeValue("username");
                String passwordxml = elemento.getAttributeValue("password");
                
                isLoggedIn = username.compareTo(usernamexml) == 0 && password.compareTo(passwordxml) == 0;
            }

            if (isLoggedIn) {
                outter.write("home");
            } else {
                outter.write("error");
            }

        } catch (JDOMException e) {
            e.printStackTrace();
        }

    }
}
