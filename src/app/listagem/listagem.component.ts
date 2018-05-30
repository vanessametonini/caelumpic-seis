import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FotoService } from '../servicos/foto.service';
import { FotoComponent } from '../foto/foto.component';

@Component({
  selector: 'listagem',
  templateUrl: './listagem.component.html',
  styles: []
})
export class ListagemComponent implements OnInit {

  listaFotos = []
  mensagem

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
                  () => {
                    this.listaFotos = this.listaFotos.filter( fotoLista => fotoLista != foto)
                    this.mensagem = `${foto.titulo} apagada com sucesso`

                    setTimeout(() => {
                      this.mensagem = ''
                    }, 2000);
                  }
                  ,erro => console.log(erro)
                )

  }

}
