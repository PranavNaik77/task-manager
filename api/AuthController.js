import User from "./AuthModel.js";
import bcrypt from "bcryptjs";
import createError from "./error.js";
import jwt from "jsonwebtoken";

export const register = async(req, res, next) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashpassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({...req.body, password: hashpassword});

    try{
        await newUser.save();
        res.status(200).send("User has been created")
    }
    catch(error){
        next(error);
    }
}

export const login = async(req, res, next) => {
    try{
        const user = await User.findOne({ username: req.body.username });
        if(!user) return next(createError(404, 'Username Not Found'));
    
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect) return next(createError(400, 'Password is wrong'));
    
        const token = jwt.sign({id: user._id}, process.env.JWT)
    
        const {password, ...otherDetails} = user._doc;
    
        res.cookie("access_token", token, {
            httpOnly: true,
        })
        .status(200).json({details: {...otherDetails}});
    }
    catch(error){
        next(error);
    }
}