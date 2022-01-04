import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { DataResponseModel } from '../models/dataResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl: string = 'https://localhost:44375/api/';
  constructor(private httpClient: HttpClient) { }
  
  getCarImages():Observable<DataResponseModel<CarImage>> {
    return this.httpClient.get<DataResponseModel<CarImage>>(this.apiUrl+"carimages/getall");
  }
  getImagesByCarId(carId:number):Observable<DataResponseModel<CarImage>> {
    let newPath=this.apiUrl+"carimages/getbyid?id="+carId;
    return this.httpClient.get<DataResponseModel<CarImage>>(newPath);
  }
}
