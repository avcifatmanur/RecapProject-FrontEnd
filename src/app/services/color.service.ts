import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { DataResponseModel } from '../models/dataResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl: string = 'https://localhost:44375/api/';
  constructor(private httpClient: HttpClient) { }
  
  getColors():Observable<DataResponseModel<Color>> {
    return this.httpClient.get<DataResponseModel<Color>>(this.apiUrl+"colors/getall");
  }
}
