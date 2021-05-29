const almacenadosCarrito = JSON.parse(localStorage.getItem("carrito"));
const total = localStorage.getItem("total")
let nombre = ""
let apellido = ""
let email = ""

/* SE CARGA EN EL DOM TODA LA INFORMACION DE LA COMPRA A REALIZAR */

for (let i = 0; i < almacenadosCarrito.length; i++){
    $('tbody').append(
    `<tr>
    <th scope="row"><img style="max-height: 65px;" src="${almacenadosCarrito[i].img}" alt=""></th>
    <td style="vertical-align: middle;">${almacenadosCarrito[i].nombre}</td>
    <td style="vertical-align: middle;">$${almacenadosCarrito[i].precio} x ${almacenadosCarrito[i].cantidad}</td>
    </tr>`)
}

$('tbody').append(`<tr style="margin: 50px 0; font-weight: bold;">
<th scope="row">TOTAL</th>
<td></td>
<td>$${total}</td>
</tr>`)

/* AL DAR CLICK EN EL BOTON CONTINUAR SE LLAMA A ESTA FUNCION QUE VA A ELIMINAR EL FORMULARIO Y VA A COLOCAR EL AVISO DE CONTINUAR COMPRA */

$('.boton-continuar').on('click', function() {
    nombre = $('.nombre').val()
    apellido = $('.apellido').val()
    email = $('.email').val()

    if (nombre != "" && apellido != "" && email != "") {
        $('.finalizar-compra').remove();
        $('.comprar').append(`<div style="border: 1px solid black; height: 500px; font-family: 'Roboto', sans-serif; border-radius: 30px; margin: 50px 0;"> <p style="text-align: center; padding-top: 50px; font-size: 60px; font-weight: bold;">!${nombre} ya casi es tuyo!</p><p style="font-size: 30px; text-align: center; margin-bottom: 50px;">Enviamos un mail con los pasos a seguir para terminar tu comprar al correo: ${email}</p> <p style="font-size: 40px; text-align: center;">¡Gracias por elegirnos!</p><!-- <p style="font-size: 40px; text-align: center;">iStore</p> --> <div style="display: flex; justify-content: center; margin-top: 30px;"><img style="filter: invert(100%); width: 200px;" src="../../imagenes/logo.png" alt=""></div></div><div style="display: flex; justify-content: flex-end; padding-bottom: 50px; box-sizing: border-box;"><a class='link-volver-inicio' href="../inicio_sitio/index.html" style="text-decoration: none; font-size: 20px; color: black;"> « Volver a inicio</a></div>`)
        localStorage.clear()
    }
});