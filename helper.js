import { client } from "./index.js";

function getAllProducts(req) {
    return client.db("b53-node").collection("products").find(req.query).toArray();
}
function getProductById(id) {
    return client.db("b53-node").collection("products").findOne({ id: id });
}
function deleteProductById(id) {
    return client.db("b53-node").collection("products").deleteOne({ id: id });
}
function addProducts(newProduct) {
    return client.db("b53-node").collection("products").insertMany(newProduct);
}


function updateProducts(id, updatedProduct) {
    return client.db("b53-node").collection("products")
        .updateOne({ id: id }, { $set: updatedProduct });
}

export { getAllProducts, getProductById, deleteProductById, addProducts, updateProducts }