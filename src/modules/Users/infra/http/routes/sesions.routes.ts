import { Router } from 'express';
import CreateSessionService from '@modules/Users/services/CreateSessionService';

const sesionsRouter = Router();

sesionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body;

    const userAuthenticate = new CreateSessionService();

    const { user, token } = await userAuthenticate.execute({
        email,
        password,
    });

    delete user.password;

    return response.json({ user, token });
});

export default sesionsRouter;
