import mongoose,{Schema} from "mongoose";

const ProductSchema = new Schema({
    title:{type:String, required:true, maxlength:250},
    slug:{type:String, required:true, maxlength:1000},
    sku:{type:String, required:true},
    categorie:{type:Schema.ObjectId, ref:'categorie', required:true},
    price_pesos:{type:Number, required:true},
    imagen:{type:String, required:true},
    state:{type:Number, default:2},//1:prueba-desarrollo, 2: publico, 3: anulado.
    stock:{type:Number, default:0},
    description:{type:String, required:true}
},{
    timestamps:true,
});

const Product = mongoose.model('product', ProductSchema);
export default Product;