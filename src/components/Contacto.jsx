import React from 'react';
import '../Contacto.css';
import Navbar from "./Navbar";

const Contacto = () => {
  return (
    <>
      <Navbar />
      <section className="section-contact">
        <div className="contact-container">
          <h2 className="h2-contact">Contáctanos</h2>
          <p>¿Tienes alguna pregunta o necesitas ayuda? ¡No dudes en contactarnos!</p>

          <div className="contact-options">

            <div className="contact-option">
              <ion-icon name="help-outline"></ion-icon>
              <a href="mailto:soporte@lockera.com?subject=Problema%20con%20el%20registro%20del%20rostro&body=%C2%A1Hola,%0D%0A%0D%0A%C2%A1Lo%20sentimos!%20Estamos%20aqu%C3%AD%20para%20ayudarte%20a%20registrar%20tu%20rostro%20en%20Lockera.%20Por%20favor,%20cu%C3%A9ntanos%20qu%C3%A9%20est%C3%A1%20sucediendo%20para%20que%20podamos%20resolverlo%20r%C3%A1pidamente.">
                Problemas al registrar mi rostro
              </a>
              <p>Si tienes dificultades para registrar tu rostro en el cerrojo.</p>
            </div>

            <div className="contact-option">
              <ion-icon name="help-outline"></ion-icon>
              <a href="mailto:securebylockera@gmail.com">Olvidé mi contraseña</a>
              <p>Si necesitas ayuda para recuperar tu contraseña.</p>
            </div>

            <div className="contact-option">
              <ion-icon name="help-outline"></ion-icon>
              <a href="mailto:securebylockera@gmail.com">Consulta general</a>
              <p>Para cualquier otra pregunta o consulta.</p>
            </div>

            <div className="contact-option">
              <ion-icon name="logo-whatsapp"></ion-icon>
              <a href="https://wa.me/5215555555555?text=Hola%21%20Necesito%20ayuda%20con%20Lockera.">
                Contactar por WhatsApp
              </a>
              <p>Chatea con nosotros directamente en WhatsApp.</p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Contacto;
