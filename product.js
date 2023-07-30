export class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.id = Product.incrementarID()
    }
    //static significa metodo de clase
    static incrementarID() {
        if (this.idIncrement) { //Atributo de la clase. Si no existe, lo creo. Si existe, lo aumento en 1
            this.idIncrement++ //Si existe, lo aumento en uno
        } else {
            this.idIncrement = 1 //Valor inicial
        }
        return this.idIncrement
    }
}

