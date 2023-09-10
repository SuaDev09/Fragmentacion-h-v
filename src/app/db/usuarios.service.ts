import { Injectable, NgModule } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsuariosDataService } from './usuarios-data.service';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private _users = new BehaviorSubject<Usuario[]>([]);

  public currentUsers$ = this._users.asObservable();
  constructor(private _usuariosData: UsuariosDataService) {}

  async getUsers() {
    await this._usuariosData.getUsers().then((data: Usuario[]) => {
      this._users.next(data);

      console.log(data);
    });
  }

  async generateQuery(condition: string) {
    await this._usuariosData
      .generateQuery(condition)
      .then((data: Usuario[]) => {
        this._users.next(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
