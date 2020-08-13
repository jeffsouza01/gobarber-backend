import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import appointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    private appointmentsRepository: appointmentsRepository;

    constructor(appointmentsRepository: appointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute({ provider, date }: Request): Appointment {
        const appointmentDate = startOfHour(date);

        const findAppointmentSameDate = this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentSameDate) {
            throw Error('This appointment is not avaible');
        }

        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });
    }
}

export default CreateAppointmentService;
