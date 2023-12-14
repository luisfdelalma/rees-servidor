import { cartsServices } from "../repositories/index.js";

export const create = async (req, res) => {
    let { CId, products } = req.body
    if (!CId) {
        res.send({ status: "Error", error: "Falta el ID del carrito" })
    } else {
        let result = await cartsServices.create(CId, products)
        res.send({ result: "success", payload: result })
    }
}

export const deleteCart = async (req, res) => {
    let CId = req.params.CId

    if (CId) {
        let result = await cartsServices.deleteCart(CId)
        res.send({ result: "success", payload: result })
    } else {
        res.send({ status: "Error", error: "No se ingresó el id del carrito a eliminar" })
    }
}

export const deleteProduct = async (req, res) => {
    let CId = req.params.cid
    let PId = req.params.PId

    if (CId && PId) {
        let result = await cartsServices.deleteProduct(CId, PId)
        res.send({ result: "success", payload: result })
    } else {
        res.send({ status: "Error", error: "No se ingresó el id del carrito a modificar o el id del producto a eliminar" })
    }
}

export const modifyCart = async (req, res) => {
    let CId = req.params.cid
    let newProducts = req.body

    if (CId && newProducts) {
        let result = await cartsServices.modifyCart(CId, newProducts)
        res.send({ result: "success", payload: result })
    } else {
        res.send({ status: "Error", error: "No se ingresó el id del carrito a modificar o los productos a modificar" })
    }
}

export const modifyProduct = async (req, res) => {
    let CId = req.params.cid
    let PId = req.params.pid
    let newQ = req.body.quantity

    if (CId && PId && newQ) {
        let result = await cartsServices.modifyProduct(CId, PId, newQ)
        res.send({ result: "success", payload: result })
    } else {
        res.send({ status: "Error", error: "Faltan datos para modificar la cantidad de producto del carrito" })
    }
}

export const getCart = async (req, res) => {
    let CId = req.params.cid

    if (CId) {
        let result = await cartsServices.getCart(CId)
        res.send({ result: "success", payload: result })
    } else {
        res.send({ status: "Error", error: "No se ingresó el id del carrito a buscar" })
    }

    console.log(CId);
}