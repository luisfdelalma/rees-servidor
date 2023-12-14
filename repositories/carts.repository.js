import cartDTO from "../DAO/dtos/carts.dto.js";

export default class cartRepository {
    constructor(dao) {
        this.dao = dao
    }

    async create(CId, products) {
        const DTOcart = new cartDTO(CId, products)
        const result = await this.dao.create(DTOcart)
        return result
    }

    async deleteCart(CId) {
        const result = await this.dao.deleteCart(CId)
        return result
    }

    async deleteProduct(CId, PId) {
        const result = await this.dao.deleteProduct(CId, PId)
        return result
    }

    async modifyCart(CId, newProducts) {
        const result = await this.dao.modifyCart(CId, newProducts)
        return result
    }

    async modifyProduct(CId, PId, newQ) {
        const result = await this.dao.modifyProduct(CId, PId, newQ)
        return result
    }

    async getCart(CId) {
        const result = await this.dao.getCart(CId)
        return result
    }
}