import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '@modules/Users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

interface Request {
    name: string;
    email: string;
    password: string;
}

export default class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const checkUserExists = await usersRepository.findOne({
            where: { email },
        });

        if (checkUserExists) {
            throw new AppError('Email Already exists.');
        }

        const encryptPassword = await hash(password, 7);

        const user = usersRepository.create({
            name,
            email,
            password: encryptPassword,
        });

        await usersRepository.save(user);

        return user;
    }
}
