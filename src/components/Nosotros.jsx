import React from 'react';
import "../Nosotros.css";
import Navbar from "./Navbar"; 

const Nosotros = () => {
  return (
    <> 
      <Navbar /> 

      <div className="pagina-contenedor">
        <header className="seccion-encabezado">
          <img 
            src="/Lock'era.png" 
            alt="Lock'era Logo" 
            className="logo-nosotros"
          />
          <h2>Somos un equipo dedicado a ofrecer soluciones de seguridad inteligentes para hogares y negocios.</h2>
        </header>

        <section className="seccion-equipo">
          <h3>Nuestro Equipo</h3>
          <div className="grilla-equipo">
            <div className="miembro-equipo">
              <h4>Héctor Madrigal</h4>
              <p className="rol">DESARROLLO</p>
            </div>
            <div className="miembro-equipo">
              <h4>Victor Flores</h4>
              <p className="rol">UX/UI</p>
            </div>
            <div className="miembro-equipo">
              <h4>Héctor Chacon</h4>
              <p className="rol">DESARROLLO</p>
            </div>
          </div>
        </section>
      </div>
    </> 
  );
};

export default Nosotros;
