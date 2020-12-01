const listaCarrito = document.querySelector('#lista-carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const carrito = document.querySelector('#carrito');
const listaCurso = document.querySelector('#lista-cursos');
let carritoCompras = [];

cargarEventsListeners();
function cargarEventsListeners () {
    listaCurso.addEventListener( 'click', agregarCurso );
    carrito.addEventListener('click', borrarCurso );
    vaciarCarritoBtn.addEventListener( 'click', vaciarCarrito )
}

//Funciones
function agregarCurso (e) {

    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){

        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

function leerDatosCurso (cursoSeleccionado) {

    const infoCurso = {
        imagen: cursoSeleccionado.querySelector('img').src,
        titulo: cursoSeleccionado.querySelector('h4').textContent,
        precio: cursoSeleccionado.querySelector('.precio span').textContent,
        id: cursoSeleccionado.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = carritoCompras.some( curso => curso.id === infoCurso.id );
    
    if(existe){
        const cursos = carritoCompras.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }
            else{
                return curso;
            }
        });
    
    carritoCompras = [...cursos];

    }
    else {
        carritoCompras = [...carritoCompras, infoCurso];
    }

    carritoHtml();

}

function carritoHtml () {

    limpiarHtml();
    carritoCompras.forEach( curso => {

        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100px">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-cantidad="${cantidad}" data-id="${id}"> X </a>
            </td>
        `;

        contenedorCarrito.appendChild(row);

    });
}

function limpiarHtml(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

function borrarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cantidad = e.target.getAttribute('data-cantidad');
        const idCurso = e.target.getAttribute('data-id');

        if(cantidad > 1){
            const cursos = carritoCompras.map( curso => {
                if(curso.id === idCurso){
                    curso.cantidad--;
                    return curso;
                }
                else{
                    return curso;
                }
            });
        
        carritoCompras = [...cursos];
        }
        else{
            carritoCompras = carritoCompras.filter( curso => curso.id !== idCurso)
        }
    }
    carritoHtml();
}

function vaciarCarrito(){
    console.log('Vaciando carrito....')
    carritoCompras = [];
    carritoHtml();
}