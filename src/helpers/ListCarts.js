const fs = require('fs');

class ListCart {
    constructor() {
        this.cartFilePath = './src/data/carts.json';
    }

    async read() {
        const cartFile = await fs.promises.readFile(this.cartFilePath);
        const carts = JSON.parse(cartFile.toString());
        return carts;
    }

    async write(carts) {
        await fs.promises.writeFile(this.cartFilePath, JSON.stringify(carts));
    }
}

module.exports = new ListCart();