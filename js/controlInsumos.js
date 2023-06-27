const formulario = document.getElementById("formulario")

const inputNombre = document.getElementById("Nombre")
const inputStock = document.getElementById("Stock")
const caracteristicas = document.getElementById("caracteristica-producto")
const costo = document.getElementById("costo")


const listaDeInsumos = document.getElementById("lista-de-insumos")

let insumosCargados = []

let insumos = {
  nombre: "",
  caracteristicas: "",
  stock:"",
  costo: "",
}

function guardarInsumosEnAlmacenamientoLocal() { //Esta función guarda la lista insumosCargados en el almacenamiento local

  localStorage.setItem("insumosCargados", JSON.stringify(insumosCargados))// Convierto el objeto insumosCargados a formato JSON para poder guardarlo.
  //Guardo la lista actualizada de los insumos en el almacenamiento local después de cargar los productos.
}

function eliminarInsumo(nombre, caracteristicas) {
  insumosCargados = insumosCargados.filter((insumos) => {
    return insumos.nombre !== nombre || insumos.caracteristicas !== caracteristicas;
  });

  cargarInsumos();
  guardarInsumosEnAlmacenamientoLocal();
}
  
  function editarStock(nombre,caracteristicas) {
    // Buscar el insumo específico por su nombre y caracteristicas
    const insumoSeleccionado = insumosCargados.find((insumos) => {
    return insumos.nombre  === nombre || insumos.caracteristicas  === caracteristicas;
    })
    if (insumoSeleccionado) {
      // Solicitar al usuario el nuevo valor del stock
      const nuevoStock = prompt("Ingrese el nuevo stock:");
  
      // Actualizar el valor del stock en el insumo seleccionado
      insumoSeleccionado.stock = nuevoStock;
  
      // Actualizar el valor del stock en el elemento <li> correspondiente
      const indiceInsumoSeleccionado = insumosCargados.indexOf(insumoSeleccionado);
      const elementoLiStock = listaDeInsumos.children[indiceInsumoSeleccionado].querySelector('li:nth-child(3)');
      elementoLiStock.innerText = `Stock: ${nuevoStock}`;
  
      // Guardar los cambios en el almacenamiento local
      guardarInsumosEnAlmacenamientoLocal();
    }
  }

function cargarInsumos() {
  listaDeInsumos.innerHTML = ``

  insumosCargados.forEach((insumos) => {
    const ul = document.createElement("ul")

    for (const dato of Object.values(insumos)) {
      const li = document.createElement("li")
      li.innerText = `${dato}`
      ul.appendChild(li)

   
    } 

    ul.innerHTML += `
    <button id="boton-eliminar" class="btn btn-dark" onclick="eliminarInsumo('${insumos.nombre}','${insumos.caracteristicas}')">Eliminar</button>
    <button id="boton-editar-Stock" class="btn btn-light" onclick="editarStock('${insumos.nombre}','${insumos.caracteristicas}')">Editar Stock</button>
  `;
  
    

    listaDeInsumos.appendChild(ul)
  })
}

window.addEventListener("load", () => { 

  const insumosGuardados = localStorage.getItem("insumosCargados") 
  // Cuando la página se cargue, verifico si hay datos guardados en el almacenamiento local 
  

  if (insumosGuardados) {
    insumosCargados = JSON.parse(insumosGuardados) // Si existen datos, se parsean del formato JSON a un objeto JavaScript y se asignan a la variable insumosCargados.
    cargarInsumos() //Llamo a la función cargarInsumos() para mostrar los productos en la página
  }
  //si hay datos guardados en el almacenamiento local, los cargo en el arreglo insumosCargados

})

formulario.addEventListener("submit", (e) => {
  e.preventDefault()

  const datos = {
    nombre: inputNombre.value,
    caracteristicas: caracteristicas.value,
    stock:inputStock.value,
    costo: costo.value
  }

  /*Creo el objeto datos que contiene los valores originales de los inputs para realizar la validacion
  ya que luego actualizo las propiedades de los insumos con texto adicional para aclarar cada propiedad de los insumos,
  por lo tanto la validacion ya no funcionaria correctamente, 
  porque las propiedades contienen texto adicional en lugar de los valores originales del input.*/

  if (!datos.nombre || !datos.caracteristicas || !datos.costo) {
    alert("Faltan datos por completar!")
    return
  }

  insumos = {
    ...insumos,

    nombre: `Nombre: ${inputNombre.value}`,
    stock: `Stock: ${inputStock.value}`,
    caracteristicas: `Caracteristicas: ${caracteristicas.value}`,
    costo: `Costo:$ ${costo.value}`,
  }

  insumosCargados.push(insumos)

 guardarInsumosEnAlmacenamientoLocal()

  inputNombre.value = ""
  caracteristicas.value = ""
  inputStock.value = ""
  costo.value = ""

  
  cargarInsumos() 
})


