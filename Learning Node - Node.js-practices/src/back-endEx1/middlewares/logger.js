export function logger(req, res, next){
    const metodo = req.method
    const ruta = req.path
    const hora = new Date().toLocaleTimeString()

    console.log(`${metodo} - ${ruta} - ${hora}`)
    next()
}