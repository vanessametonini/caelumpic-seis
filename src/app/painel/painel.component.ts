import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'painel',
  templateUrl: './painel.component.html',
  styles: []
})
export class PainelComponent implements OnInit {

  @Input() titulo = ''

  constructor() { }

  ngOnInit() {
  }

}
