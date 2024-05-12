import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation.service';
import { Reservation } from 'src/app/models/reservation';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {

  reservationForm: FormGroup = new FormGroup({});
  id: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required],

    })

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    debugger
    if (this.id) {
      let reservation = this.reservationService.getReservationById(this.id);
      if (reservation)
        this.reservationForm.patchValue(reservation);
    }

  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      const reservationData: Reservation = this.reservationForm.value;

      if (this.id) {
        //Update
        this.reservationService.updateReservation(this.id, reservationData);
      } else {
        //New
        this.reservationService.addReservation(reservationData);
      }
      this.reservationForm.reset();
      this.router.navigate(['/reservation-list']);
    }
  }

}
