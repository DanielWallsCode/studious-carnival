import { app } from "./app.js";
import './databases.js';


app.listen(3000,() => {
    console.log('Servidor escuchando el puerto 3000')
})