import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../model/user.js'


//  ################### Register user ###################



export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body; 
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "Email already exists"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = new User({name, email, password: hashedPassword});
        const savedUser = await user.save();

        res.json(savedUser);
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log("Error in register controller", error);
    }
}


//  ################### Login user ###################



export const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;
        const ifUser = await User.findOne({email});

        if(!ifUser){
            return res.status(400).json({message: "User not found."});
        }

        const isPasswordMatched = await bcrypt.compare(password, ifUser.password);

        if(!isPasswordMatched){
            return res.status(400).json({message: "Invalid Credentials"});
        }

        const token = jwt.sign({
            name: ifUser.name,
            email: ifUser.email,
            userId: ifUser._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        }    
    );
    const user = ifUser;
    res.json({token: token, user: user});

    } catch (error) {
        res.status(500).json({message: error.message})
        console.log("Error in login controller",error);
    }
}