import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  rentals: Rental[] = [];
  rental:Rental;
  rentDate:Date;
  returnDate:Date;
  constructor(private rentalService: RentalService) {}

  ngOnInit(): void {
    this.getRentals();
    
  }
  getRentals() {
    this.rentalService.getRentals().subscribe((response) => {
      this.rentals = response.data;
    });
  }
  createNewRental(){
    let rental:Rental={
        rentalId:0,
        carName:"",
        customerName:"",
        rentDate:this.rentDate,
        returnDate:this.returnDate
      }
      this.rental=rental;
  }
}
