import mongoose from "mongoose";

mongoose.connect('mongodb://localhost/jwtcompanydb')
    .then(db => console.log('Db is running'))
    .catch(err => console.log(err));