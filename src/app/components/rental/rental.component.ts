import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CartItem } from 'src/app/models/cartItem';
import { CartItems } from 'src/app/models/cartItems';
import { Rental } from 'src/app/models/rental';
import { CartService } from 'src/app/services/cart.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  rentals: Rental[] = [];
  cartItems:CartItem[]=[];
  rental:Rental;
  rentDate:Date;
  returnDate:Date;
  minDate:string|null;
  price:number;
  firstDateSelected:boolean= false;


  constructor(private rentalService: RentalService,private cartService:CartService) {}

  ngOnInit(): void {
    this.getCart();
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
  getCart(){
    this.cartItems=this.cartService.list();
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
  totalAmount(car:Car):number{
    
    if (this.returnDate){
      let item:CartItem=CartItems.find(c=>c.car.carId===car.carId);
      let difference = new Date(this.returnDate).getTime() - new Date(this.rentDate).getTime();
    let amount = new Date(difference).getDate();
    this.price = amount * item.car.dailyPrice 
    console.log("Toplam ücret:"+this.price)
    return this.price
    }else{
      return 0
    }
    console.log("Toplam ücret:"+this.price)
  }
}
