import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/appointment';


@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  appointmentTitle: string = "";
  appointmentDate: Date = new Date();


  appointments: Appointment[] = [];

  ngOnInit(): void {
    let storedApp = localStorage.getItem("appointments");
    this.appointments = storedApp ? JSON.parse(storedApp) : [];
  }

  addAppointment() {
    if (this.appointmentTitle.trim().length && this.appointmentDate) {
      let newApp: Appointment = {
        id: Date.now(),
        title: this.appointmentTitle,
        date: this.appointmentDate,
      }
      this.appointments.push(newApp);
      this.appointmentTitle = "";
      this.appointmentDate = new Date();

      localStorage.setItem("appointments", JSON.stringify(this.appointments))
    }
  }
  deleteAppointment(idx: number) {
    this.appointments.splice(idx, 1);
    localStorage.setItem("appointments", JSON.stringify(this.appointments))
  }
}
