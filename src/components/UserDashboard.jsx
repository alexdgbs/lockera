import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import "../dashboard.css";

const API_URL = import.meta.env.VITE_API_URL;

function UserDashboard() {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [videoSent, setVideoSent] = useState(false);

  useEffect(() => {
    loadUserInfo();
    loadUserList();
  }, []);

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const loadUserInfo = async () => {
    try {
      const res = await fetch(`${API_URL}/api/me`, { headers: getAuthHeader() });
      if (res.status === 401) return window.location.reload();
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadUserList = async () => {
    try {
      const res = await fetch(`${API_URL}/api/users`, { headers: getAuthHeader() });
      if (!res.ok) return;
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!videoSent) {
      return Swal.fire({
        icon: "error",
        title: "Video requerido",
        text: "Debes hacer clic en 'Enviar Video' antes de agregar el subusuario",
        confirmButtonText: "Entendido"
      });
    }

    try {
      const res = await fetch(`${API_URL}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
        body: JSON.stringify({ firstName, lastName }),
      });
      const data = await res.json();
      if (res.ok) {
      setShowModal(false);  
      setFirstName("");
      setLastName("");
      setVideoSent(false);
      loadUserList();

  await Swal.fire({
    icon: "success",
    title: "¡Agregado!",
    text: `${data.user.name} se agregó correctamente`,
    confirmButtonText: "Continuar"
  });
}
 else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message,
          confirmButtonText: "Entendido"
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo agregar el usuario",
        confirmButtonText: "Entendido"
      });
    }
  };

  const handleDeleteUser = async (id, name) => {
    const result = await Swal.fire({
      title: "Eliminar subusuario",
      html: `¿Deseas eliminar al subusuario <strong>${name}</strong>?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    });
    
    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`${API_URL}/api/users/${id}`, {
        method: "DELETE",
        headers: getAuthHeader(),
      });
      const data = await res.json();
      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Eliminado",
          text: `${data.user.name} fue eliminado correctamente`,
          confirmButtonText: "Continuar",
          timer: 2000,
          timerProgressBar: true
        });
        loadUserList();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message,
          confirmButtonText: "Entendido"
        });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar",
        confirmButtonText: "Entendido"
      });
    }
  };

  const handleSendVideo = () => {
    setVideoSent(true);
    Swal.fire({
      icon: "success",
      title: "¡Listo!",
      text: "Video validado correctamente",
      confirmButtonText: "Continuar",
      timer: 2000,
      timerProgressBar: true
    });
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="user-info">
          <h1>¡Hola, bienvenido!</h1>
          <h2 id="userName">{user.name || "(Cargando...)"}</h2>
          <div className="profile-icon">
            <ion-icon name="person-circle-outline" id="defaultIcon" />
            <input type="file" id="profilePic" accept="image/*" style={{ display: "none" }} />
          </div>
          <hr />
          <h3>Información</h3>
          <p><strong>Correo:</strong> {user.email || "Cargando..."}</p>
          <p><strong>Número de serie:</strong> {user.serial || "-"}</p>
        </div>

        <div className="user-list">
          <h2>Subusuarios</h2>
          <div className="add-user">
            <button id="addUserBtn" onClick={() => setShowModal(true)}>
              <ion-icon name="person-add-outline" /> Agregar Usuario
            </button>
          </div>

          <ul className="user-list-items">
            {users.map((u) => (
              <li key={u.id}>
                <span>{u.name}</span>
                <button onClick={() => handleDeleteUser(u.id, u.name)}>
                  <ion-icon name="trash-outline" /> 
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {showModal && (
        <div className="modal" style={{ display: "flex" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>
                <ion-icon name="person-add-outline" /> Agregar Nuevo Usuario
              </h3>
              <span className="close-modal" onClick={() => { setShowModal(false); setVideoSent(false); }}>&times;</span>
            </div>
            <form onSubmit={handleAddUser}>
              <div className="form-group">
                <label htmlFor="firstName">Nombre (máx. 15 caracteres):</label>
                <input
                  id="firstName"
                  maxLength={15}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Apellido (máx. 15 caracteres):</label>
                <input
                  id="lastName"
                  maxLength={15}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Enviar Video (obligatorio)</label>
                <button type="button" className="send-video-btn" onClick={handleSendVideo}>
                  {videoSent ? (
                    <>
                      <ion-icon name="checkmark-circle-outline" style={{ fontSize: '18px', verticalAlign: 'middle', marginRight: '6px' }} />
                      Video Enviado
                    </>
                  ) : (
                    "Enviar Video"
                  )}
                </button>
                
                {!videoSent && (
                  <div className="video-warning">
                    <ion-icon name="alert-circle-outline" />
                    <span>Debes enviar el video antes de agregar el usuario</span>
                  </div>
                )}
                
                {videoSent && (
                  <div className="video-success">
                    <ion-icon name="checkmark-circle-outline" />
                    <span>Video validado. Ya puedes agregar el usuario</span>
                  </div>
                )}
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => { setShowModal(false); setVideoSent(false); }}>
                  Cancelar
                </button>
                <button type="submit" className="add-btn">
                  Agregar Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default UserDashboard;