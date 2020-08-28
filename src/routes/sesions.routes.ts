import { Router } from 'express';
import CreateSessionService from '../services/CreateSessionService';

const sesionsRouter = Router();

sesionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;

        const userAuthenticate = new CreateSessionService();

        const { user, token } = await userAuthenticate.execute({
            email,
            password,
        });

        delete user.password;

        return response.json({ user, token });
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default sesionsRouter;
