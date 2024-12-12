import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.page.html',
  styleUrls: ['./paises.page.scss'],
})
export class PaisesPage implements OnInit {


  listaTareas: any = JSON.parse(localStorage.getItem("tareas") || "");

  titulo: string = ""
  filtro: string;
  constructor(private readonly activatedRoute: ActivatedRoute) {
    console.log(this.listaTareas);

    this.filtro = this.activatedRoute.snapshot.paramMap.get('filtro') || ""

    if (this.filtro == "pending") {
      this.titulo = "Pendientes";

      this.listaTareas = this.listaTareas.filter((tarea: any) => tarea.estado == "P")
    } else if (this.filtro == "complete") {
      this.listaTareas = this.listaTareas.filter((tarea: any) => tarea.estado == "C")

      this.titulo = "Completadas";
    }
  }

  ionViewWillEnter() {
  this.listaTareas = JSON.parse(localStorage.getItem("tareas") || "");
  if (this.filtro == "pending") {
    this.titulo = "Pendientes";

    this.listaTareas = this.listaTareas.filter((tarea: any) => tarea.estado == "P")
  } else if (this.filtro == "complete") {
    this.listaTareas = this.listaTareas.filter((tarea: any) => tarea.estado == "C")

    this.titulo = "Completadas";
  }
  }

  eliminar(id: string) {
    const tareasActualizadas = this.listaTareas.filter((tarea: any) => tarea.id !== id);
    localStorage.setItem("tareas", JSON.stringify(tareasActualizadas))
    if (this.filtro == "pending") {
      this.titulo = "Pendientes";
      this.listaTareas = JSON.parse(localStorage.getItem("tareas") || "")
      this.listaTareas = this.listaTareas.filter((tarea: any) => tarea.estado == "P")
    } else if (this.filtro == "complete") {
      this.listaTareas = JSON.parse(localStorage.getItem("tareas") || "")
      this.listaTareas = this.listaTareas.filter((tarea: any) => tarea.estado == "C")
      this.titulo = "Completadas";
    }
  }

  completar(id: string) {
    // Encuentra la tarea y cambia su estado
    this.listaTareas = this.listaTareas.map((tarea: any) =>
      tarea.id === id ? { ...tarea, estado: 'C' } : tarea
    );

    localStorage.setItem("tareas", JSON.stringify(this.listaTareas))
    if (this.filtro == "pending") {
      this.titulo = "Pendientes";
      this.listaTareas = JSON.parse(localStorage.getItem("tareas") || "")
      this.listaTareas = this.listaTareas.filter((tarea: any) => tarea.estado == "P")
    } else if (this.filtro == "complete") {
      this.listaTareas = JSON.parse(localStorage.getItem("tareas") || "")
      this.listaTareas = this.listaTareas.filter((tarea: any) => tarea.estado == "C")
      this.titulo = "Completadas";
    }
  }

  ngOnInit() {

  }

}
