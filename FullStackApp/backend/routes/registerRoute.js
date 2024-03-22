import express from 'express';
import { registerController } from "../controllers/register.controller.js";
import { registerValidation } from "../middleware/register.validation.js";

const router = express.Router();

router.post('/register', registerValidation, registerController);

export { router as registerRouter };