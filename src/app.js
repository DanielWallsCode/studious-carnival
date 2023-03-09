import express, { urlencoded } from "express";
import morgan from "morgan";

import { createRoles } from "./libs/initialSetups.js";

import productos from "./routes/products.routes.js";
import auth from "./routes/auth.routes.js";
import usuarios from "./routes/user.routes.js";


export const app = express();
createRoles();

// SETTINGS


// MIDDLEWARES
app.use(morgan('dev'));

app.use(express.json());
app.use(urlencoded({extended:false}))


// ROUTES
app.use('/productos',productos);
app.use('/',auth);
app.use('/usuarios',usuarios);

app.get('/',(req,res) => {
    res.send('Welcome')
});





