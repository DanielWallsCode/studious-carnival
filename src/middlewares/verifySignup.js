import jwt from "jsonwebtoken";
import config from "../config.js";
import Role from "../models/Role.js";
import User from "../models/user.js";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];

        if (!token) return res.status(400).json({ msg: 'No hay token en la peticion' });

        const decoded = jwt.verify(token, config.SECRET);

        const user = await User.findById(decoded.id, { password: 0 });

        if (!user) {
            return res.status(404).json({
                msg: 'El usuario no existe'
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({msg:'No autorizado'});
    }
}

export const isModerator = async(req,res,next) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, config.SECRET);

    const user = await User.findById(decoded.id);
    const roles = await Role.find({_id:{$in: user.roles}});

    for(let i = 0;i < roles.length; i++){
        if(roles[i].name === "moderator"){
            next();
            return;
        }
    }

    return res.status(401).json({
        msg: 'Requiere Rol de moderador'
    })

}


export const isAdmin = async(req,res,next) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, config.SECRET);

    const user = await User.findById(decoded.id);
    const roles = await Role.find({_id:{$in: user.roles}});

    for(let i = 0;i < roles.length; i++){
        if(roles[i].name === "admin"){
            next();
            return;
        }
    }

    return res.status(401).json({
        msg: 'Requiere Rol de Administrador'
    })
}