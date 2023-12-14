import { usersServices } from "../repositories/index.js";
import { isValidatedPassword } from "../utils.js";
import jwt from "jsonwebtoken"

export const loginG = (req, res) => {
    res.render("login")
}

export const loginP = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).send({ status: "error", error: "Faltan valores" })

    let user = await usersServices.getByEmail(email)
    console.log(user);

    if (!user) return res.status(400).send({ status: "error", error: "Usuario no registrado" })

    if (!isValidatedPassword(user, password)) {
        res.status(403).send({ status: "error", error: "Password incorrecto" })
    } else {

        let token = jwt.sign({ email, password }, "coderKey", { expiresIn: "12h" })
        delete user.password
        res.cookie("CoderCookie", token, { maxAge: 60 * 60 * 12 * 1000, httpOnly: true }).send({ message: "logged in!" })
    }
}

export const registerG = (req, res) => {
    res.render("register")
}

export const registerP = async (req, res) => {
    const user = await usersServices.getByEmail(req.body.email)
    try {

        if (user) {
            console.log("El usuario ya existe");
            res.render("useralreadyexists")
        } else {

            let result = await usersServices.create(req.body)
            res.render("successregister")
        }

    } catch (error) {
        console.log("Error al obtener el usuario" + error)
    }
}

export const current = (req, res) => {
    res.send({ status: "success", payload: req.user })
}