import { Router } from 'express';
import keys from '../config/keys.js';

const router = Router();

router.get('/', (req, res) => {
    const response = {
        success : true,
        status : 200,
        data : keys[Math.floor(Math.random() * keys.length)]
    }

    res.send(response);
});

export default router;