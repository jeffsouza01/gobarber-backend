import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '@modules/Users/infra/typeorm/entities/User';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

export default class CreateSessionService {
    constructor(private usersRepository: IUsersRepository) {}

    public async execute({ email, password }: IRequest): Promise<Response> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorrect email/password', 401);
        }

        const passMatched = await compare(password, user.password);

        if (!passMatched) {
            throw new AppError('Incorrect email/password', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return {
            user,
            token,
        };
    }
}
