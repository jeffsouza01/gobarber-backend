import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/Appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/Appointments/services/CreateAppointmentService';
import validAuthenticated from '@shared/infra/http/middleware/validAuthenticated';

const appointmentRouter = Router();

appointmentRouter.use(validAuthenticated);

// appointmentRouter.get('/', async (request, response) => {
//     //const appointments = await appointmentsRepository.find();

//     return response.json(appointments);
// });

appointmentRouter.post('/', async (request, response) => {
    const { provider_id, date } = request.body;
    const appointmentRepository = new AppointmentsRepository();

    const parseDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
        appointmentRepository,
    );

    const appointment = await createAppointment.execute({
        provider_id,
        date: parseDate,
    });

    return response.json(appointment);
});

export default appointmentRouter;
