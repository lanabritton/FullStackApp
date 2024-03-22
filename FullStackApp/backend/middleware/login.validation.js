// login.validation.js

import { body, validationResult } from 'express-validator';

export const loginValidation = [
    // Validate email
    body('email').isEmail().withMessage('Invalid email'),
    // Validate password
    body('password').notEmpty().withMessage('Password is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];