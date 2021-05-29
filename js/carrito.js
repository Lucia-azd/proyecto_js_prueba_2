var aviso_carrito; 
var contadorCarrito = localStorage.getItem('contador');
var subtotal;

$(".conteo-carrito span").text(contadorCarrito);

function init(){
    /* SI EL CONTADOR DE PRODUCTOS EN EL CARRITO ES DISTINTO A CERO SE VA A CARGAR EN EL DOM TODA LA INFO DEL CARRITO (PRODUCTOS AGREGADOS, TOTAL, BOTONES DE VACIAR CARRITO Y FINALIZAR COMPRA) Y SI ES IGUAL A CERO EL CONTADOR DEL CARRITO VA A SER IGUAL A CERO*/
    if (parseInt(contadorCarrito) > 0) {
    
    $(".detalles-carrito").append(
        '<table class="table table-striped"><thead class="table-dark"><tr style="font-size: 20px;"><th scope="col"></th><th scope="col">Producto</th><th scope="col" style="text-align:center;">Cantidad</th><th scope="col" style="text-align:center;">Subtotal</th><th scope="col" style="text-align:center;"></th></tr></thead><tbody class="body-detalles"></tbody></table>');

        const almacenadosCarrito = JSON.parse(localStorage.getItem("carrito"));

        for (let i = 0; i < almacenadosCarrito.length; i++){
            subtotal = almacenadosCarrito[i].precio * almacenadosCarrito[i].cantidad

            $(".body-detalles").append(
                `<tr style="font-size: 20px;"><th scope="row" style="text-align:center;"><img src="${almacenadosCarrito[i].img}" style="max-height: 65px;" alt=""></th><td style="vertical-align: middle;">${almacenadosCarrito[i].nombre}</td><td style="vertical-align: middle;"><div style="display:flex; justify-content: space-around; align-items: center;"><button type="button" class="btn btn-danger boton-disminuir" onclick="disminuirProducto('${almacenadosCarrito[i].id}')" style="padding: unset; height: 25px; width: 25px;">-</button><p style="margin-bottom:unset;">${almacenadosCarrito[i].cantidad}</p><button type="button" class="btn btn-success boton-aumentar" onclick="aumentarProducto('${almacenadosCarrito[i].id}')" style="padding: unset; height: 25px; width: 25px;">+</button></div></td><td style="text-align:center; vertical-align: middle;">$ ${subtotal}</td><td style="vertical-align: middle; text-align:center;"><button style="font-size: 10px;" type="button" class="btn-close" onclick="eliminarProducto('${almacenadosCarrito[i].id}')" aria-label="Close"></button></td></tr>`);
        }

        function total() {
            /* CALCULA EL TOTAL DE LOS PRODUCTOS EN EL CARRITO */
            let total = almacenadosCarrito.reduce((acc, cur) => {
                acc += cur.precio * cur.cantidad
                return acc
            }, 0);
            localStorage.setItem('total', total)
            return total
        }

        $(".body-detalles").append(
            `<tr style="font-size: 20px;"><th></th><td style="vertical-align: middle; font-weight: bold;">TOTAL</td><td style="vertical-align: middle;"></td><td style="text-align:center; vertical-align: middle; font-weight: bold;">$ ${total()}</td><td style="vertical-align: middle; text-align:center;"></td></tr>`);

        var vaciarCarrito = function(){
            /* ESTA FUNCION SE LLAMA AL HACER CLICK EN VACIAR CARRITO, VA A LIMPIAR EL LOCALSTORAGE Y VOLVER A COLOCAR EN EL DOM EL AVISO DE CARRITO VACIO */
            localStorage.clear();
            $(".table").empty();
            $('.contenedor-vaciar').empty();
            $('.carrito-vacio').append('<h2 class="aviso-carrito-vacio" style="font-family: sans-serif;">Su carrito está vacío <a href="../../index.html">¡Seguir comprando!</a></h2>')
            notificacion("vaciarCarrito");
            $(".conteo-carrito span").text(0);
        };

        /* SE ELIMINA EL AVISO DE CARRITO VACIO EN EL DOM Y SE AGREGAN LOS BOTONOSE DE VACIAR CARRITO Y FINALIZAR COMPRA*/
        $('.aviso-carrito-vacio').remove();
        $('.contenedor-vaciar').append(`<button onclick="location.href='../formulario_finalizar_compra/formulario.html'" style="margin: 0 30px" type="button" class="btn btn-dark">Finalizar compra</button> <button type="button" class="btn btn-outline-dark boton-vaciar">Vaciar carrito</button>`)
        $('.boton-vaciar').on('click', vaciarCarrito);
    } else {
        $(".conteo-carrito span").text(0);
    }
};

init();
