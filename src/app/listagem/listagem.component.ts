import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FotoService } from '../servicos/foto.service';
import { FotoComponent } from '../foto/foto.component';
import { MensagemComponent } from '../mensagem/mensagem.component';

@Component({
  selector: 'listagem',
  templateUrl: './listagem.component.html',
  styles: []
})
export class ListagemComponent implements OnInit {

  listaFotos = []
  mensagem = new MensagemComponent()

  constructor(private servico: FotoService) {}
  
  ngOnInit() {

    this.servico.listar()
                .subscribe(
                  fotosApi => this.listaFotos = fotosApi
                  , erro => console.log(erro)
                )
  }

  remover(foto: FotoComponent){

    this.servico.deletar(foto)
                .subscribe(
                  mensagemServico => {
                    this.listaFotos = this.listaFotos.filter( fotoLista => fotoLista != foto)
                    this.mensagem.texto = mensagemServico.texto
                    this.mensagem.tipo = mensagemServico.tipo

                    setTimeout(() => {
                      this.mensagem = new MensagemComponent()
                    }, 2000);
                  }
                  ,erro => console.log(erro)
                )

  }

}
