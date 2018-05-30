import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mensagem',
  template: `<p class="alert alert-{{tipo}}"><ng-content></ng-content></p>`,
  styles: []
})
export class MensagemComponent implements OnInit {

  @Input() tipo = 'light'
  @Input() texto = ''

  constructor() { }

  ngOnInit() {
  }

}
