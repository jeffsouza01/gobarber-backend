import Appointment from '../models/Appointment';
import { isEqual } from 'date-fns';

class AppointmentsRepository {
    private appointment: Appointment[];

    constructor() {
        this.appointment = [];
    }

    public create(provider: string, date: Date): Appointment {
        const appointment = new Appointment(provider, date);

        this.appointment.push(appointment);

        return appointment;
    }


    public findByDate(date: Date): Appointment | null {
        const findAppointment = this.appointment.find(appointment => isEqual(date, appointment.date));

        return findAppointment || null
    };

}

export default AppointmentsRepository;
