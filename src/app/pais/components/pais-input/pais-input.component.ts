// EventEmitter sirve para emitir eventos, en este caso se está usando para enviar del componente hijo el termino de búsqueda
// ingresado en el input

import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit {

  @Input() placeholder: string = '';
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  
  // Observable
  debouncer: Subject<string> = new Subject();
  
  termino: string = '';
  
  // Se dispara una única vez cuando el componente es creado y ya está inicializado
  ngOnInit() {
    this.debouncer
      .pipe(debounceTime(300))
      .subscribe( valor => {
        this.onDebounce.emit(valor);
    });
  }

  buscar(){
    this.onEnter.emit(this.termino);
  }

  teclaPresionada() {
    this.debouncer.next(this.termino);
  }

  

}
