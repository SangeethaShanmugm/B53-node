import { client } from "./index.js";
import bcrypt from "bcrypt"
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


async function genPassword(password) {
    const salt = await bcrypt.genSalt(10)//bcrypt.genSalt(no. of rounds)
    console.log(salt)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

async function createUser(username, hashedPassword) {
    return client.db("b53-node").collection("users")
        .insertOne({ username: username, password: hashedPassword });
}

async function getUserByName(username) {
    return client.db("b53-node").collection("users")
        .findOne({ username: username });
}


export { getAllProducts, getProductById, deleteProductById, addProducts, updateProducts, genPassword, createUser, getUserByName }