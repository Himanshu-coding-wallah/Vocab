import jwt from "jsonwebtoken"
import { UserModel } from "../model/user.model.js"
import bcrypt from "bcrypt"

export async function register(req, res){
    const {name,username, email, password} = req.body

    if(!name || !username || !email || !password){
        return res.status(401).json({
            message: 'please enter details'
        })
    }

    try {
        const isExist = await UserModel.findOne({email})
    
        if(isExist){
            return res.status(401).json({
                message : "user already exist"
            })
        }
    
        const hashPassword = await bcrypt.hash(password, 10)
            
        const user = await UserModel.create({
            name,
            username,
            email,
            password: hashPassword
        })

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        )

        res.cookie("token", token)

        return res.status(201).json({
            message : "user successfully created"
        })

    } catch (error) {
        console.log(error)
        res.send("error")
    }
}
export async function login(req, res){
    const { email, password} = req.body

    if(!email || !password){
        return res.status(401).json({
            message: 'please enter details'
        })
    }

    try {
        const user = await UserModel.findOne({email})

        if(!user){
            return res.status(400).json({
                message: 'user not found'
            })
        }

        const checkPassword = bcrypt.compare(password, user.password)
    
        if(!checkPassword){
            return res.status(400).json({
                message: 'password is incorrect'
            })
        }

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        )

        res.cookie("token", token)

        return res.status(201).json({
            message : "user successfully logged in"
        })

    } catch (error) {
        console.log(error)
        res.send("error")
    }
}
export async function logout(req, res) {
    res.clearCookie("token")
    return res.status(200).json({
        message: "user is logged out"
    })
}

