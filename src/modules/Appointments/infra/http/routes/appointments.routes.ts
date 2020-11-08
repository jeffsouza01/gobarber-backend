import { Router } from 'express';
import validAuthenticated from '@shared/infra/http/middleware/validAuthenticated';

import AppointmentsController from '../controllers/AppointmentsController';

const appointmentRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentRouter.use(validAuthenticated);

// appointmentRouter.get('/', async (request, response) => {
//     //const appointments = await appointmentsRepository.find();

//     return response.json(appointments);
// });

appointmentRouter.post('/', appointmentsController.create);

export default appointmentRouter;
