import { body,validationResult } from "express-validator";

export const validateUser = () => [
  body('email').isEmail().withMessage('El email no es válido'),
  body('name').notEmpty().withMessage('El nombre es obligatorio'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {  
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateID = () =>[
    param('id').isMongoid().withMessage('Id invalido'),
    (req,res,next) =>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({error: errors.array()})
        }
        next()
    }
]