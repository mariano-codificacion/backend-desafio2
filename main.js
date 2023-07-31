import { Product } from './product.js'
import { promises as fs } from 'fs'



class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path;
    }


    //Retornar todos los productos
    getProducts() {
        //this.products = JSON.parse(fs.readFile(this.path, 'utf-8'));
        //this.products = JSON.parse(this.path, 'utf-8'))
        console.log(this.products);
    }
    async addProduct(product) {
        //this.products = JSON.parse(fs.readFile(this.path, 'utf-8'));
        //Consulto si mi producto ya existe en el txt
        if (this.products.find(producto => producto.id == product.id)) {
            return "Producto ya agregado"
        }
        //Lo agrego al array al ya saber que no existe
        this.products.push(product)
        //Parsearlo y guardar el array modificado
        await fs.writeFile(this.path, JSON.stringify(this.products))
        return this.products
    }
    getProductById(id) {
        //En el productManager, la ruta esta en this.path
        //this.products = JSON.parse(fs.readFile(this.path, 'utf-8'));
        const buscado = this.products.find(producto => producto.id === id)
        if (buscado) {
            console.log(buscado)
        } else {
            console.log("Producto no existe")
        }
    }
    
    async updateProduct (id, { title, description, price, thumbnail, code, stock, }) {

        this.products = JSON.parse(await fs.readFile(this.path, 'utf-8'));

        const indice = this.products.findIndex(prod => prod.id === id)
    
        if (indice != -1) {
            //Mediante el indice modifico todos los atributos de mi objeto
            this.products[indice].title = title
            this.products[indice].description = description
            this.products[indice].price = price
            this.products[indice].thumbnail = thumbnail
            this.products[indice].code = code
            this.products[indice].stock = stock
            
            await fs.writeFile(this.path, JSON.stringify(this.products))
            console.log(this.products);
        } else {
            console.log("Producto no encontrado")
        }
       
    }
    
    async deleteProduct (id) {
        //this.products = JSON.parse(fs.readFile(this.path, 'utf-8'));
        const buscado = this.products.find(item => item.id === id);
        if (!buscado) {
            console.log("error: not found");
        }
        const prods = this.products.filter(prod => prod.id != id)
        this.products = prods;
        await fs.writeFile(this.path, JSON.stringify(this.products))
    }
    
}

const productManager = new ProductManager('prueba.txt')
const product1 = new Product("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
//const product2 = new Product("producto prueba", "Este es un producto prueba", 220, "Sin imagen", "abc124", 20)
productManager.getProducts();
productManager.addProduct(product1)
//productManager.addProduct(product2)
//productManager.getProducts();
console.log(productManager.getProductById(2))
productManager.deleteProduct(3)
console.log(productManager.getProducts())
productManager.updateProduct(1,{title: "zanahoria",description: "Este es un producto prueba", price: 200, thumbnail: "Sin imagen", code: "abc123", stock: 20})
//productManager.deleteProduct(2)
//console.log(productManager.getProductById(1))
//console.log(productManager.getProducts())
//productManager.deleteProduct(2)
//console.log(productManager.getProducts())
