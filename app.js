import express from "express"
import exphbs from "express-handlebars"
import mongoose from "mongoose"
import path from "path"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import initializePassport from "./config/passport.config.js"
import passport from "passport"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import "./config/config.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express()
const PORT = process.env.PORT


// IMPORTACION DE RUTAS
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import usersRouter from "./routes/users.router.js"

// HANDLE BARS CONFIG
app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"))

// SERVER
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
initializePassport()
app.use(passport.initialize())

const environment = async () => {
    await mongoose.connect(process.env.MONGO_URL)
}
environment()

app.use("/api/users", usersRouter)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})