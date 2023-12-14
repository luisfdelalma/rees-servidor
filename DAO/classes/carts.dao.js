import cartModel from "../models/cart.model.js";

export default class carts {

    create = async (CId, products) => {
        try {
            const cart = await cartModel.findOne({ CId: CId })
            if (cart) {
                console.log("El ID del carrito ingresado ya existe");
                return null
            } else {
                let result = await cartModel.create({ CId, products })
                return result
            }
        } catch (error) {
            console.log("Error: " + error);
            return null
        }
    }

    deleteCart = async (CId) => {
        try {

            const cart = cartModel.findOne({ CId: CId })
            if (cart) {
                let result = await cartModel.deleteOne({ CId: CId })
                return result
            } else {
                console.log("El ID del carrito ingresado no existe");
                return null
            }

        } catch (error) {
            console.log("Error: " + error);
            return null
        }
    }

    deleteProduct = async (CId, PId) => {
        try {
            const cart = await cartModel.findOne({ CId: CId })
            if (cart) {
                let productIndex = cart.products.findIndex((productItem) => productItem.product == PId)
                if (productIndex !== -1) {

                    cart.products.splice(productIndex, 1)
                    cart.save((err, updatedCart) => {
                        if (err) {
                            console.log("Error: " + err);
                            return null
                        } else {
                            console.log("Producto eliminado del carrito con éxito", updatedCart);
                            return updatedCart
                        }
                    })

                } else {
                    console.log("El producto a eliminar no se ha encontrado en el carrito");
                    return null
                }
            } else {
                console.log("El carrito ingresado no existe");
                return null
            }

        } catch (error) {
            console.log("Error: " + error);
            return null
        }
    }

    modifyCart = async (CId, newProducts) => {
        try {
            const cart = await cartModel.findOne({ CId: CId })

            if (cart) {
                let existingProducts = cart.products
                let exProdSet = existingProducts.map(prod => prod.product.toString())

                if (existingProducts.length !== 0) {
                    for (const newProd of newProducts) {
                        if (exProdSet.has(newProd.product)) {
                            let i = existingProducts.findIndex(el => el.product == newProd.products)
                            existingProducts[i].quantity += newProd.quantity
                        } else {
                            existingProducts.push(newProd)
                            exProdSet.add(newProd.product)
                        }
                    }
                    let result = await cartModel.updateOne({ CId: CId }, { products: existingProducts })
                    return result
                } else {
                    for (const newProd of newProducts) {
                        existingProducts.push(newProd)
                        let result = await cartModel.updateOne({ CId: CId }, { products: existingProducts })
                        return result
                    }
                }

            } else {
                console.log(`Error: No se ha encontrado ningún carrito con el id ingresado`);
                return null
            }

        } catch (error) {
            console.log(`Error: ${error}`);
            return null
        }
    }

    modifyProduct = async (CId, PId, newQ) => {

        try {
            const cart = await cartModel.findOne({ CId: CId })
            let products = cart.products
            let prodSet = products.map(prod => prod.product.toString())

            if (cart) {

                if (prodSet.has(PId)) {
                    let i = products.findIndex(el => el.product == PId)
                    products[i].quantity = newQ
                    let result = await cartModel.updateOne({ CId: CId }, { products: products })
                    return result
                } else {
                    console.log("El producto ingresado no se encuentra en el carrito");
                    return null
                }

            } else {
                console.log("No se ha encontrado el carrito ingresado");
                return null
            }

        } catch (error) {
            console.log(`Error: ${error}`);
            return null
        }


    }

    getCart = async (CId) => {
        const cart = await cartModel.findOne({ CId: CId })
        return cart
    }

}