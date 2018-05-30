import { Component, OnInit } from '@angular/core';
import { FotoComponent } from '../foto/foto.component';
import { FotoService } from '../servicos/foto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagemComponent } from '../mensagem/mensagem.component';

@Component({
  selector: 'cadastro',
  templateUrl: './cadastro.component.html' ,
  styles: []
})
export class CadastroComponent implements OnInit {

  foto = new FotoComponent()
  mensagem = new MensagemComponent()

  constructor(private servico: FotoService
              ,private rotaAtiva: ActivatedRoute
              ,private roteamento: Router ){}

  ngOnInit() {

    this.rotaAtiva.params.subscribe(
      parametros => {
        if (parametros.fotoId){
          this.servico.pesquisar(parametros.fotoId).subscribe(
            fotoApi => this.foto = fotoApi
          )
        }
      }
    )
  }

  salvar(){

    if(this.foto._id){
      this.servico.alterar(this.foto)
                  .subscribe(
                    mensagemServico => {
                      this.mensagem.texto = mensagemServico.texto
                      this.mensagem.tipo = mensagemServico.tipo

                      setTimeout(() => {
                        this.roteamento.navigate([''])
                      }, 3000)
                    }
                    , erro => console.log(erro)
                  )
    }
    else{
      this.servico.cadastrar(this.foto)
                    .subscribe(
                      mensagemServico => {
                        this.mensagem.texto = mensagemServico.texto
                        this.mensagem.tipo = mensagemServico.tipo
                        this.foto = new FotoComponent()
                        setTimeout(() => {
                          this.mensagem = new MensagemComponent()
                        }, 2000)
                      }
                      ,erro => console.log(erro)
                    )
    }
  }
}