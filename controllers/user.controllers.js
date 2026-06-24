import Users from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getAllUser = async (req, res) => {

    try {
        const products = await User.findAll();
        res.json(products);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const tambahuser = async (req, res) => {

    try {
        console.log(req.body);
        const { username, password } = req.body;
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Users.create({ username: username, password: hashedPassword });
        res.json(user);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const login = await Users.findAll({
            where: {
                username: username
            }
        });
        if (login.length === 0) return res.status(404).send("User");
        const user = login[0];
        // Verifikasi password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).send("Invalid credentials");
        // Generate token
        const token = jwt.sign({ id: user.id }, "your_jwt_secret_key", { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        res.json({ message: error.message });
    }
};
