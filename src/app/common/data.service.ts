import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class DataService {

  private shareData= new BehaviorSubject<any>({});
  currentData = this.shareData.asObservable();

  constructor() { }
  updateData(data: any) {
    this.shareData.next(data);
  }
}