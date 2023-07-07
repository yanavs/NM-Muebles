const inputNombre = document.getElementById("inputNombre")
const inputEmail= document.getElementById("inputEmail")
const inputCelular= document.getElementById("inputCelular")
const inputMobiliario= document.getElementById("inputMobiliario")
const inputColor1= document.getElementById("inputColor1")
const inputColor2= document.getElementById("inputColor2")
const inputAncho= document.getElementById("inputAncho")
const inputLargo= document.getElementById("inputLargo")
const inputProfundidad= document.getElementById("inputProfundidad")
const inputObservaciones= document.getElementById("inputObservaciones")
const botonContacto= document.getElementById("botonContacto")
const mensajeContacto = document.getElementById("mensajeContacto");
const formContacto = document.getElementById("formContacto")


async function subirDatosABD(presupuesto){
    const res= await fetch ("http://localhost:3000/respuestaform",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
    body:JSON.stringify(presupuesto)
    })
    const datos = await res.json()
    return datos
}

formContacto.addEventListener("submit", async(evento) =>{
    evento.preventDefault()

    
      mensajeContacto.innerHTML = "Gracias por comunicarte, pronto nos pondremos en contacto!";
  
      setTimeout(function() {
        mensajeContacto.innerHTML = "";
      }, 2000);

    const presupuesto = {
        nombre: inputNombre.value,
        email: inputEmail.value,
        celular:inputCelular.value,
        Mobiliario:inputMobiliario.value,
        Color1:inputColor1.value,
        Color2:inputColor2.value,
        Ancho:inputAncho.value,
        Largo:inputLargo.value,
       Profundidad: inputProfundidad.value,
        Observaciones:inputObservaciones.value
    }

    console.log(presupuesto)

    console.log(JSON.stringify(presupuesto))

    const presupuestoSubido = await subirDatosABD(presupuesto) 

    if (presupuestoSubido){
        console.log(presupuestoSubido)
    }


    emailjs.sendForm(
    "service_05nkddi",
    "template_h87rk4t",
    presupuesto
  )
  .then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
    },
    function (error) {
      console.log("FAILED...", error);
    }
  );
});
