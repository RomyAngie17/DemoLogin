import { useState } from 'react'
import './App.css'

function App() {
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
    } else if (password.length > 120) {
      setPasswordError('La contraseña debe tener máximo 120 caracteres');
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
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">

          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
              alt="Login image" className="w-100 vh-100 img-style" />
          </div>
          <div className="col-sm-6 text-black">
            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
              
              <form onSubmit={handleSubmit} className="form-style">
                <div className="px-5 ms-xl-4 mb-4">
                  <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4 i-color"></i>
                  <span className="h1 fw-bold mb-0">MDP</span>
                </div>
                <div className="form-outline mb-4" >
                  <input
                    id="form2Example18"
                    type="email"
                    className={`form-control form-control-lg  ${emailError && 'is-invalid'}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form2Example18">Email:</label>
                  {emailError && <div className="invalid-feedback">{emailError}</div>}
                </div>
                <div className="form-outline mb-4">
                  <input
                    id="form2Example28"
                    type="password"
                    className={`form-control form-control-lg ${passwordError && 'is-invalid'}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form2Example28">Contraseña:</label>
                  {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                </div>
                <div className="pt-1 mb-4">
                  <button type="submit" className="btn btn-info btn-lg btn-block">Iniciar sesión</button>
                </div>
              </form>
              
              {validateForm && <div className="alert alert-success mt-3" role="alert">Autenticación exitosa! Ingresando ...</div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;