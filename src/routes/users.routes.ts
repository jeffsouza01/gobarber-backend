import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import CreateUserService from '../services/CreateUserService';
import validAuthenticated from '../middleware/validAuthenticated';

const userRouter = Router();
const upload = multer(uploadConfig);

userRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
        name,
        email,
        password,
    });

    delete user.password;

    return response.json(user);
});

userRouter.patch(
    '/avatar',
    validAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        const updateUserAvatar = new UpdateUserAvatarService();

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });

        delete user.password;

        return user;
    },
);

export default userRouter;
