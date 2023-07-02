function mostrarRegistros() {
    var registros = JSON.parse(localStorage.getItem("registros")) || [];
    var registroList = document.getElementById("registroList");

    registroList.innerHTML = "";

    registros.forEach(function(registro, index) {
        var listItem = document.createElement("li");
        listItem.innerHTML = "<strong>Cliente:</strong> " + registro.clientName +
                             "<br><strong>Producto:</strong> " + registro.productName +
                             "<br><strong>Cantidad:</strong> " + registro.quantity +
                             "<br><strong>Precio:</strong> " + registro.price +
                             "<br><strong>Fecha de entrega:</strong> " + registro.deliveryDate +
                             "<br><strong>Fecha de inicio:</strong> " + registro.startDate +
                             "<button onclick='editarRegistro(" + index + ")'>Editar</button>" +
                             "<button onclick='borrarRegistro(" + index + ")'>Borrar</button>";

        registroList.appendChild(listItem);
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