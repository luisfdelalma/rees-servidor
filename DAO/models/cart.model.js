import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const cartsCollection = "carts"
const cartsSchema = mongoose.Schema({
    CId: { type: Number, index: true },
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
            quantity: Number
        }
    ]

})

cartsSchema.pre("find", function () {
    this.populate("products.product")
})

cartsSchema.plugin(mongoosePaginate)

export default mongoose.model(cartsCollection, cartsSchema)

