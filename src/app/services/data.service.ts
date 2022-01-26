import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private searchTextSource=new BehaviorSubject<string>("");
  filterText=this.searchTextSource.asObservable();

  constructor() { }

  changeText(message:string){
    this.searchTextSource.next(message)
  }
}
