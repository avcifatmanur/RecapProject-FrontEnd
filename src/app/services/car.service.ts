import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { DataResponseModel } from '../models/dataResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl: string = 'https://localhost:44375/api/';
  constructor(private httpClient: HttpClient) { }
  
  getCars():Observable<DataResponseModel<Car>> {
    return this.httpClient.get<DataResponseModel<Car>>(this.apiUrl+"cars/getcardetails");
  }
  getCarDetailById(id:number):Observable<DataResponseModel<Car>> {
    let newPath=this.apiUrl+"cars/getcardetails?id="+id;
    return this.httpClient.get<DataResponseModel<Car>>(newPath);
  }
  getCarsByBrand(brandId:number):Observable<DataResponseModel<Car>> {
    let newPath=this.apiUrl+"cars/getcarsbybrandid?brandid="+brandId;
    return this.httpClient.get<DataResponseModel<Car>>(newPath);
  }
  getCarsByColor(colorId:number):Observable<DataResponseModel<Car>> {
    let newPath=this.apiUrl+"cars/getcarsbycolorid?colorid="+colorId;
    return this.httpClient.get<DataResponseModel<Car>>(newPath);
  }

  getBrandAndColor(brandId:number,colorId:number):Observable<DataResponseModel<Car>>{
        let newPath=this.apiUrl+ "cars/getcardetailsbybrandandcolor?brandId="+brandId+ "&colorId=" +colorId;
        return this.httpClient.get<DataResponseModel<Car>>(newPath);
    }


  addCar(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "cars/add",car)
  }
  updateCar(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/update"
    return this.httpClient.post<ResponseModel>(newPath,car)
  }
  deleteCar(car:Car):Observable<ResponseModel>{
   let newPath=this.apiUrl+"cars/delete"
    return this.httpClient.post<ResponseModel>(newPath,car)
  }
}
