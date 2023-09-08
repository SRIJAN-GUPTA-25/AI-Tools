const ContactModel = require("../models/contactModel"); // Import your Contact model
// const errorResponse = require("../utils/errorResponse");
const errorHandler = require("../middlewares/errorMiddleware");
const userModel = require("../models/userModel");

//JWT TOKEN CREATION
exports.sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken(res);
    res.status(statusCode).json({
        success: true,
        token
    })
}

exports.loginController = async (req, res, next) => {
    console.log(req.body);
    try {
        const { email, password } = req.body;

        //validation
        if (!email || !password) {
            return next(new errorResponse("Provide Email or Password"));
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return next(new errorResponse('Invalid Email', 401))
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return next(new errorResponse("Invalid Password", 401))
        }
        this.sendToken(user, 200, res);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};

// Create a new contact entry
exports.submitContactForm = async (req, res, next) => {
    try {
        const { name, email, message } = req.body;

        // Validation (you can customize this as needed)
        if (!name || !email || !message) {
            // return next(new errorResponse("Please provide name, email, and message", 400));
            console.log("Please provide name, email, and message")
        }

        // Create a new contact entry and save it to your MongoDB database
        const contactEntry = new ContactModel({
            name,
            email,
            message,
        });

        await contactEntry.save();

        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error(error);
        // next(new errorResponse('Internal Server Error', 500));
        console.log("Internal Server Error")
    }
};






exports.registerController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const existingEmail = await userModel.findOne({ email });
        if (existingEmail) {
            return next(new errorResponse("Email is already registered", 500))
        }
        const user = await userModel.create({ username, email, password })
        this.sendToken(user, 201, res);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};


exports.logoutController = async (req, res) => {
    res.clearCookie('refreshToken');
    return res.status(200).json({
        success: true,
        message: 'Logout SuccessFully!'
    });
};