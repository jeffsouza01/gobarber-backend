import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import validAuthenticated from '@shared/infra/http/middleware/validAuthenticated';
import UsersController from '../controllers/UsersController';
import UpdateAvatarController from '../controllers/UpdateAvatarController';

const userRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const updateAvatarController = new UpdateAvatarController();

userRouter.post('/', usersController.create);

userRouter.patch(
    '/avatar',
    validAuthenticated,
    upload.single('avatar'),
    updateAvatarController.update,
);

export default userRouter;
