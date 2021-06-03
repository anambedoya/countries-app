import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisService } from '../../services/pais.service';
import { switchMap, tap } from 'rxjs/operators';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {
  pais!: Country;

  // Antes de que el componente se inicialice
  // ActivatedRoute se usa para suscribirse a cualquier cambio en la URL
  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
    ){ }

  // Switchmap recibe un observable y retorna otro observable
  // El tap recibe el producto del observable
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.paisService.getPaisPorAlpha(id)),
        tap(console.log)
      )
      .subscribe(pais => {
        this.pais = pais;
      });
    
    // Se resume con Switchmap  
    // this.activatedRoute.params
    //   .subscribe( ({ id }) => {
    //     console.log(id);

    //     this.paisService.getPaisPorAlpha(id)
    //       .subscribe( pais => {
    //         console.log(pais);
    //       });
    //   })
  }

}
