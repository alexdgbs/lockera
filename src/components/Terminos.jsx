import React from "react";
import "../Terminos.css";
import Navbar from "./Navbar";

const Terminos = () => {
  return (
    <>
      <Navbar />
      <main className="pagina-contenedor">
        <div className="terms-container">
          <h2>Términos y Condiciones para el Registro de Cuenta en Lock'era</h2>

          <div className="terms-grid">
            <div className="terms-block">
              <h3>1. Aceptación de los Términos</h3>
              <p>
                Al registrarse en Lock'era, usted acepta cumplir y estar sujeto a estos Términos y Condiciones,
                así como a nuestra Política de Privacidad. Si no está de acuerdo con alguno de estos términos,
                le solicitamos no utilizar nuestra plataforma.
              </p>
            </div>

            <div className="terms-block">
              <h3>2. Uso de la Plataforma</h3>
              <p>
                Lock'era es un servicio de seguridad basado en tecnología de reconocimiento facial
                para la autenticación y control de acceso. Usted se compromete a utilizar la plataforma
                de manera responsable y conforme a la ley vigente.
              </p>
            </div>

            <div className="terms-block">
              <h3>3. Información Personal y Privacidad</h3>
              <p>
                Para crear una cuenta, es necesario proporcionar información personal veraz y completa.
                Usted autoriza a Lock'era a recopilar, almacenar y procesar sus datos personales conforme
                a nuestra Política de Privacidad.
              </p>
            </div>

            <div className="terms-block">
              <h3>4. Consentimiento para el Uso de Datos Biométricos</h3>
              <p>
                Usted otorga su consentimiento explícito para la recopilación y el uso de una fotografía de su rostro
                para fines de autenticación y control de acceso a su cuenta.
              </p>
            </div>

            <div className="terms-block">
              <h3>5. Protección de la Imagen Facial</h3>
              <p>
                Lock'era protege su imagen facial mediante medidas de seguridad avanzadas. La imagen será almacenada
                de forma segura y confidencial, y no será compartida con terceros sin su consentimiento, excepto por requerimiento legal.
              </p>
            </div>

            <div className="terms-block">
              <h3>6. Derechos del Usuario</h3>
              <p>
                Usted tiene derecho a acceder, rectificar, cancelar y oponerse al uso de su imagen facial contactando
                a nuestro equipo de soporte.
              </p>
            </div>

            <div className="terms-block">
              <h3>7. Revocación del Consentimiento</h3>
              <p>
                Usted puede revocar su consentimiento para el uso de su imagen facial, lo que implicará la cancelación
                de su cuenta y eliminación de su imagen de nuestros sistemas.
              </p>
            </div>

            <div className="terms-block">
              <h3>8. Cambios en los Términos y Condiciones</h3>
              <p>
                Lock'era se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento,
                notificando a los usuarios sobre los cambios realizados.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Terminos;