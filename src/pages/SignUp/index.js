import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

import imgLogo from "../../assets/logo.png";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loadingAuth, signUserUp } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    await signUserUp(email, password, name);
  };

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={imgLogo} alt="Logo do sistema de chamados" />
        </div>

        <div className="login-content">
          {loadingAuth ? (
            <h1>Registrando...</h1>
          ) : (
            <div className="login-form">
              <form onSubmit={handleRegister}>
                <h1>Nova conta</h1>
                <input
                  type="text"
                  placeholder="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
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
                <button type="submit">Cadastrar</button>
              </form>

              <Link to="/">Já possui uma conta? Faça login</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
