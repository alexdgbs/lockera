import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../register.css";

const API_URL = import.meta.env.VITE_API_URL;

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [serial, setSerial] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [terms, setTerms] = useState(false);
  const [serialError, setSerialError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!serial) {
      setSerialError("");
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`${API_URL}/api/validate-serial`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ serial })
        });
        const data = await res.json();
        if (!res.ok || !data.message.includes("válido")) setSerialError(data.message);
        else setSerialError("");
      } catch {
        setSerialError("Error al validar el serial");
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [serial]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden",
        confirmButtonText: "Entendido"
      });
    }
    if (!terms) {
      return Swal.fire({
        icon: "warning",
        title: "Términos requeridos",
        text: "Debes aceptar los términos y condiciones",
        confirmButtonText: "Entendido"
      });
    }
    if (!serial) {
      return Swal.fire({
        icon: "error",
        title: "Serial requerido",
        text: "Debes ingresar un número de serie válido",
        confirmButtonText: "Entendido"
      });
    }
    if (serialError) {
      return Swal.fire({
        icon: "error",
        title: "Serial inválido",
        text: serialError,
        confirmButtonText: "Entendido"
      });
    }
    try {
      const res = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, serial, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "No se pudo completar el registro");
      await Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: "Tu cuenta ha sido creada correctamente",
        confirmButtonText: "Continuar"
      });
      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error en el registro",
        text: err.message || "No se pudo completar el registro",
        confirmButtonText: "Entendido"
      });
    }
  };

  return (
    <>
      <Navbar />
      <main className="register-page">
        <div className="register-card">
          <h2>Registrarse</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Número de serie"
              value={serial}
              onChange={(e) => setSerial(e.target.value)}
              required
            />
            {serialError && <p className="error">{serialError}</p>}
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Mostrar contraseña
            </label>
            <label>
              <input
                type="checkbox"
                checked={terms}
                onChange={() => setTerms(!terms)}
              />
              Acepto los{" "}
              <a href="/terminos" className="terms">
                términos y condiciones
              </a>
            </label>
            <button type="submit">Registrar</button>
          </form>
        </div>
      </main>
    </>
  );
}

export default Register;
