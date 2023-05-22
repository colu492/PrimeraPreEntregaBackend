const ListCart = require('../helpers/ListCarts.js');

class CartManager {
    async createCart() {
        const newCart = {
        id: Date.now(),
        products: [],
        };
        const carts = await ListCart.read();
        carts.push(newCart);
        await ListCart.write(carts);
        return newCart;
    }

    async addProductToCart(cartId, productId, quantity = 1) {
        const carts = await ListCart.read();
        const cartIndex = carts.findIndex((cart) => cart.id === cartId);
        if (cartIndex === -1) {
        throw new Error('Carrito inexistente');
        }
        const productIndex = carts[cartIndex].products.findIndex((product) => product.id === productId);
        if (productIndex === -1) {
        carts[cartIndex].products.push({
            id: productId,
            quantity,
        });
        } else {
        carts[cartIndex].products[productIndex].quantity += quantity;
        }
        await ListCart.write(carts);
        return carts[cartIndex];
    }

    async getCart(cartId) {
        const carts = await ListCart.read();
        const cart = carts.find((cart) => cart.id === cartId);
        if (!cart) {
        throw new Error('Carrito inexistente');
        }
        return cart;
    }
}

module.exports = new CartManager();
