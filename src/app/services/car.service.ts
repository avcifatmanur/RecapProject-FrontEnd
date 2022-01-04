import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { DataResponseModel } from '../models/dataResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl: string = 'https://localhost:44375/api/';
  constructor(private httpClient: HttpClient) { }
  
  getCars():Observable<DataResponseModel<Car>> {
    return this.httpClient.get<DataResponseModel<Car>>(this.apiUrl+"cars/getcardetails");
  }
  getCarsByBrand(brandId:number):Observable<DataResponseModel<Car>> {
    let newPath=this.apiUrl+"cars/getcarsbybrandid?brandid="+brandId;
    return this.httpClient.get<DataResponseModel<Car>>(newPath);
  }
  getCarsByColor(colorId:number):Observable<DataResponseModel<Car>> {
    let newPath=this.apiUrl+"cars/getcarsbycolorid?colorid="+colorId;
    return this.httpClient.get<DataResponseModel<Car>>(newPath);
  }
 
}
