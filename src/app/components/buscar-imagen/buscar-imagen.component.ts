import { Component, OnInit } from '@angular/core';
import { ImagenService } from '../../services/imagen.service';

@Component({
  selector: 'app-buscar-imagen',
  templateUrl: './buscar-imagen.component.html',
  styleUrl: './buscar-imagen.component.css'
})
export class BuscarImagenComponent implements OnInit {
  nombreImagen: string;

  constructor(private _imagenService: ImagenService){
    this.nombreImagen = '';
  }
  ngOnInit(): void {
    
  }

  buscarImagenes(){
    if(this.nombreImagen === '') {
      this._imagenService.setError('El campo de búsqueda no puede estar vacío');
      return;
    }

    this._imagenService.enviarTerminoBusqueda(this.nombreImagen);
    
  }
}
