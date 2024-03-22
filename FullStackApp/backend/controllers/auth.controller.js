// auth.controller.js
export const loginController = (req, res) => {
    const { email, password } = req.body;
    if (email === 'example@example.com' && password === 'password') {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
};

/*import User from '../models/user.model.js';

export const loginController = async(req, res) => {
    const { email, password } = req.body;

    try {
        // find a user with the provided email
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // if email and password match -->
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}; */