import { Router } from "express"
import passport from "passport"

const router = Router()

// IMPORTACIONES (RUTAS) NUEVAS
import { current, loginG, loginP, registerG, registerP } from "../controllers/usersControllers.js"

// VERSION NUEVA
router.get("/register", registerG)

router.post("/register", registerP)

router.get("/login", loginG)

router.post("/login", loginP)

router.get("/current", passport.authenticate("jwt", { session: false }), current)

export default router