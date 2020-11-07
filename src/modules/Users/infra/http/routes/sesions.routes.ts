import { Router } from 'express';
import CreateSessionService from '@modules/Users/services/CreateSessionService';
import UsersRepositories from '@modules/Users/infra/typeorm/repositories/UsersRepository';

const sesionsRouter = Router();

sesionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body;

    const usersRepositories = new UsersRepositories();
    const userAuthenticate = new CreateSessionService(usersRepositories);

    const { user, token } = await userAuthenticate.execute({
        email,
        password,
    });

    delete user.password;

    return response.json({ user, token });
});

export default sesionsRouter;
