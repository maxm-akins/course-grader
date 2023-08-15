const express = require("express");
const router = express.Router();
require("dotenv").config();
const short = require('short-uuid');
const UserModel = require("../models/UserModel")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')



router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email AND password are necessary" });
        }

        console.log(password)
        const account = await UserModel.findOne({ email: email });

        if (!account) return res.status(400).json({ message: "Account not found" });

        const match = await bcrypt.compare(password, account?.password);

        if (!match) return res.status(400).json({ message: "Incorrect Password" });

        const tokenData = {
            uuid: account?.uuid,
            email: email,
        }

        const accessToken = jwt.sign(
            { ...tokenData },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
            { ...tokenData },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1hr" }
        );

        account.refreshToken = refreshToken;
        account.save().then(() => {
            console.log("New Refresh Token Saved");
        },
            (err) => {
                console.log(err);
                res.status(err.status || 400).json({ message: err.message });
                return;

            })


        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 60 * 60 * 1000,
        });

        res.status(201).json({
            message: 'User Logged In',
            data: {
                email: email,
                accessToken: accessToken
            }
        });


    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }


});



// register user
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email AND password are necessary" });
        }

        const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
        const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);

        const isValidEmail = emailRegex.test(email);
        const isValidPassword = passwordRegex.test(password);


        if (!isValidEmail || !isValidPassword) return res.status(400).json({ message: "Email or Password not valid" });


        const dup = await UserModel.findOne({ email: email });
        if (dup) {
            console.log("user already exists");
            return res.status(409).send({ message: "User with that email already exists." });
        }
        const hashedPwd = await bcrypt.hash(password, 12);

        const newUser = new UserModel({
            email: email,
            password: hashedPwd,
            joined: new Date(),
            uuid: short.generate()
        });


        newUser.save().then(() => {

            res.status(201).json({ message: "New User Successfully Saved" });

        },
            (err) => {
                console.log(err);
                res.status(err.status || 400).json({ message: err.message });
                return;

            })



    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});



router.get('/refresh', async (req, res) => {
    try {


        console.log(req.cookies);
        const cookies = req.cookies;

        if (!cookies?.jwt) return res.sendStatus(401);
        const refreshToken = cookies.jwt;

        const account = await UserModel.findOne({ refreshToken }).exec();
        if (!account) return res.status(400).json({ message: "Could not verify account" });

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || account.email !== decoded.email)
                    return res.sendStatus(403);
                const accessToken = jwt.sign(
                    { ...tokenData },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "15m" }
                );
                res.status(201).json({
                    message: 'User Token Refreshed',
                    data: {
                        email: email,
                        accessToken: accessToken
                    }
                })
            }
        );



    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});



module.exports = router;
