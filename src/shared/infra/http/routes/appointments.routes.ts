import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../../../../modules/Appointments/repositories/AppointmentsRepository';
import CreateAppointmentService from '../../../../modules/Appointments/services/CreateAppointmentService';
import validAuthenticated from '../middleware/validAuthenticated';

const appointmentRouter = Router();

appointmentRouter.use(validAuthenticated);

appointmentRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
});

appointmentRouter.post('/', async (request, response) => {
    const { provider_id, date } = request.body;

    const parseDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
        provider_id,
        date: parseDate,
    });

    return response.json(appointment);
});

export default appointmentRouter;
