import MicrosoftLogin from "react-microsoft-login";

import "../assets/demo.css";
import logo from './img/logo_top_header_shadow.png';
import { useState } from 'react'


export const Login = () => {
  const authHandler = (err, data) => {
    console.log(err, data);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [validateForm, setValidateForm] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validación de campo de email
    if (!email) {
      setEmailError('El email es obligatorio');
      return;
    } else if (!isValidEmail(email)) {
      setEmailError('Ingresa un email válido');
      return;
    }

    // Validación de límite de caracteres en el campo de contraseña
    if (!password) {
      setPasswordError('La contraseña es obligatoria');
      return;
    } else if (password.length > 8) {
      setPasswordError('La contraseña debe tener máximo 8 caracteres');
      return;
    }

    // Si todas las validaciones pasan, realizar la llamada al backend para iniciar sesión
    setValidateForm(true)

    console.log('Iniciar sesión:', email, password);
    try {
      const data = { email, password };
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      console.log(response)
    } catch (error) {
      // Manejar errores de autenticación
    }
  };

  const isValidEmail = (email) => {
    // Expresión regular para validar el formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };



  return (
    <>
      <section className="background-radial-gradient overflow-hidden d-flex align-items-center">
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
          <div className="row gx-lg-5 align-items-center mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <img src={logo} />
              <p className="mb-2 opacity-70 subtitle">
                Sistema de Planillas de MDP
              </p>
              <p className="mb-4 opacity-70 subtitle">
                Un entorno donde valoramos y potenciamos el talento de nuestros colaboradores
              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0 position-relative text-center text-md-end">
              <div className="card bg-glass">
                <div className="card-body px-4 py-5 px-md-5">

                  <form onSubmit={handleSubmit} className="form-login">
                    <div className="mb-4">
                      <MicrosoftLogin clientId={'f8c7976f-3e93-482d-88a3-62a1133cbbc3'} authCallback={authHandler} />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label text-white d-block form-label-sm">Email address</label>
                      {emailError && <div className="invalid-feedback">{emailError}</div>}
                      <input 
                        type="email" 
                        id="form3Example3" 
                        className={`form-control rounded-white bg-opacity-70 ${emailError && 'is-invalid'}`} 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label text-white d-block form-label-sm">Password</label>
                      {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                      <input 
                        type="password" 
                        id="form3Example4" 
                        className={`form-control rounded-white bg-opacity-70 ${passwordError && 'is-invalid'}`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mb-4 myButton">
                      Iniciar Sesión
                    </button>
                  </form>
                  {validateForm && <div className="alert alert-success mt-3" role="alert">Autenticación exitosa! Ingresando ...</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
