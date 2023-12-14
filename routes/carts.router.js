import { Router } from "express"
import { create, deleteCart, deleteProduct, getCart, modifyCart, modifyProduct } from "../controllers/cartsController.js"


const router = Router()

router.post("/", create)

router.delete("/:cid", deleteCart)

router.delete("/:cid/products/:pid", deleteProduct)

router.put("/:cid", modifyCart)

router.put("/:cid/products/:pid", modifyProduct)

router.get("/:cid", getCart)

export default router