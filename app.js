let listaClientes = [], campoCedula, campoNombre

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