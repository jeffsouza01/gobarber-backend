import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSessionService from '@modules/Users/services/CreateSessionService';

export default class SessionsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password } = request.body;

        const userAuthenticate = container.resolve(CreateSessionService);

        const { user, token } = await userAuthenticate.execute({
            email,
            password,
        });

        delete user.password;

        return response.json({ user, token });
    }
}
