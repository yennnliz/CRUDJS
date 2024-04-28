let listaEmpleados = [];

const objEmpleado = {
    id: '',
    nombre: '',
    cargo: ''
}

let editando = false;

const formulario = document.querySelector('#formulario');
const idInput = document.querySelector('#id');
const nombreInput = document.querySelector('#nombre');
const cargoInput = document.querySelector('#cargo');
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(nombreInput.value === '' || cargoInput.value === '') {
        alert('Llene los campos');
        return;
    }

    if(editando) {
        editarEmpleado();
        editando = false;
    } else {
        objEmpleado.id = idInput.value;
        objEmpleado.nombre = nombreInput.value;
        objEmpleado.cargo = cargoInput.value;

        agregarEmpleado();
    }
}

function confirmacionEliminar(){
    var confirmacion = confirm("¿Desea eliminar los datos seleccionados?");

    if (confirmacion){
        console.log("¡Datos eliminados!");
    } else{
        console.log("¡Eliminación cancelada!");
    }

}


function agregarEmpleado() {

    listaEmpleados.push({...objEmpleado});

    mostrarEmpleados();

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objEmpleado.id = '';
    objEmpleado.nombre = '';
    objEmpleado.cargo = '';
}

function mostrarEmpleados() {
    limpiarHTML();

    const divEmpleados = document.querySelector('.div-empleados');
    
    listaEmpleados.forEach(empleado => {
        const {id, nombre, cargo} = empleado;

        const parrafo = document.createElement('p');
        parrafo.textContent = `No. ${id}    -    ${nombre}    -    ${cargo}  `;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEmpleado(empleado);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEmpleado(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divEmpleados.appendChild(parrafo);
        divEmpleados.appendChild(hr);
    });
}

function cargarEmpleado(empleado) {
    const {id, nombre, cargo} = empleado;

    idInput.value = id;
    nombreInput.value = nombre;
    cargoInput.value = cargo;

    objEmpleado.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    
    editando = true;
}

function editarEmpleado() {

    objEmpleado.nombre = nombreInput.value;
    objEmpleado.cargo = cargoInput.value;

    listaEmpleados.map(empleado => {

        if(empleado.id === objEmpleado.id) {
            empleado.id = objEmpleado.id;
            empleado.nombre = objEmpleado.nombre;
            empleado.cargo = objEmpleado.cargo;

        }

    });

    limpiarHTML();
    mostrarEmpleados();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    
    editando = false;
}

function eliminarEmpleado(id) {
    
    confirmacionEliminar();

    listaEmpleados = listaEmpleados.filter(empleado => empleado.id !== id);

    limpiarHTML();
    mostrarEmpleados();
}

function limpiarHTML() {
    const divEmpleados = document.querySelector('.div-empleados');
    while(divEmpleados.firstChild) {
        divEmpleados.removeChild(divEmpleados.firstChild);
    }
}