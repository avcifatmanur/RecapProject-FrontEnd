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
  minDate:string|null;
  firstDateSelected:boolean= false;
  constructor(private rentalService: RentalService) {}

  ngOnInit(): void {
    this.getRentals();
    this.minDate=new Date().toISOString().slice(0,10);
  }
  onChangeEvent(event: any){
    this.minDate = event.target.value
    this.firstDateSelected = true
  }
  checkReturnDate(){
    if (this.returnDate < this.rentDate) {
      this.returnDate = this.rentDate
    }
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
