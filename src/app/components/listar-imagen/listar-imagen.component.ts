import { Component, OnInit } from '@angular/core';
import { ImagenService } from '../../services/imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrl: './listar-imagen.component.css'
})
export class ListarImagenComponent implements OnInit {

  termino = '';
  suscripcion: Subscription;
  listImagenes: any[] = [];
  loading: boolean = false;
  imagenesPorPagina = 16;
  paginaActual = 1;
  calcularTotalPaginas = 0;

  constructor(private _imagenService: ImagenService) {
    this.suscripcion = this._imagenService.getTerminoBusqueda().subscribe(data => {
      this.paginaActual = 1;
      this.termino = data;
      this.loading = true;
      setTimeout(() => {
        this.obtenerImagenes();
      }, 1000);
    });
  }

  ngOnInit(): void {
  }

  obtenerImagenes() {

    this._imagenService.getImagenes(this.termino, this.imagenesPorPagina, this.paginaActual).subscribe(data => {
      // console.log(data);
      if (data.hits.length === 0) {
        this._imagenService.setError('Opss... no encontramos ningun resultado para tu búsqueda');
        return;
      }

      this.loading = false;
      this.listImagenes = data.hits;
      this.calcularTotalPaginas = Math.ceil(data.totalHits / this.imagenesPorPagina);
      // console.log(this.calcularTotalPaginas);
    }, error => {
      this.loading = false;
      this._imagenService.setError('Opss... Ocurrió un error =(');
    });

  }

  paginaAnterior() {
    this.paginaActual--;
    this.loading = true;
    this.obtenerImagenes();
  }

  paginaSiguiente() {
    this.paginaActual++;
    this.loading = true;
    this.obtenerImagenes();
  }

  paginaAnteriorClass() {
    if (this.paginaActual === 1) {
      return false;
    } else {
      return true;
    }
  }

  paginaSiguienteClass() {
    if (this.paginaActual === this.calcularTotalPaginas) {
      return false;
    } else {
      return true;
    }
  }
}
