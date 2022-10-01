let listaClientes = [], campoCedula, campoNombre, ultimoElementoContador

function leerLocalStorage() {
    listaClientes = []

    JSON.parse(localStorage.getItem(0)) !== null ?
        listaClientes = JSON.parse(localStorage.getItem(0))
        :
        console.log("No hay localStorage en el momento");

    return listaClientes
}

function buscarCliente() {
    event.preventDefault()

    campoCedula = document.getElementById('campoCedula').value

    if (campoCedula !== "") {
        listaClientes = leerLocalStorage()

        let registroEncontrado = listaClientes.find(elemento => elemento.cedula == campoCedula)

        if (registroEncontrado !== undefined) {
            document.getElementById('campoNombre').value = registroEncontrado.nombre
        } else {
            document.getElementById('campoNombre').value = ""
            alert("Este cliente No existe.")
        }

    } else alert("Debe llenar ambos campos para Registrar.")
}

function registrarCliente() {
    event.preventDefault()

    campoCedula = document.getElementById('campoCedula').value
    //console.log(campoCedula);
    campoNombre = document.getElementById('campoNombre').value
    //console.log(campoNombre);

    if (campoCedula !== "" && campoNombre !== "") {
        listaClientes = leerLocalStorage()

        if (listaClientes.find(elemento => elemento.cedula == campoCedula) == undefined) {
            listaClientes.push({
                cedula: campoCedula,
                nombre: campoNombre,
                ventas: []
            },)
            localStorage.clear()
            localStorage.setItem(0, JSON.stringify(listaClientes))
            alert("Se ha registrado el cliente.")
        } else {
            alert("Este cliente ya existe y no puede ser añadido nuevamente")
        }

        console.log(listaClientes);

        document.getElementById('formularioClientes').reset()
    } else alert("Debe llenar ambos campos para Registrar.")
}

function eliminarCliente() {
    event.preventDefault()

    campoCedula = document.getElementById('campoCedula').value

    if (campoCedula !== "") {
        listaClientes = leerLocalStorage()

        let registroEncontrado = listaClientes.find(elemento => elemento.cedula == campoCedula)

        if (registroEncontrado !== undefined) {
            listaClientes = listaClientes.filter(registro => registro.cedula !== registroEncontrado.cedula)

            localStorage.clear()
            localStorage.setItem(0, JSON.stringify(listaClientes))

            alert(registroEncontrado.nombre + " fue eliminado.");
        } else {
            document.getElementById('campoNombre').value = ""
            alert("Este cliente No existe.")
        }
    } else alert("Debe digitar una cédula existente para eliminar.")

    document.getElementById('formularioClientes').reset()
}

function actualizarCliente() {
    event.preventDefault()

    campoCedula = document.getElementById('campoCedula').value

    if (campoCedula !== "") {
        listaClientes = leerLocalStorage()

        let registroEncontrado = listaClientes.find(elemento => elemento.cedula == campoCedula)

        if (registroEncontrado !== undefined) {

            campoNombre = document.getElementById('campoNombre').value

            alert(registroEncontrado.nombre + " fue actualizado a: " + campoNombre);
            registroEncontrado.nombre = campoNombre

            console.log(registroEncontrado);
            console.log(listaClientes);

            localStorage.clear()
            localStorage.setItem(0, JSON.stringify(listaClientes))

        } else {
            document.getElementById('campoNombre').value = ""
            alert("Este cliente No existe.")
        }
    } else alert("Debe llenar ambos campos para Actualizar.")

    document.getElementById('formularioClientes').reset()
}

(function () {
    //alert("hola")

    listaClientes = leerLocalStorage()

    let selectClientes = document.getElementById('selectClientes')
    let cliente

    listaClientes.forEach((element, index) => {

        cliente = document.createElement('option')
        cliente.value = element.cedula
        cliente.text = element.nombre
        selectClientes.appendChild(cliente)
    });

})()


//Aqui se esconde como imprimir todas las ventas por 1 cliente
function buscarVenta() {
    event.preventDefault()

    selectCliente = document.getElementById('selectClientes').value
    //console.log(selectCliente);

    campoID = document.getElementById('idVentas').value

    if (campoID !== "") {
        listaClientes = leerLocalStorage()

        let registroEncontrado = listaClientes.find(elemento => elemento.cedula == selectCliente)
        //console.log(registroEncontrado);
        let ventaEncontrada = registroEncontrado.ventas.find(element => element.id == campoID)
        console.log(ventaEncontrada);

        if (ventaEncontrada != undefined) {
            campoProducto = document.getElementById('producto').value = ventaEncontrada.producto
            campoFecha = document.getElementById('fecha').value = ventaEncontrada.fecha
            campoValor = document.getElementById('valor').value = ventaEncontrada.valor
        } else {
            campoID = document.getElementById('idVentas').value = ""
            alert("Ese registro no existe")
        }
        /*
            //Sirve para imprimir todas las ventas
            ventaEncontrada.forEach(element => {
                console.log(element);
            });
        */
    } else alert("El campo ID es requerido.")
}

function registrarVenta() {
    event.preventDefault()

    selectCliente = document.getElementById('selectClientes').value
    //console.log(selectCliente);

    //campoID = document.getElementById('idVentas').value
    campoProducto = document.getElementById('producto').value
    campoFecha = document.getElementById('fecha').value
    campoValor = document.getElementById('valor').value

    if (campoProducto !== "" && campoFecha !== "" && campoValor !== "") {
        listaClientes = leerLocalStorage()

        let registroEncontrado = listaClientes.find(elemento => elemento.cedula == selectCliente)
        //console.log(registroEncontrado);

        let cantidadElementosVentas = registroEncontrado.ventas.length
        console.log("Cantidad de ventas: ", cantidadElementosVentas + 1);

        try {
            ultimoElementoContador = registroEncontrado.ventas[cantidadElementosVentas - 1].id
            console.log("Ultimo id: " + ultimoElementoContador);
        } catch (error) { }

        if (cantidadElementosVentas <= 0) {
            registroEncontrado.ventas.push({
                id: 0,
                producto: campoProducto,
                fecha: campoFecha,
                valor: campoValor
            },)
        } else if (cantidadElementosVentas > 0) {
            registroEncontrado.ventas.push({
                id: ultimoElementoContador + 1,
                producto: campoProducto,
                fecha: campoFecha,
                valor: campoValor
            },)
        }

        localStorage.clear()
        localStorage.setItem(0, JSON.stringify(listaClientes))
        alert("Se ha registrado la venta.")

        //console.log(listaClientes);

        document.getElementById('formularioVentas').reset()
    } else alert("Debe llenar los campos para registrar una venta.")
}