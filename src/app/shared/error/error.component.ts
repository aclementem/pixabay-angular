import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from '../../services/imagen.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent implements OnInit {
  texto: string;
  mostrar: boolean;
  subscripcion: Subscription;

  constructor(private _imagenService: ImagenService) {
    this.texto = '';
    this.mostrar = false;
    this.subscripcion = this._imagenService.getError().subscribe(data => {
      this.mostrarMensaje();
      this.texto = data
    });


  }

  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }

  mostrarMensaje() {
    this.mostrar = true;
    setTimeout(() => {
      this.mostrar = false;
    }, 2000)
  }

}
