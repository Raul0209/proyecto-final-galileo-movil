import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  nombre: string = "";
  descripcion: string = "";
  tipoTarea: string = "";


  constructor() { }

  ngOnInit() {
  }

  guardar() {
    let tareas;

    if (localStorage.getItem("tareas")) {
      tareas = JSON.parse(localStorage.getItem("tareas") || "");
    } else {
      tareas = [];
    }

    let tarea = {
      id: uuidv4(),
      titulo: this.nombre,
      descripcion: this.descripcion,
      tipoTarea: this.tipoTarea,
      estado: "P"
    }

    tareas.push(tarea)

    localStorage.setItem("tareas", JSON.stringify(tareas))
  }

}
