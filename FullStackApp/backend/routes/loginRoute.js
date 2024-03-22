import express from 'express';
import { loginController } from '../controllers/auth.controller.js';
import { loginValidation } from '../middleware/login.validation.js';


const router = express.Router();

router.post('/login', loginValidation, loginController);

export { router as loginRouter };