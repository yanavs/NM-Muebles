document.addEventListener("DOMContentLoaded", function () {
    const svg1 = d3.select("#placa1 svg");
    const svg2 = d3.select("#placa2 svg");
  
    //--Variables de la placa
    const widthInput = document.getElementById("ancho");
    const heightInput = document.getElementById("alto");
    //--Variables del corte
    const anchoCorteInput = document.getElementById("anchoCorte");
    const longitudCorteInput = document.getElementById("longitudCorte");
    const botonListaCortes = document.getElementById("botonListaCortes");
    const cantidadCorteInput = document.getElementById("cantidadCorte");
    //--Variables de la lista de cortes
    const listaCortes = document.getElementById("listaCortes");
    const listaCantidad = document.getElementById("listaCantidad");
    const listaAncho = document.getElementById("listaAncho");
    const listaLongitud = document.getElementById("listaLongitud");
    const filasCortes = document.getElementById("filasCortes");
    const botonArmarCortes = document.getElementById("botonArmarCortes");
  
    const botonActualizarPlaca = document.querySelector("#botonActualizarPlaca");
  
    const mensajeConfirmacion = document.getElementById("confirmacion-empleado-cargado")
  
    let placaWidth = 0;
    let placaHeight = 0;
  
    function dibujarRectangulo(svg) {
      placaWidth = parseInt(widthInput.value);
      placaHeight = parseInt(heightInput.value);
  
      if (!isNaN(placaWidth) && !isNaN(placaHeight)) {
        svg.attr("width", placaWidth / 3);
        svg.attr("height", placaHeight / 3);
        svg.style("background-color", "gray");
      }
  
      const textoMedidaAnchoExterior = document.getElementById(
        "medidaAnchoExterior"
      );
      textoMedidaAnchoExterior.textContent = `${placaWidth}mm`;
  
      const textoMedidaLargoExterior = document.getElementById(
        "medidaLargoExterior"
      );
      textoMedidaLargoExterior.textContent = `${placaHeight}mm`;
    }
  
  
    
    function renderizarCortes() {
      const cantidadCorte = parseInt(cantidadCorteInput.value);
      const anchoCorte = parseInt(anchoCorteInput.value);
      const longitudCorte = parseInt(longitudCorteInput.value);
  
      if (!isNaN(cantidadCorte) && !isNaN(anchoCorte) && !isNaN(longitudCorte)) {
        // Crear una nueva fila en la tabla de cortes
        const fila = document.createElement("tr");
  
        // Crear las celdas de la fila con los valores de los cortes
        const celdaCantidad = document.createElement("td");
        celdaCantidad.textContent = cantidadCorte;
        const celdaAncho = document.createElement("td");
        celdaAncho.textContent = anchoCorte;
        const celdaLongitud = document.createElement("td");
        celdaLongitud.textContent = longitudCorte;
  
        // Agregar las celdas a la fila
        fila.appendChild(celdaCantidad);
        fila.appendChild(celdaAncho);
        fila.appendChild(celdaLongitud);
  
        // Agregar la fila al tbody de la tabla
        const tbodyCortes = document.getElementById("tbodyCortes");
        tbodyCortes.appendChild(fila);
  
        // Limpiar los campos de entrada
        anchoCorteInput.value = "";
        longitudCorteInput.value = "";
        cantidadCorteInput.value = "";
  
  
        // Agregar el botón de eliminar a la fila
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "x";
        botonEliminar.classList.add("btn", "btn-dark");
  
        const celdaEliminar = document.createElement("td");
        celdaEliminar.appendChild(botonEliminar);
        fila.appendChild(celdaEliminar);
  
     
        // Boton Editar
        const botonEditar = document.createElement("button");
        botonEditar.textContent = "Edit";
        botonEditar.classList.add("btn", "btn-dark");
  
        const celdaEditar = document.createElement("td");
        celdaEditar.appendChild(botonEditar);
        fila.appendChild(celdaEditar);
  
        // Agregar el event listener al botón de editar
        botonEditar.addEventListener("click", function () {
          const celdaCantidad = fila.cells[0];
          const cantidadActual = parseInt(celdaCantidad.textContent);
  
          // Solicitar al usuario la nueva cantidad de cortes
          const nuevaCantidad = prompt("Ingrese la nueva cantidad de cortes:", cantidadActual);
  
          // Validar que el valor ingresado sea un número
          if (!isNaN(nuevaCantidad)) {
            // Actualizar el valor de la cantidad en la celda
            celdaCantidad.textContent = nuevaCantidad;
          } else {
            alert("Por favor, ingrese un valor numérico válido.");
          }
         
        
          dibujarCortes();
        });
  
        // Agregar el event listener al botón de eliminar
        botonEliminar.addEventListener("click", function () {
          // Eliminar la fila de la tabla
          tbodyCortes.removeChild(fila);
        
        
          dibujarCortes();
  
          mensajeConfirmacion.innerHTML = `El corte fue eliminado exitosamente!`
  
          setTimeout(() =>{
            mensajeConfirmacion.innerHTML = ``
        }, 2000)
  
        
        });
      }
    }
  
    function dibujarCortes() {
      // Limpiar el contenido previo de los SVG
      svg1.selectAll("rect").remove();
      svg2.selectAll("rect").remove();
  
      let x1 = 1;
      let y1 = 1;
      let x2 = 1;
      let y2 = 1;
      let maxHeight1 = 0; // Altura máxima de los cortes en la placa 1
      let maxHeight2 = 0; // Altura máxima de los cortes en la placa 2
      let placasLlenas = false; // Indica si ambas placas están llenas
  
      // Ordenar los cortes de mayor a menor longitud
      const cortesOrdenados = Array.from(
        tbodyCortes.getElementsByTagName("tr")
      ).sort((a, b) => {
        const longitudA = parseInt(a.cells[2].textContent);
        const longitudB = parseInt(b.cells[2].textContent);
        return longitudB - longitudA;
      });
  
      // Iterar sobre cada corte
      for (let i = 0; i < cortesOrdenados.length; i++) {
        const fila = cortesOrdenados[i];
  
        // Obtener los valores de cada celda en la fila
        const cantidad = parseInt(fila.cells[0].textContent);
        const ancho = parseInt(fila.cells[1].textContent) / 3;
        const longitud = parseInt(fila.cells[2].textContent) / 3;
  
        // Dibujar los rectángulos correspondientes en los SVG de las placas
        for (let j = 0; j < cantidad; j++) {
          // Verificar si los rectángulos caben en la placa 1
          if (x1 + ancho > svg1.attr("width")) {
            x1 = 1; // Reiniciar la posición en x al principio de la fila
            y1 += maxHeight1 + 1; // Aumentar la posición en y al siguiente nivel de cortes
            maxHeight1 = 0; // Reiniciar la altura máxima de los cortes en una fila
          }
  
          // Verificar si los rectángulos caben en la placa 2
          if (x2 + ancho > svg2.attr("width")) {
            x2 = 1; // Reiniciar la posición en x al principio de la fila
            y2 += maxHeight2 + 1; // Aumentar la posición en y al siguiente nivel de cortes
            maxHeight2 = 0; // Reiniciar la altura máxima de los cortes en una fila
          }
  
          // Los rectángulos no caben en ninguna de las dos placas
          if (
            y1 + longitud > svg1.attr("height") &&
            y2 + longitud > svg2.attr("height")
          ) {
            placasLlenas = true;
            break;
          }
  
          if (y1 + longitud <= svg1.attr("height")) {
            const rectangulo = svg1
              .append("rect")
              .attr("x", x1)
              .attr("y", y1)
              .attr("width", ancho)
              .attr("height", longitud)
              .style("fill", "red")
              .style("stroke", "black")
              .style("stroke-width", 1);
  
            // Generar un ID único para el rectángulo y asignarlo como atributo de datos
            const idRectangulo = `rect-${i}-${j}`;
            rectangulo.attr("data-id-rectangulo", idRectangulo);
  
            // Actualizar la posición x para el próximo rectángulo en la placa 1
            x1 += ancho + 1; // Espacio horizontal entre rectángulos
  
            // Actualizar la altura máxima de los cortes en la placa 1 si es necesario
            if (longitud > maxHeight1) {
              maxHeight1 = longitud;
            }
  
            // Asignar el ID del rectángulo a la fila de cortes
            fila.dataset.idRectangulo = idRectangulo;
          } else {
            const rectangulo = svg2
              .append("rect")
              .attr("x", x2)
              .attr("y", y2)
              .attr("width", ancho)
              .attr("height", longitud)
              .style("fill", "red")
              .style("stroke", "black")
              .style("stroke-width", 1);
  
            // Generar un ID único para el rectángulo y asignarlo como atributo de datos
            const idRectangulo = `rect-${i}-${j}`;
            rectangulo.attr("data-id-rectangulo", idRectangulo);
  
            // Actualizar la posición x para el próximo rectángulo en la placa 2
            x2 += ancho + 1; // Espacio horizontal entre rectángulos
  
            // Actualizar la altura máxima de los cortes en la placa 2 si es necesario
            if (longitud > maxHeight2) {
              maxHeight2 = longitud;
            }
  
            // Asignar el ID del rectángulo a la fila de cortes
            fila.dataset.idRectangulo = idRectangulo;
          }
        }
  
        // Verificar si ambas placas están llenas
        if (placasLlenas) {
          break;
        }
      }
  
      // Mostrar mensaje de alerta si las placas están llenas
      if (placasLlenas) {
        alert("Los cortes no caben en ninguna de las dos placas");
      }
    }
  
    botonArmarCortes.addEventListener("click", (evento) => {
      evento.preventDefault();
  
      dibujarRectangulo(svg1);
      dibujarRectangulo(svg2);
      dibujarCortes();
    });
  
    botonListaCortes.addEventListener("click", (evento) => {
      evento.preventDefault();
      renderizarCortes();
    });
  
  
  });
  