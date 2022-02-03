import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card';
import { DataResponseModel } from '../models/dataResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  apiUrl: string = 'https://localhost:44375/api/';

  constructor(private httpClient:HttpClient) { }

  add(card:Card):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cards/Add"
    return this.httpClient.post<ResponseModel>(newPath,card);
  }
  
  getByCustomerId(customerId:number):Observable<DataResponseModel<Card>>{
    let newPath = this.apiUrl +"cards/GetListByCustomerId?customerId=" + customerId;
    return this.httpClient.get<DataResponseModel<Card>>(newPath);
  }
}