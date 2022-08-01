import { traerPeliculas } from "../bd/bd.js"
let carrito=[]
const peliculas =  await traerPeliculas() 





const renderizarPeliculas= async()=>{
    document.querySelector(".card").innerHTML=""
   
    peliculas.forEach(pelicula=>{
        const {foto, nombre, genero, precio, duracion, estreno, id}= pelicula
        {
            document.querySelector(".card").innerHTML+=`
        <li class="li-item">
        <div class="contenedorFoto">
            <img  class="contenedorImg" src="${foto}">
        </div>
          <div class="container"> 
          <h2 class="card-title"> <b>Titulo: ${nombre} </b></h2>
          <p class="card-text"> Genero ${genero} </p>
          <p class="card-text"> Precio: $${precio}</p>
          <p class="card-text"> Duracion:${duracion}</p>
          <p class="card-text">Estreno: ${estreno}</p>
          <button class="btn btn-secondary" id="detalles" data-id="${id}" > Mas Detalles</button>
          <button class="btn btn-secondary" id="agregarpelicula" data-id="${id}"> Agregar al carro</button>
          </div>   
        </li>` 
        }
      pelicula=>document.getElementById(`agregarpelicula${pelicula.id}`).addEventListener("click", function(){
        agregarCarro(NuevoPelicula) 
      })
        document.getElementById("finalizarCompra").addEventListener("click", finalizarCompra)}
    
    )} 
renderizarPeliculas()





/*const GuardarLocalS= (clave,valor)=>{
    localStorage.setItem(clave,valor);
}*/

/*for (const peliculas of carteleraCine) {
    GuardarLocalS(peliculas.id , JSON.stringify(peliculas))
}*/

//GuardarLocalS("listaPeliculas",JSON.stringify(carteleraCine));


/*let listaA=JSON.parse(localStorage.getItem("listaPeliculas"));
console.log(listaA);*/

 
let nombrePelicula=document.querySelector("#entrada");
 
nombrePelicula.addEventListener("keyup",buscarPelicula)

function buscarPelicula(){
    let nombre=nombrePelicula.value
    console.log(nombre);
    if(nombre.length===0){
        renderizarPeliculas()
    }else{
        let peliculaEncontrada=peliculas.filter(pelicula=>pelicula.nombre.includes(nombre))
       
        renderizarUna(peliculaEncontrada);
        
    }
    
}




/*function renderizar () {
    document.querySelector(".card").innerHTML=""
    for (const pelicula of carteleraCine) {
       document.querySelector(".card").innerHTML+=`
        <li class="li-item">
        <div class="contenedorFoto">
            <img  class="contenedorImg" src="${pelicula.foto}">
        </div>
          <div class="container"> 
          <h2 class="card-title"> <b>Titulo: ${pelicula.nombre} </b></h2>
          <p class="card-text"> Genero ${pelicula.genero} </p>
          <p class="card-text"> Precio: $${pelicula.precio}</p>
          <p class="card-text"> Duracion:${pelicula.duracion}</p>
          <p class="card-text">Estreno: ${pelicula.estreno}</p>
          <button class="btn btn-secondary" id="detalles${pelicula.id}"> Mas Detalles</button>
          <button class="btn btn-secondary" id="boton${pelicula.id}"> Agregar al carro</button>
          </div>   
        </li>` 
       
    }

    carteleraCine.forEach(pelicula =>document.getElementById(`boton${pelicula.id}`).addEventListener("click",function () {
    agregarCarro(pelicula)
    } ))
    carteleraCine.forEach(pelicula=>document.getElementById(`detalles${pelicula.id}`).addEventListener("click", function (){
    detalles(pelicula)
    }))
   
}*/

const renderizarUna= async(peliculas)=> {
 console.log(peliculas);
    if(peliculas !== undefined){
        document.querySelector(".card").innerHTML=""
    for (const pelicula of peliculas) {
       document.querySelector(".card").innerHTML+=`
        <li class="li-item">
        <div class="contenedorFoto">
            <img  class="contenedorImg" src="${pelicula.foto}">
        </div>
          <div class="container"> 
          <h2 class="card-title"> <b>Titulo: ${pelicula.nombre} </b></h2>
          <p class="card-text"> Genero ${pelicula.genero} </p>
          <p class="card-text"> Precio: $${pelicula.precio}</p>
          <p class="card-text"> Duracion:${pelicula.duracion}</p>
          <p class="card-text">Estreno: ${pelicula.estreno}</p>
          <button class="btn btn-secondary" id="detalles" data-id="${pelicula.id}" > Mas Detalles</button>
          <button class="btn btn-secondary" id="agregarpelicula" data-id="${pelicula.id}"> Agregar al carro</button>
          </div>   
        </li>` 
       
    }

   
}else{ 
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'no se encuentran peliculas con ese nombre!',
    }) }
  document.querySelector(".card").innerHTML+=`
    
   
   <li class="li-item">
   <p> no se encuentran peliculas con ese nombre </p>
   
   </li>` 
 }


 document.querySelector(".card").addEventListener("click",(e)=>{
    if (e.target.id==="agregarpelicula") {
        agregaralstorage(e.target.dataset.id)
    }
    })
    
    function agregaralstorage(id){
        let pelicula=peliculas.find(pelicula=>pelicula.id === parseInt(id))
        let peliculastorage = JSON.parse(localStorage.getItem(id))
        if (peliculastorage===null) {
            localStorage.setItem(id,JSON.stringify({...pelicula, cantidad: 1}))
            agregarCarro()
         }else{
            let productoExiste = JSON.parse(localStorage.getItem(id))
            productoExiste.cantidad = productoExiste.cantidad +1
            productoExiste.precio = productoExiste.precio + pelicula.precio
            localStorage.setItem(id , JSON.stringify(productoExiste))
            
            
            
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'la pelicula ya se encuentra agregada!',
            })
            agregarCarro()
         }
        
    }

    



function agregarCarro() { 
    carrito.length=0
   for (let index = 0; index < localStorage.length; index++) {
    let key = localStorage.key(index)
    carrito.push(JSON.parse(localStorage.getItem(key)))
   
   } console.log(carrito);
   
  carritoVista()
  
}

renderizarUna()

document.querySelector(".card").addEventListener("click",(e)=>{
    if (e.target.id==="detalles") {
        detalles(e.target.dataset.id)
    }
    })



function detalles (id){
     let detalles= peliculas.find(detalles=>detalles.id == id)
     alert(detalles.descripcion)
}


document.querySelector("#productosEnCarrito")





function carritoVista(){
 if (carrito.length > 0) {
    carrito.forEach(pelicula => {
        const { nombre, precio, cantidad, id}= pelicula
        
        document.querySelector("#tablaCarrito ").innerHTML+= `
        <tr>
        <td>${nombre}</td>
        <td> $ ${precio}</td>
        <td>${id}</td> 
        <td>${cantidad}</td>
        <td><button class="btn btn-light" onclick="quitar(${id})"> X </button></td>
        </tr>  `
       
    });
    document.getElementById("precioTotal").innerText= `Total: $${calcularTotal()}`
    document.getElementById("finalizarCompra").addEventListener("click", Comprar)
    
}else{
  

    document.querySelector("#tablaCarrito").innerHTML= `
<div id="caritoVacio" style="width: 18rem;">
  <div class="card-body">
  <p class="card-text"> usted no dispone de ningun producto en su carrito</p>
    <p class="card-text">empieze a comprar y disfrute de nuestras ofertas</p>
  </div>
</div> 
`


}
calcularTotal()

}






   




function calcularTotal(){
    let suma=0

    for (const elemento of carrito) {
        suma = suma + (elemento.precio + elemento.cantidad)
    }
    return suma
}




document.getElementById("finalizarCompra").addEventListener("click", Comprar)

function Comprar(e){
    
    if(e.target.id==="finalizarCompra"){
    //let peliculascompradas= carritoVista()
     let precioTotal=calcularTotal() 
     Swal.fire({
        title: 'Queres comprar las peliculas seleccionadas?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Comprar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Compraste!',
          ` $  ${precioTotal}`,
            'success'
            )
        }
      })
      carrito=[]
      localStorage.clear()
      console.clear()
     
    }


    carritoVista()

        /*alert( `${peliculascompradas} total:\$   ${precioTotal}`)
       }*/
      
    }





/*let buscar=carrito.find(elemento=>elemento.id==productoCarro.id)
console.log(buscar);
if (buscar==undefined){
 let peliculaNuevo= new NuevoPelicula(productoCarro)
 carrito.push(peliculaNuevo)
 console.log(carrito);
}
else{
    let buscarIndex=carrito.findIndex(el=>el.id==productoCarro.id)
    console.log(buscarIndex);
    carrito[buscarIndex].cantidad+=1;
    document.getElementById(`${productoCarro.id}`).innerHTML=carrito[buscarIndex].cantidad;
}

document.getElementById("precioTotal").innerText= `Total: $${calcularTotal()}`
*/




/*document.querySelector("#tablaCarrito").innerHTML+=`
<tr>
<td>${peliculas.nombre}</td>
<td>$ ${peliculas.precio}</td>
<td>${peliculas.id}</td> 
</tr>


`*/

/*function quitar(){
    let encontrarIndex=carrito.findIndex(elemento=>elemento.id == id)
    carrito.splice(encontrarIndex,1)
    let quitarFila=document.getElementById(`fila${id}`)
    document.getElementById("tablaCarrito").removeChild(quitarFila)
    document.getElementById("precioTotal").innerText= `Total: $${calcularTotal()}`
}*/










/*agregarCarrito()
     mostrarCarrito()*/
    
 

/*function agregarCarrito(id){
let agregarPelicula=carteleraCine.find(pelicula.id===id)
console.log(agregarPelicula);
carrito.push(agregarPelicula)
mostrarCarrito(agregarPelicula)
}

function mostrarCarrito (agregarPelicula){
let div=document.createElement("div")
div.classList.add("peliculaEnCarrito")
div.innerHTML = `<p>${agregarPelicula.nombre}</p>
                 <p>precio:${agregarPelicula.precio}</p>
                 <button class="boton-eliminar"</button> `
                  Cart.appendChild(div)
}

function actualizarCarrito(){

}*/








/*document.querySelector("#tablaCarrito").innerHTML= `
<div id="caritoVacio" style="width: 18rem;">
  <div class="card-body">
  <p class="card-text"> usted no dispone de ningun producto en su carrito</p>
    <p class="card-text">empieze a comprar y disfrute de nuestras ofertas</p>
  </div>
</div> 
`*/