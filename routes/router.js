import express from 'express';
const router = express.Router();
import { home, getLogin, getDashboard } from '../controllers/loginController.js';

router.get('/', home);

router.get("/signIn", getLogin);

router.get('/dashboard', getDashboard);






export default router;