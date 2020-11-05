import 'reflect-metadata';
import { Router } from 'express';

import sessionsRouter from '@modules/Users/infra/http/routes/sesions.routes';
import appointmentRouter from '@modules/Appointments/infra/http/routes/appointments.routes';
import userRouter from '@modules/Users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/appointments', appointmentRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
