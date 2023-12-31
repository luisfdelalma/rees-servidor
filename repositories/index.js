import Users from "../DAO/classes/users.dao.js";
import userRepository from "./users.repository.js";
import Products from "../DAO/classes/products.dao.js";
import productRepository from "./products.repository.js";
import carts from "../DAO/classes/carts.dao.js";
import cartRepository from "./carts.repository.js";

export const usersServices = new userRepository(new Users)
export const productsServices = new productRepository(new Products)
export const cartsServices = new cartRepository(new carts)