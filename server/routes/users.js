const express = require("express");
const router = express.Router();
require("dotenv").config();
const short = require('short-uuid');
const UserModel = require("../models/UserModel")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const verifyJWT = require("../middleware/verifyJWT");
var Filter = require('bad-words'),
    filter = new Filter();



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
                accessToken: accessToken,
                firstName: account?.firstName,
                lastName: account?.lastName,
                fullName: account?.fullName,
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
        const { email, password, first, middle, last } = req.body;

        const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/);
        const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);

        const isValidEmail = emailRegex.test(email);
        const isValidPassword = passwordRegex.test(password);


        if (!isValidEmail || !isValidPassword) return res.status(400).json({ message: "Email or Password not valid" });


        const dup = await UserModel.findOne({ email: email });
        if (dup) {
            console.log("user already exists");
            return res.status(409).send({ message: "User with that email already exists." });
        }
        const hashedPwd = await bcrypt.hash(password, parseInt(process.env.SALT));


        const newUser = new UserModel({
            email: email,
            password: hashedPwd,
            firstName: first,
            middleName: middle,
            lastName: last,
            fullName: `${first} ${middle ? middle + " " : ""}${last}`,
            joined: new Date(),
            uuid: short.generate()
        });




        newUser.save().then(() => {

            res.status(201).json({ message: "New User Successfully Saved" });

        },
            (err) => {
                const errs = err?.errors
                const keys = Object.keys(err?.errors);
                const msg = errs[keys[0]]?.properties?.message;
                res.status(err.status || 400).json({ message: msg || err?.message });
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

        const cookies = req.cookies;

        if (!cookies?.jwt) return res.sendStatus(401);
        const refreshToken = cookies?.jwt;

        const account = await UserModel.findOne({ refreshToken }).exec();
        if (!account) return res.status(400).json({ message: "Could not verify account" });

        const tokenData = {
            uuid: account?.uuid,
            email: account?.email,
        }


        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || account.email !== decoded.email) {
                    return res.status(403).json({ message: "You do not have a valid token. Login again to recieve a new one.s" });

                }
                const accessToken = jwt.sign(
                    { ...tokenData },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "15m" }
                );
                res.status(201).json({
                    message: 'User Token Refreshed',
                    data: {
                        email: account?.email,
                        accessToken: accessToken,
                        firstName: account?.firstName,
                        lastName: account?.lastName,
                        fullName: account?.fullName,
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



router.get('/getUser', verifyJWT, async (req, res) => {
    try {
        console.log(req?.sent);
        const email = req?.email;
        if (!email) {
            console.log("Request does not have an auth header.")
            return res.send(401).json({ message: "Request does not have an email." });
        }

        const account = await UserModel.findOne({ email: email }, { _id: 0, password: 0, uuid: 0, refreshToken: 0 });
        if (!account) return res.send(400).json({ message: "Account not found with given information." });



        res.status(200).json(account);

    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});





router.get('/logout', async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(204).json({ message: "No cookies send with request." }); //No content
    const refreshToken = cookies?.jwt;



    const account = await UserModel.findOne({ refreshToken });
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    if (!account) {
        return res.sendStatus(204);
    }

    account.refreshToken = "";
    account.save().then(() => {
        res.status(204).json({ message: "User Successfully Logged Out" });
    },
        (err) => {
            console.log(err);
            res.status(err.status || 400).json({ message: err.message });
            return;

        })




});


router.post('/update', verifyJWT, async (req, res) => {
    const data = req.body;
    const email = req?.email;
    if (!email) {
        console.log("Request does not have an auth header.")
        return res.send(401).json({ message: "Request does not have an email." });
    }

    const account = await UserModel.findOne({ email: email });
    if (!account) return res.send(400).json({ message: "Account not found with given information." });

    account.firstName = data?.first;
    account.middleName = data?.middle;
    account.lastName = data?.last;
    account.fullName = `${data?.first} ${data?.middle ? data?.middle + " " : ""}${data?.last}`,


        account.save().then(() => {
            res.status(204).json({ message: "User Information Successfully Updated" });
        },
            (err) => {
                const errs = err?.errors
                const keys = Object.keys(err?.errors);
                const msg = errs[keys[0]]?.properties?.message;
                res.status(err.status || 400).json({ message: msg || err?.message });
                return;


            })




});






module.exports = router;
