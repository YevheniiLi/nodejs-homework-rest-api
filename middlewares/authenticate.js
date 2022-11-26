const jwt = require("jsonwebtoken");
const createError = require("../helpers/createError");
const { User } = require("../models/users");
const { JWT_KEY } = process.env;

const authenticate = async(req, res, next) => {
    try {
        const { authenticate = "" } = req.headers;
        const [bearer = "", token = ""] = authenticate.split(" ");
        if (bearer !== "Bearer" || !token) {
            throw createError(401);
        }
        try {
            const { id } = jwt.verify(token, JWT_KEY);
            const user = await User.findById(id);
            if (!user || !user.token || user.token !== token) {
                throw Error("Unauthorized");
            }
            req.user = user;
            next();
        } catch (error) {
            throw createError(401, error.message);
        }
    } catch (error) {
        next(error);
    }
};

module.exports = authenticate;