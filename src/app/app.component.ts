import { Component, NgModule, OnInit } from '@angular/core';
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
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Fragmentacion-h-v';
  formGroup: FormGroup = new FormGroup({});
  usuarios: Usuario[] = [
    {
      IdUsuario: 1,
      No_control: '12345678',
      Nombre: 'Juan Perez',
      Domicilio: 'Calle 1',
      Ciudad: 'Ciudad 1',
      Edad: 20,
      Oficio: 'Estudiante',
    },
  ];
  tiposFragmento: Fragment[] = [
    { name: 'No_control' },
    { name: 'Nombre' },
    { name: 'Domicilio' },
    { name: 'Ciudad' },
    { name: 'Edad' },
    { name: 'Oficio' },
  ];
  tiposCondicion: Condition[] = [
    { name: '<' },
    { name: '>' },
    { name: '<=' },
    { name: '>=' },
    { name: '=' },
    { name: '<>' },
  ];
  tipoFragmento: string[] = [];
  tipoCondicion: string[] = [];
  tipoDato: string = '';
  fragmentos: any[] = []; // Aquí debes definir la estructura de tus fragmentos

  columns: any[] = [];

  constructor() {
    for (const property in this.usuarios[0]) {
      if (this.usuarios[0].hasOwnProperty(property)) {
        this.columns.push({ field: property, header: property });
      }
    }
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      conditionGroup: new FormControl(),
      fragmentGroup: new FormControl(),
    });
  }

  actualizarTabla() {
    // Aquí debes implementar la lógica para actualizar la tabla en función de los filtros seleccionados
    // Puedes realizar una solicitud HTTP para obtener los datos actualizados
  }
}
