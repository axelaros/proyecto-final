export const traerPeliculas = async() =>{
    let respuesta = await fetch("./bd/stock.json")
    return respuesta.json()
    }