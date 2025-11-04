import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./App.css";
import "./navbar.css";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setUserEmail(savedEmail);
      setRememberMe(true);
    }
    checkLogin();
  }, []);

  const togglePassword = () => setShowPassword(prev => !prev);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem("token", data.token);

      if (rememberMe) localStorage.setItem("rememberedEmail", userEmail);
      else localStorage.removeItem("rememberedEmail");

      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  const checkLogin = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/api/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) navigate("/dashboard");
    } catch {
      console.log("No logueado todavía.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="page">
        <section className="card">
          <header className="brand">
            <div className="logo">Lock<span className="accent">'era</span></div>
            <p className="tag">Tu espacio seguro.</p>
          </header>

          <form className="login-form" onSubmit={handleLogin} autoComplete="on" noValidate>
            <input
              type="email"
              placeholder="Correo electrónico"
              required
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <div className="pass-wrap">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" className="show-pass" onClick={togglePassword}>
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>

            <div className="help-row">
              <label className="remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                /> Recuérdame
              </label>
            </div>

            <button className="btn primary" type="submit">Iniciar sesión</button>
          </form>

          <div className="signup">
            ¿No tienes una cuenta? <a href="/register">Regístrate</a>
          </div>

          <footer className="legal">
            <small>Lock'era — 2025.</small>
          </footer>
        </section>

        <aside className="preview">
          <div className="phone-mock">
            <div className="phone-top"></div>
            <div className="phone-screen">
              <div className="feed-title">Bienvenido a Lock'era</div>
              <div className="post">Mantén tu cuenta segura.</div>
              <div className="post">Controla el acceso.</div>
              <div className="post">Seguridad en tu hogar.</div>
              <div className="post">Solo tú tienes el control.</div>
              <div className="post">Todo a tu alcance.</div>
            </div>
          </div>
        </aside>
      </main>
    </>
  );
}

export default App;
