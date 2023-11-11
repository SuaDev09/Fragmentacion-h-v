import { Injectable, NgModule } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsuariosDataService } from './usuarios-data.service';
import Car from '../interfaces/car.interface';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  private _cars = new BehaviorSubject<Car[]>([]);

  public currentCars$ = this._cars.asObservable();
  constructor(private _usuariosData: UsuariosDataService) {}

  async getCars() {
    await this._usuariosData.getCars().then((data: Car[]) => {
      this._cars.next(data);

      console.log(data);
    });
  }
}
