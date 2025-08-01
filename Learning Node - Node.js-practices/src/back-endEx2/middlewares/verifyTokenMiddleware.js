import jwt from 'jsonwebtoken'


export const verifyToken = (req,res,next) =>{
     console.log('HEADERS:', req.headers)
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(400).json({error:'Token no proporcionado'})
    }

    const token = authHeader.split(' ')[1]

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    }catch(error){
        return res.status(403).json({error: 'Token invalido'})
    }
}

export const isOwnerOrAdmin = (req, res, next) =>{
    const userId = req.user.id
    const paramId = req.params.id
    const role = req.user.role

    if(userId === paramId || role === 'admin'){
        return next()
    }

    return res.status(403).json({message: 'Acceso denegado'})
}


export const checkRole = (role) => (req,res,next) =>{
    if(req.user.role !== role){
        return res.status(403).json({message:'Acceso denegado'})
    }
    next()
}