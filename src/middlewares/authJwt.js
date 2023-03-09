import { ROLES } from "../models/Role.js";
import User from "../models/user.js";

export const checkDuplicateUsernameOrEmail = async(req,res,next) => {
   const user = await User.findOne({username: req.body.username});

   if(user) return res.status(400).json({msg: 'El usuario Ya existe'});


   const userEmail = await User.findOne({email: req.body.email});

   if(userEmail) return res.status(400).json({msg:'El correo electronico ya esta registrado'});

   next();
}

export const checkRolesExisted = (req,res,next) => {
    if(req.body.roles){
        for(let i = 0;i < req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])){
                return res.status(400).json({
                    msg: `Role ${req.body.roles[i]} No existe` 
                })
            }
        }
    }

    next();
}