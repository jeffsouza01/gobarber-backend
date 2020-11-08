import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/Users/services/UpdateUserAvatarService';

export default class UpdateAvatarController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const updateUserAvatar = container.resolve(UpdateUserAvatarService);

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });

        delete user.password;

        return user;
    }
}
