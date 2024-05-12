import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = [];

  constructor() {
    const reservationData = localStorage.getItem('reservations');
    this.reservations = reservationData ? JSON.parse(reservationData) : [];
  }

  getReservations(): Reservation[] {
    return this.reservations;
  }
  getReservationById(id: string): Reservation | undefined {
    return this.reservations.find(x => x.id === id);
  }

  addReservation(reservation: Reservation): void {
    reservation.id = Date.now().toString();
    debugger
    this.reservations.push(reservation);

    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }
  deleteReservation(id: string): void {
    let index = this.reservations.findIndex(x => x.id === id);
    this.reservations.splice(index, 1)
    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }

  updateReservation(id: string, updatedReservation: Reservation): void {
    let index = this.reservations.findIndex(x => x.id === id);
    updatedReservation.id = id;
    this.reservations[index] = updatedReservation;
    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }
}
