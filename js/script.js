
var productos;

/* TRAE CON AJAX EL JSON CON LA INFO DE TODOS LOS PRODUCTOS DE LA PAGINA */
let productosAjax = () => {
    return $.ajax({
        type: 'GET', 
        url: "../../data/datos.json",
        dataType: 'json',
        contentType: "application/json",
        success: function(respuesta){
            productos = respuesta
        },
        error: function() {
            alert("No se ha podido obtener la información");
        }
    });
}

let CARRITO;
var contador = localStorage.getItem('contador');
const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };

/* DISMINUYE LA CANTIDAD DEL PRODUCTO AL QUE SE LE HIZO CLICK A SU BOTON DE DISMINUIR Y SI SE DISMINUYE UN PRODUCTO QUE SU CANTIDAD ES 1 SE ELIMINA DEL CARRITO*/
function disminuirProducto (idProducto){
    for (var i = 0; i < CARRITO.length; i++){
        if (CARRITO[i].id == idProducto && CARRITO[i].cantidad == 1){
            CARRITO.splice(i, 1)
            contador--
            guardarLocal("contador", contador);
            contadorCarrito();
            guardarLocal("carrito", JSON.stringify(CARRITO))
            location.reload();
        } else if(CARRITO[i].id == idProducto){
            CARRITO[i].cantidad--;
            contador--
            guardarLocal("contador", contador);
            contadorCarrito();
            guardarLocal("carrito", JSON.stringify(CARRITO))
            location.reload();
        }
    }
}

/* AUMENTA LA CANTIDAD DEL PRODUCTO AL QUE SE LE HIZO CLICK A SU BOTON DE AUMENTAR */
function aumentarProducto (idProducto){
    for (var i = 0; i < CARRITO.length; i++){
        if(CARRITO[i].id == idProducto){
            CARRITO[i].cantidad++;
            contador++;
            guardarLocal("contador", contador);
            contadorCarrito();
            guardarLocal("carrito", JSON.stringify(CARRITO))
            location.reload();
        }
    }
}

/* ESTA FUNCION ELIMINA AL PRODUCTO MANDADO POR PARAMTRO DEL CARRITO */
function eliminarProducto(idProducto){
    for (var i = 0; i < CARRITO.length; i++){
        if(CARRITO[i].id == idProducto){
            contador = contador - CARRITO[i].cantidad
            CARRITO.splice(i, 1)
            guardarLocal("carrito", JSON.stringify(CARRITO))
            guardarLocal("contador", contador);
            location.reload();
        }
    }
}

/* SE LLAMA PARA AUMENTAR LA CANTIDAD DEL PRODUCTO MANDADO POR PARAMETRO */
function aumentarCantidad(idProducto) {
    for (let i = 0; i < CARRITO.length; i++) {
        if (CARRITO[i].id == idProducto){
            CARRITO[i].cantidad++
        }
    }
}

/* AGREGA EL PRODUCTO MANDADO POR PARAMETRO AL CARRITO */
function agregarCarrito(indice) {
    CARRITO.push(productos.productos[indice])
}

/* VERIFICA SI UN PRODUCTO ESTA DUPLICADO EN EL CARRITO */
function esDuplicado(idProducto) {
    duplicado = false
    for (let i = 0; i < CARRITO.length; i++) {
        if (CARRITO[i].id == idProducto) {
            duplicado = true
        }
    }
    return duplicado
}

/* MUESTRA EN EN EL DOM DEL CONTADOR DEL CARRITO LA CANTIDAD DE PRODUCTOS AGREGADOS EN EL CARRITO O CERO SI NO HAY PRODUCTOS */
function contadorCarrito(){
    if (parseInt(localStorage.getItem('contador')) > 0) {
        $(".conteo-carrito span").text(localStorage.getItem('contador'));
    } else {
        localStorage.setItem('contador', 0);
        $(".conteo-carrito span").text(localStorage.getItem('contador'));
    }
}

/* VERIFICA SI EL CARRITO ESTA VACIO O YA TIENE PRODUCTOS AGREGADOS */
function carrito(){
    if (CARRITO !== null){
        CARRITO = JSON.parse(localStorage.getItem("carrito"));
    }else {
        CARRITO = [];
    }
}


/* ESTA FUNCION SE LLAMA AL HACER CLICK EN EL BOTON COMPRAR DE CADA PRODUCTO */
function obtenerProducto (idProducto) {
    carrito();
    contador++
    guardarLocal("contador", contador);
    contadorCarrito();

    if (esDuplicado(idProducto) != true) {
        for (var i = 0; i < productos.productos.length; i++){
            if (productos.productos[i].id == idProducto ){
                agregarCarrito(i)
            }
        }
        aumentarCantidad(idProducto)
    }else {
        aumentarCantidad(idProducto)
    }
    guardarLocal("carrito", JSON.stringify(CARRITO));
    for (var i = 0; i < productos.productos.length; i++){
        if (productos.productos[i].id == idProducto ){
            notificacion("agregar", productos.productos[i].nombre, productos.productos[i].precio);
        }
    }
};

/**
 * NOTIFICACIONES
 */

function cerrarNotificacion() {
    $(".alert").remove();
}

/* MENSAJE QUE SE MOSTRARA AL AGREGAR UN PRODUCTO AL CARRITO */
function MENSAJE_agregarProductoCarrito (nombre, precio) {
    return `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;"><symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></symbol></svg><div class="alert alert-success alert-dismissible fade show d-flex align-items-center" style="flex-direction: column; width: 400px;" role="alert"><div style="display: flex; align-items: baseline; border-bottom: 2px solid #a8d1bf; padding-bottom: 10px;
    margin-bottom: 20px; width: 100%"><svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg><h3>Se agrego al carrito</h3></div><div><h4>${nombre} - $${precio}</h4></div>
    </div>`; 
};

/* MENSAJE QUE SE MOSTRARA AL VACIAR POR COMPLETO EL CARRITO */
function MENSAJE_vaciarCarrito () {
    return 'Carrito eliminado!';
};

/* MOSTRARA LA NOTIFICACION CORRESPONDIENTE SI SE AGREGO UN PRODUCTO AL CARRITO O SI SE VACIO EL CARRITO */
function notificacion (accion, nombre, precio) {
    if (accion == "agregar") {
        $(".toast-container").append(`${MENSAJE_agregarProductoCarrito(nombre, precio)}`);
        setTimeout(()=>{ 
            $('.alert').addClass('hide');
            setTimeout(()=>{
                $('.alert').remove()
            }, 1000);
        }, 5000);
    }  else if (accion == "vaciarCarrito") {
        $(".toast-container-vaciar").append(`<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>${MENSAJE_vaciarCarrito()}</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`)
        setTimeout(() => {
            $(".toast-container-vaciar").remove();
        }, 2000);
    }
};

productosAjax();
carrito();
contadorCarrito();