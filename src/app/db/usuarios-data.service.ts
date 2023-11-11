import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario.interface';
import Car from '../interfaces/car.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuariosDataService {
  private _apiUrl = 'http://localhost:3101/';
  constructor(private _http: HttpClient) {}

  async getUsers(): Promise<any> {
    return await this._http.get<Usuario[]>(this._apiUrl + 'users').toPromise();
  }

  async getCars(): Promise<any> {
    return await this._http.get<Car[]>(this._apiUrl + 'cars').toPromise();
  }

  async generateQuery(condition: string): Promise<any> {
    return await this._http
      .get<Usuario[]>(`${this._apiUrl}/users/${condition}`)
      .toPromise();
  }
}
