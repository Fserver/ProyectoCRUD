let listaClientes, campoCedula, campoNombre
let cantidadRegistros = 0

function leerLocalStorage() {
    listaClientes = []

    let hayItems = true
    let contador = 0
    while (hayItems) {

        if (localStorage.getItem(contador)) {
            //Para leer el objeto en localStorage
            listaClientes.push(JSON.parse(localStorage.getItem(contador)))
            contador++

        } else hayItems = false
    }
    console.log(listaClientes);
    return contador
}

function buscarCliente() {
    event.preventDefault()

    campoCedula = document.getElementById('campoCedula').value

    cantidadRegistros = leerLocalStorage()

    if (cantidadRegistros > 0) {

        listaClientes.forEach((element, index) => {

            if (listaClientes[index].cedula == campoCedula) {
                document.getElementById('campoNombre').value = element.nombre
            }
        });
    }

}

function registrarCliente() {

    event.preventDefault()

    campoCedula = document.getElementById('campoCedula').value
    //console.log(campoCedula);
    campoNombre = document.getElementById('campoNombre').value
    //console.log(campoNombre);

    cantidadRegistros = leerLocalStorage()

    console.log("Registros Anteriores: " + cantidadRegistros);


    if (cantidadRegistros == 0) {

        listaClientes.push({
            cedula: campoCedula,
            nombre: campoNombre,
            ventas: []
        },)
        //Para colocar el objeto en localStorage
        listaClientes.forEach((element, index) => {
            localStorage.setItem(index, JSON.stringify(element))
            alert("Registro añadido!")
        });

    } else if (cantidadRegistros !== 0) {

        let siExiste = 0
        listaClientes.forEach((element, index) => {

            if (listaClientes[index].cedula == campoCedula) siExiste++
        });

        if (siExiste == 0) {
            let element2 = {
                cedula: campoCedula,
                nombre: campoNombre,
                ventas: []
            }
            //Para colocar el objeto en localStorage
            localStorage.setItem(cantidadRegistros, JSON.stringify(element2))
            alert("Registro añadido!")
        } else {
            alert("Esta cédula ya está registrada!")
        }
    }

    console.log("Registros Actuales: " + leerLocalStorage());

    document.getElementById('formularioClientes').reset()
}


//ARREGLAR ESTO
function eliminarCliente() {
    event.preventDefault()
    
    campoCedula = document.getElementById('campoCedula').value

    listaClientes = []

    let hayItems = true
    let contador = 0
    while (hayItems) {

        if (localStorage.getItem(contador)) {
            //Para leer el objeto en localStorage
            listaClientes.push(JSON.parse(localStorage.getItem(contador)))
            contador++

        } else hayItems = false
    }
    console.log(listaClientes);

    if (contador > 0) {

        listaClientes.forEach((element, index) => {

            if (listaClientes[index].cedula == campoCedula) {
                localStorage.removeItem(index)
                alert("Registro Eliminado.")
            }
        });
    }
}