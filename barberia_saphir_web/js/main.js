
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav__toggle");
  const navLinks = document.querySelector(".nav__links");
  const bookingForm = document.getElementById("booking-form");
  const bookingMessage = document.getElementById("booking-message");
  const yearSpan = document.getElementById("year");

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("nav__links--open");
    });

    navLinks.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("nav__links--open");
      }
    });
  }

  if (bookingForm && bookingMessage) {
    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();

      bookingMessage.textContent = "";
      bookingMessage.classList.remove("form__message--success", "form__message--error");

      if (!bookingForm.checkValidity()) {
        bookingMessage.textContent = "Por favor, revisa los campos obligatorios.";
        bookingMessage.classList.add("form__message--error");
        bookingForm.reportValidity();
        return;
      }

      const formData = new FormData(bookingForm);
      const nombre = formData.get("nombre");
      const fecha = formData.get("fecha");
      const hora = formData.get("hora");
      const servicio = bookingForm.querySelector("#servicio option:checked").textContent;

      bookingMessage.textContent = `¡Reserva enviada! ${nombre}, te esperamos el ${fecha} a las ${hora} para tu ${servicio}.`;
      bookingMessage.classList.add("form__message--success");

      bookingForm.reset();

      console.log("Datos de la reserva (conecta aquí tu backend):", Object.fromEntries(formData.entries()));
    });
  }
});
