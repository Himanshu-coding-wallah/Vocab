import jwt from "jsonwebtoken"

export async function checkAuth(req, res, next){
    const token = req.cookies.token
    if(!token){
        return res.status(400).json({
            message: "token not found"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message : "unauthorized"
        })
    }
}