function mostrarRegistros() {
    var registros = JSON.parse(localStorage.getItem("registros")) || [];
    var registroTable = document.getElementById("registroTable").getElementsByTagName("tbody")[0];
    registroTable.innerHTML = ""; // Limpiar el contenido de la tabla

    registros.forEach(function(registro, index) {
        var row = registroTable.insertRow();

        var nombreClienteCell = row.insertCell();
        nombreClienteCell.innerHTML = registro.clientName;

        var productoCell = row.insertCell();
        productoCell.innerHTML = registro.productName;

        var cantidadCell = row.insertCell();
        cantidadCell.innerHTML = registro.quantity;

        var precioCell = row.insertCell();
        precioCell.innerHTML = registro.price;

        var fechaInicioCell = row.insertCell();
        fechaInicioCell.innerHTML = registro.startDate;

        var fechaEntregaCell = row.insertCell();
        fechaEntregaCell.innerHTML = registro.deliveryDate;

        var accionesCell = row.insertCell();
        var editButton = document.createElement("button");
        editButton.innerHTML = "Editar";
        editButton.classList = "btn";
        editButton.onclick = function() {
            editarRegistro(index);
        };
        accionesCell.appendChild(editButton);

        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Borrar";
        deleteButton.classList = "btn";
        deleteButton.onclick = function() {
            borrarRegistro(index);
        };
        accionesCell.appendChild(deleteButton);
    });
}

function editarRegistro(index) {
    var registros = JSON.parse(localStorage.getItem("registros")) || [];
    var registro = registros[index];

    var clientName = prompt("Ingrese el nuevo nombre del cliente:", registro.clientName);
    var productName = prompt("Ingrese el nuevo producto:", registro.productName);
    var quantity = prompt("Ingrese la nueva cantidad:", registro.quantity);
    var price = prompt("Ingrese el nuevo precio:", registro.price);
    var deliveryDate = prompt("Ingrese la nueva fecha de entrega:", registro.deliveryDate);
    var startDate = prompt("Ingrese la nueva fecha de inicio:", registro.startDate);

    registro.clientName = clientName;
    registro.productName = productName;
    registro.quantity = quantity;
    registro.price = price;
    registro.deliveryDate = deliveryDate;
    registro.startDate = startDate;

    localStorage.setItem("registros", JSON.stringify(registros));

    mostrarRegistros();
}

function borrarRegistro(index) {
    var registros = JSON.parse(localStorage.getItem("registros")) || [];
    registros.splice(index, 1);
    localStorage.setItem("registros", JSON.stringify(registros));

    mostrarRegistros();
}

window.onload = function() {
    mostrarRegistros();
};