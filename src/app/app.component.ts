import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { Fragment } from './interfaces/fragment.interface';
import { Condition } from './interfaces/condition.interface';
import { Usuario } from './interfaces/usuario.interface';
import { UsuariosService } from './db/usuarios.service';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosDataService } from './db/usuarios-data.service';
import { DialogModule } from 'primeng/dialog';
import Car from './interfaces/car.interface';
import { CarsService } from './db/cars.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ButtonModule,
    TableModule,
    CheckboxModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    ListboxModule,
    DialogModule,
    HttpClientModule,
  ],
  providers: [UsuariosService, UsuariosDataService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Fragmentacion-h-v';
  formGroup: FormGroup = new FormGroup({});
  users: Observable<Usuario[]>;
  cars: Observable<Car[]>;
  fragmentTypes: Fragment[] = [
    { name: 'No_control' },
    { name: 'Nombre' },
    { name: 'Domicilio' },
    { name: 'Ciudad' },
    { name: 'Edad' },
    { name: 'Oficio' },
  ];
  conditionTypes: Condition[] = [
    { name: '<' },
    { name: '>' },
    { name: '<=' },
    { name: '>=' },
    { name: '=' },
    { name: '<>' },
  ];
  fragmentType: string[] = [];
  conditionType: string[] = [];
  inputCondition: string = '';
  fragmentos: any[] = []; // Aquí debes definir la estructura de tus fragmentos

  queryBuilded = '';

  showModal: boolean = false;
  columns: any[] = [];
  columnsCars: any[] = [];

  constructor(
    private _usuariosService: UsuariosService,
    private _carsService: CarsService
  ) {}

  ngOnInit() {
    this._usuariosService.getUsers();
    this._carsService.getCars();
    this.updateData();

    this.formGroup = new FormGroup({
      conditionGroup: new FormControl(),
      fragmentGroup: new FormControl(),
    });

    this.users.subscribe((data) => {
      this.columns = [];
      for (const property in data[0]) {
        if (data[0].hasOwnProperty(property)) {
          this.columns.push({ field: property, header: property });
        }
      }
    });

    this.cars.subscribe((data) => {
      this.columnsCars = [];
      for (const property in data[0]) {
        if (data[0].hasOwnProperty(property)) {
          this.columnsCars.push({ field: property, header: property });
        }
      }
    });
  }

  resetData() {
    this._usuariosService.getUsers();
    this.updateData();
  }

  updateTable() {
    if (
      this.formGroup.value.conditionGroup != null &&
      this.formGroup.value.fragmentGroup != null &&
      this.inputCondition != ''
    ) {
      let fragmentSelected = this.formGroup.value.fragmentGroup.name;
      let conditionSelected = this.formGroup.value.conditionGroup.name;
      this.queryBuilded = `WHERE ${fragmentSelected} ${conditionSelected}`;
      this.queryBuilded +=
        typeof this.inputCondition === 'string'
          ? ` '${this.inputCondition}'`
          : ` ${this.inputCondition}}`;
      this._usuariosService.generateQuery(this.queryBuilded);
      alert(this.queryBuilded);
      this.updateData();
    } else {
      alert('Faltan datos');
    }
  }

  updateData() {
    this.users = this._usuariosService.currentUsers$;
    this.cars = this._carsService.currentCars$;
  }
}
