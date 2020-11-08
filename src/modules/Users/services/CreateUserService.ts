import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import User from '@modules/Users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

@injectable()
export default class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ name, email, password }: IRequest): Promise<User> {
        const checkUserExists = await this.usersRepository.findByEmail(email);

        if (checkUserExists) {
            throw new AppError('Email Already exists.');
        }

        const encryptPassword = await hash(password, 7);

        const user = await this.usersRepository.create({
            name,
            email,
            password: encryptPassword,
        });

        return user;
    }
}
