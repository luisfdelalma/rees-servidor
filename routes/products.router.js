import { Router } from "express"
import { create, deleteP, searchG, searchId, update } from "../controllers/productsController.js"

const router = Router()

router.get("/search", searchG)

router.get("/:pid", searchId)

router.post("/", create)

router.put("/:BId", update)

router.delete("/:BId", deleteP)

export default router