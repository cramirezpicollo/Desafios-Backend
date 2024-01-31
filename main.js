class ProductManager {
    constructor() {
        this.products = [];

    }

    static id = 0

    addProduct(title, description, price, img, code, stock) {
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].code === code) {
                console.log(`El codigo ${code} está repetido`);
                break;
            }
        }

        ProductManager.id++
        this.products.push({ title, description, price, img, code, stock, id: ProductManager.id });
    }

    getProducts() {
        return this.products;
    }

    productoExistente(id) {
        return this.products.find((producto) => producto.id === id)
    }

    getProductById(id) {
        if (!this.productoExistente(id)) {
            console.log("Not found")
        } else {
            console.log(this.productoExistente(id))
        }
    }
}

let productoAgregado = new ProductManager();

productoAgregado.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)

console.log(productoAgregado.getProducts());

productoAgregado.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)

productoAgregado.getProductById(3)
