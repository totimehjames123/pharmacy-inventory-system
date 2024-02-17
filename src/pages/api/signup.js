const bcrypt = require('bcrypt');
const config = require('./../../../config');
const usr = require('./../../../models/users');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        try {
            // Check if the user already exists
            const isUserExists = await usr.find({ username: username });

            if (isUserExists) {
                return res.status(409).json({ message: 'User already exists', status: 409 });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const addUser = await usr.create({
                username: username,
                password: hashedPassword
            });

            if (addUser) {
                return res.status(200).json({ message: 'User created successfully!', status: 200 });
            } else {
                return res.status(400).json({ message: 'Failed to create user!', status: 400 });
            }
        } catch (error) {
            console.error('Error creating user:', error);
            return res.status(500).json({ message: 'Internal server error', status: 500 });
        }
    } else {
        return res.status(405).json({ message: 'Method Not Allowed', status: 405 });
    }
};
