import { Component, OnInit,ViewChild } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import{ActivatedRoute} from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {

  cars: Car[] = [];
  brands:Brand[]=[];
  colors:Color[]=[];

  brandFilter: number = 0;
  colorFilter: number = 0;

  currentCar: Car;
  constructor(private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private brandService:BrandService,
    private colorService:ColorService,
    ){}

  ngOnInit(): void {
    this.getBrands();
    this.getColors();

     this.activatedRoute.params.subscribe(params=>{
      if(params['brandId'] && params['colorId']){
        this.getBrandAndColor(params['brandId'],params['colorId']);
       
       }else if (params["colorId"]) {
         this.getCarsByColor(params["colorId"])
       }else if (params["brandId"]) {
         this.getCarsByBrand(params["brandId"])
       }
       else {
         this.getCars();
         
       }
     })
  }
  
  getCars() {
    
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }
  setCurrentCar(car: Car) {
    this.currentCar = car;
  }
  
  getCarsByBrand(brandId:number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
    });
  }
  getCarsByColor(colorId:number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
    });
  }
  getBrands(){
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  getColors(){
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  getSelectedBrand(brandId: number) {
    if (this.brandFilter == brandId) return true;
    else return false;
  }
  getSelectedColor(colorId: number) {
    if (this.colorFilter == colorId) return true;
    else return false;
  }
  getBrandAndColor(brandId:number,colorId:number){
    if (colorId==0) {
      this.getCarsByBrand(brandId);
    }else if (brandId==0) {
      this.getCarsByColor(colorId);
    }else{
      this.carService.getBrandAndColor(brandId,colorId).subscribe((response) => {
        this.cars = response.data; });
    }
      
  }
}
