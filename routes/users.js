import express from "express"
import { genPassword, createUser, getUserByName } from "../helper.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const router = express.Router()//express router


router.post('/register', async (req, res) => {

    const { username, password } = req.body
    console.log(username, password)
    const isUserExist = await getUserByName(username)
    console.log(isUserExist)
    //username already exists
    if (isUserExist) {
        res.status(400).send({ message: "Username already exists" })
        return;
    }
    if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#$%_&]).{8,}$/g.test(password)) {
        res.status(400).send({ message: "Password pattern does not match" })
        return;
    }
    const hashedPassword = await genPassword(password)
    const result = await createUser(username, hashedPassword)
    res.send(result)
})

router.post('/login', async (req, res) => {

    const { username, password } = req.body
    console.log(username, password)
    //validate username
    const userFromDb = await getUserByName(username)
    console.log(userFromDb)
    // username already exists
    if (!userFromDb) {
        res.status(400).send({ message: "Invalid Credentials" })
        return;
    }
    //password validate
    const storedDbPassword = userFromDb.password;
    const isPasswordMatch = await bcrypt.compare(password, storedDbPassword)
    if (!isPasswordMatch) {
        res.status(400).send({ message: "Invalid Credentials" })
        return;
    }
    const token = jwt.sign({ id: userFromDb._id }, process.env.SECRET_KEY)
    res.send({ message: "Successful Login", token: token })
})


export const usersRoute = router