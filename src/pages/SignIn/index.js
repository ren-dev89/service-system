import React, { useState } from "react";
import "./styles.css";

import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

import imgLogo from "../../assets/logo.png";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loadingAuth, signUserIn } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    await signUserIn(email, password);
  };

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={imgLogo} alt="Logo do sistema de chamados" />
        </div>

        <div className="login-content">
          {loadingAuth ? (
            <h1>Entrando...</h1>
          ) : (
            <div className="login-form">
              <form onSubmit={handleLogin}>
                <h1>Entrar</h1>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Acessar</button>
              </form>

              <Link to="/register">Não possui uma conta? Cadastre-se</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
