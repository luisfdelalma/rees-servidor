import productModel from "../models/product.model.js";

export default class Products {

    create = async (product) => {
        try {
            const productf = await productModel.findOne({ BId: product.BId })
            if (productf) {
                return null
            } else {
                const result = productModel.create({ ...product })
                return result
            }
        } catch (error) {
            console.log("Error: " + error);
            return null
        }
    }

    update = async (BId, product) => {
        if (!product.title || !product.description || !product.code || !product.price || !product.status || !product.stock || !product.category || !product.thumbnail) {
            return null
        } else {
            let result = await productModel.updateOne({ BId: BId }, product)
            return result
        }
    }

    delete = async (BId) => {
        let product = await productModel.findOne({ BId: BId })

        if (!product) {
            return null
        } else {
            let result = await productModel.deleteOne({ BId: BId })
            return result
        }
    }

    searchQuery = async (limit, page, sort, category, status) => {

        if (!sort) {
            try {
                let result = await productModel.paginate({ category: category, status: status }, { page: page, limit: limit }, function (err, res) {
                    if (err) {
                        console.error(err)
                    } else {
                        return {
                            docs: res.docs,
                            totalPages: res.totalPages,
                            prevPage: res.prevPage,
                            nextPage: res.nextPage,
                            page: res.page,
                            hasPrevPage: res.hasPrevPage,
                            hasNextPage: res.hasNextPage,
                            prevLink: res.hasPrevPage ? `page=${page - 1}` : null,
                            nextLink: res.hasNextPage ? `page=${page + 1}` : null
                        }
                    }
                }, { lean: true })

                return result

            } catch (error) {
                console.log(error);
                return null
            }
        } else {
            try {
                let result = await productModel.paginate({ category: category, status: status }, { page: page, limit: limit, sort: { price: sort } }, function (err, res) {
                    if (err) {
                        console.error(err)
                    } else {
                        return {
                            docs: res.docs,
                            totalPages: res.totalPages,
                            prevPage: res.prevPage,
                            nextPage: res.nextPage,
                            page: res.page,
                            hasPrevPage: res.hasPrevPage,
                            hasNextPage: res.hasNextPage,
                            prevLink: res.hasPrevPage ? `page=${page - 1}` : null,
                            nextLink: res.hasNextPage ? `page=${page + 1}` : null
                        }
                    }
                }, { lean: true })

                return result

            } catch (error) {
                console.log(error);
                return null
            }
        }
    }

    searchBId = async (BId) => {
        let result = await productModel.paginate({ BId: BId }, {}, function (err, res) {
            if (err) {
                console.error(err)
            } else {
                return {
                    docs: res.docs,
                    totalPages: res.totalPages,
                    prevPage: res.prevPage,
                    nextPAge: res.nextPage,
                    page: res.page,
                    hasPrevPage: res.hasPrevPage,
                    hasNextPage: res.hasNextPage,
                    prevLink: res.hasPrevPage ? `/api/products/search?page=${page - 1}` : null,
                    nextLink: res.hasNextPage ? `/api/products/search?page=${page + 1}` : null
                }
            }
        }, { lean: true })

        let rendProd = result.docs.map(item => item.toObject())

        return {
            products: rendProd,
            hasNextPage: result.hasNextPage,
            hasPrevPage: result.hasPrevPage
        }
    }
}