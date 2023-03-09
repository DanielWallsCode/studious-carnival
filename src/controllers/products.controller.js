import Product from "../models/product.js";


export const crearProducto = async (req, res) => {
    try {
        const { title, category, price, imgUrl } = req.body;

        const product = new Product({ title, category, price, imgUrl });
        const newProduct = await product.save();

        res.json({
            newProduct
        });
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const obetenerProductos = async (req, res) => {
    try {
        const product = await Product.find();
        res.json(product);

    } catch (error) {
        return res.status(500).json({
            msg: 'Algo salio mal',
            error
        })
    }
}

export const obtenerProducto = async (req, res) => {

    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        res.json(product);

    } catch (error) {
        return res.status(500).json({
            msg: 'Algo salio mal',
            error
        })
    }


}

export const actualizarProducto = async (req, res) => {

    try {
        const { id } = req.params;
        const { title, price, category, imgUrl } = req.body;

        const product = await Product.findByIdAndUpdate(id, { title, price, category, imgUrl },{
            new: true
        });
        res.json(product)

    } catch (error) {
        return res.status(500).json({
            msg: 'Algo salio mal',
            error
        })
    }


}

export const eliminarProducto = async (req, res) => {

    try {
        const { id } = req.params;

        const productDelete = await Product.findByIdAndDelete(id);

        res.json(productDelete)

    } catch (error) {
        return res.status(500).json({
            msg: 'Algo salio mal',
            error
        })
    }
}