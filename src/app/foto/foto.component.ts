import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'foto',
  template: `<img src="{{url}}" alt="{{titulo}}" class="img-fluid d-block mx-auto">`,
  styles: []
})
export class FotoComponent implements OnInit {

  @Input() url = ''
  @Input() titulo = ''
          descricao = ''
          _id = ''

  constructor() { }

  ngOnInit() {}

}
