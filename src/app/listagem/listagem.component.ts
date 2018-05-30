import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FotoService } from '../servicos/foto.service';

@Component({
  selector: 'listagem',
  templateUrl: './listagem.component.html',
  styles: []
})
export class ListagemComponent implements OnInit {

  listaFotos = []

  constructor(private servico: FotoService) {}
  
  ngOnInit() {

    this.servico.listar()
                .subscribe(
                  fotosApi => this.listaFotos = fotosApi
                  , erro => console.log(erro)
                )
  }

}
