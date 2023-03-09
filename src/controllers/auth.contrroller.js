import User from "../models/user.js";
import jwt  from "jsonwebtoken";
import config from "../config.js";
import Role from "../models/Role.js";


export const resgistrase = async (req, res) => {
    try {

        const { username, email, password, roles } = req.body;
        const user = new User({ username, email, password: await User.encryptPassword(password), roles });


        if(roles){
            const foundRole = await Role.find({name: {$in:roles}});
            user.roles = foundRole.map(role => role._id);
        }else{
            const role = await Role.findOne({name:"user"});
            user.roles = [role._id];
        }

        const newUser = await user.save();
        console.log(newUser);

        const token = jwt.sign({ id: newUser._id }, config.SECRET , {
            expiresIn: 86400 //24 HORAS
        });

        res.status(201).json({token});
        
    }

        catch (error) {
            return res.status(500).json({
                msg: 'Algo ha salido mal :(',
                error
            });
        }

}

export const ingresar = async(req, res) => {
    const {email,password} = req.body;

    const userFound = await User.findOne({email}).populate("roles");

    if(!userFound){
        return res.status(404).json({
            msg: 'User Not Found'
        })
    }

    const matchPassword = await User.comparePassword(password,userFound.password);

    if(!matchPassword) {
        return res.status(400).json({token:null, msg: 'Contraseña invalida'}); 
    }

    const token = jwt.sign({id:userFound._id},config.SECRET, {
        expiresIn: 86400
    })

    res.json({token})

}