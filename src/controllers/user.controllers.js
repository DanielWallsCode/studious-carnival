import user from "../models/user.js";


export const crearUsuario = (req,res) => {
    res.json({msg:'Creating User'});
}

export const obtenerUsuarios = async(req,res) => {
    const usuarios =  await user.find();
    res.json(usuarios);
}
