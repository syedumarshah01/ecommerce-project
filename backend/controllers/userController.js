import userModel from "../models/userModel.js"
import validator from 'validator'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// Route function for user login
const loginUser = async (req, res) => {

    try {

        const {email, password} = req.body

        const user = await userModel.findOne({email})

        if(!user) {
            return res.json({success: false, message:"User doesn't exist"})
        }

        const isMatch = await bcryptjs.compare(password, user.password)

        if(isMatch) {
            const token = createToken(user._id)
            res.json({success: true, token})
        } else {
            res.json({success: false, message: "Invalid Credentials"})
        }

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})

    }
}

// Route function for user registration

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body

        // Checking if user already exists or not
        const exists = await userModel.findOne({email})
        if(exists) {
            return res.json({success: false, message: "User already exists"})
        }

        // Validating email format and strong password
        if(!validator.isEmail(email)) {
            return res.json({success: false, message: "Please enter a valid email"})
        }

        if(password.length < 8) {
            return res.json({success: false, message: "Please enter a strong password"})
        }

        // Hashing user password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new userModel({
            name, 
            email, 
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({success: true, token})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}


// Route function for Admin Login

const adminLogin = async (req, res) => {
    try {
        
        const { email, password } = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success: true, token})
        } else {
            res.json({success: false, message: "Invalid Credentials."})
        }        

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export {
    loginUser, registerUser, adminLogin
}