
    const botonContacto = document.getElementById("botonContacto");
    const mensajeContacto = document.getElementById("mensajeContacto");
  
    botonContacto.addEventListener("click", function() {
      mensajeContacto.innerHTML = "Gracias por comunicarte, pronto nos pondremos en contacto!";
  
      setTimeout(function() {
        mensajeContacto.innerHTML = "";
      }, 2000);
    });