const fs = require("fs");

class ProductManager {
    constructor() {
        this.path = "./productos.txt"
        this.products = []

    }

    static id = 0

    addProduct = async (title, description, price, img, code, stock) => {

        ProductManager.id++

        let newProduct = {
            title,
            description,
            price,
            img,
            code,
            stock,
            id: ProductManager.id
        };

        this.products.push(newProduct)

        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
    };

    readProducts = async () => {
        let respuesta = await fs.promises.readFile(this.path, "utf-8")
        return JSON.parse(respuesta)

    }

    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2)
    }

    getProductById = async (id) => {
        let respuesta3 = await this.readProducts()
        if (!respuesta3.find(product => product.id === id)) {
            console.log("not found");

        } else {
            console.log(respuesta3.find((product) => product.id === id));

        }

    };

    deleteProductById = async (id) => {
        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter(products => products.id != id);
        await fs.promises.writeFile(this.path, JSON.stringify(productFilter, null, 2));

    };


    updateProducts = async ({ id, ...producto }) => {
        await this.deleteProductById(id);
        let productViejo = await this.readProducts();
        let productModificado = [{ id, ...producto }, ...productViejo];
        await fs.promises.writeFile(this.path, JSON.stringify(productModificado,null,2));
    };

}

const productos = new ProductManager();
//productos.addProduct("producto prueba", "este es un producto prueba", 200, "img", "abc123", 25);
//productos.addProduct("producto prueba2", "este es un producto prueba2", 400, "img", "abc123", 50);

//productos.getProducts ()

//productos.getProductById (3);

//productos.deleteProductById(1)

productos.updateProducts({
    title: "prueba 3",
    description: "prod 3",
    price: 6000,
    img: "img",
    code: "abc 345",
    stock: 16,
    id: 3
})

