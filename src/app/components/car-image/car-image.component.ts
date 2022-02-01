import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { Car } from "src/app/models/car";
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from "src/app/services/car.service";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.css']
})
export class CarImageComponent implements OnInit {
  carImages:CarImage[]=[]
  cars:Car[]=[]
  currentImage:CarImage;
  currentCar:Car
  constructor(private carImageService:CarImageService,private carService:CarService,
              private toastrService:ToastrService,private cartService:CartService) { }

  ngOnInit(): void {
    
         this.getCarImage()
         this.getCars()
    
  }
  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
    return this.cars;
  }
   getCarImage(){
     this.carImageService.getCarImages().subscribe(response=>{
          this.carImages=response.data
     })
   }

   getCarImageByCarId(carId:number){
     this.carImageService.getImagesByCarId(carId).subscribe(response=>{
       this.carImages=response.data
     })
   }

   getImageSource(car:Car):string{
     let url:string="https://localhost:44375/"+car.imagePath
     return url
   }
   getButtonClass(image:CarImage){
    if (image=this.carImages[0]) {
      return "active";
    }
    else{
      return "";
    }
  }

  getCurrentImageClass(image:CarImage){
    if(this.carImages[0]==image){
      return "carousel-item active";
    } else {
      return "carousel-item ";
    }
  }
  
  setCurrentImageClass(image:CarImage){
    this.currentImage = image;
  }
  setCurrentCar(car:Car){
    this.currentCar=car;
  }

  addToCart(car:Car){
    this.toastrService.success("Sepete eklendi! ",car.carName)
    this.cartService.addToCart(car);
  }

}