import React from "react";
import "./login.css";
import logo from "../../Assets/Img/Login.png";
import { Helmet } from "react-helmet";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange1(event) {
    this.setState({ username: event.target.value });
  }

  handleChange2(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    let url =
      "http://localhost:8080/01proyectoFinal3CM15-emo/Login?username=" +
      this.state.username +
      "&password=" +
      this.state.password;
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        window.location.href = data;
      });
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Login</title>
          <style>
            {
              "body { background-image: linear-gradient(to right,  rgb(120, 162, 253), rgb(255, 255, 255)); }"
            }
          </style>
        </Helmet>
        <div className="flex">
          <main className="flex">
            <figure>
              <img src={logo} id="logo" alt="logo" />
            </figure>
            <form onSubmit={this.handleSubmit}>
              <hr />
              <br />
              <input
                type="text"
                placeholder="Usuario"
                value={this.state.username}
                onChange={this.handleChange1}
              />
              <br />
              <input
                type="password"
                placeholder="Contraseña"
                value={this.state.password}
                onChange={this.handleChange2}
              />
              <br />
              <br />
              <hr />
              <br />
              <input type="submit" value="Log in" />
            </form>
          </main>
        </div>
      </>
    );
  }
}
export default Login;
