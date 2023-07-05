function guardarRegistro() {
    var clientName = document.getElementById("clientName").value;
    var productName = document.getElementById("productName").value;
    var quantity = document.getElementById("quantity").value;
    var price = document.getElementById("price").value;
    var deliveryDate = document.getElementById("deliveryDate").value;
    var startDate = document.getElementById("startDate").value;

    var registro = {
        clientName: clientName,
        productName: productName,
        quantity: quantity,
        price: price,
        deliveryDate: deliveryDate,
        startDate: startDate
    };

    var registros = JSON.parse(localStorage.getItem("registros")) || [];
    registros.push(registro);
    localStorage.setItem("registros", JSON.stringify(registros));

    document.getElementById("registroForm").reset();
    alert("Registro guardado correctamente.");
}