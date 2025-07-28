export function errorHandler(err, req, res, next){
    console.log('[ERROR]', err.message)

    const statusCode = err.statusCode || 500
    const message = err.message || 'Ocurrio un error en el sistema'

    res.status(statusCode).json({
        ok:false,
        error:{
            message,
            type: err.type || 'Error en el sistema',
            statusCode
        },
    })
}