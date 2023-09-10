import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuariosDataService {
  private _apiUrl = 'http://localhost:3101/users';
  constructor(private _http: HttpClient) {}

  async getUsers(): Promise<any> {
    return await this._http.get<Usuario[]>(this._apiUrl).toPromise();
  }

  async generateQuery(condition: string): Promise<any> {
    return await this._http
      .get<Usuario[]>(`${this._apiUrl}/${condition}`)
      .toPromise();
  }
}
