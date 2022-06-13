const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { register, getPassByUserEmail } = require("../models/authModels");
const { successResponse, errorResponse } = require("../helpers/response");

const auth = {};

auth.register = (req, res) => {
    // expect sebuah body dengan
    // property email dan pass
    const {
        body: { email, mobileNumber, pass },
    } = req;
    bcrypt
        .hash(pass, 10)
        .then((hashedPassword) => {
            // console.log(hashedPassword);
            register(email, mobileNumber, hashedPassword)
                .then(() => {
                    successResponse(res, 201, { msg: "Register Success" }, null);
                })
                .catch((error) => {
                    const { status, err } = error;
                    errorResponse(res, status, err);
                });
        })
        .catch((err) => {
            errorResponse(res, 500, err);
        });
};

// auth.updatePass = (req, res) => {
//     // expect sebuah body dengan
//     // property email dan pass
//     const {
//         body: { email, username, pass },
//     } = req;
//     bcrypt
//         .hash(pass, 10)
//         .then((hashedPassword) => {
//             // console.log(hashedPassword);
//             register(email, username, hashedPassword)
//                 .then(() => {
//                     successResponse(res, 201, { msg: "Update Password Success" }, null);
//                 })
//                 .catch((error) => {
//                     const { status, err } = error;
//                     errorResponse(res, status, err);
//                 });
//         })
//         .catch((err) => {
//             errorResponse(res, 500, err);
//         });
// };

auth.signIn = async(req, res) => {
    try {
        // mendapatkan body email dan pass
        const {
            body: { email, password },
        } = req;
        // cek kecocokan email dan pass di db
        const data = await getPassByUserEmail(email);
        const result = await bcrypt.compare(password, data.password);
        if (!result)
            return errorResponse(res, 400, { msg: "Email or Password is wrong" });
        // generate jwt
        const payload = {
            id: data.id,
            email,
        };
        const jwtOptions = {
            issuer: process.env.JWT_ISSUER,
            expiresIn: "500s", // expired in 1000s
        };
        // console.log(process.env);
        const token = jwt.sign(payload, process.env.JWT_SECRET, jwtOptions);
        // return
        successResponse(res, 200, { msg: "Login Success", email, token }, null);
    } catch (error) {
        console.log(error);
        const { status, err } = error;
        errorResponse(res, status, err);
    }
};

module.exports = auth;