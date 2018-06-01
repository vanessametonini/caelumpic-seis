import { Component, OnInit } from '@angular/core';
import { FotoComponent } from '../foto/foto.component';
import { FotoService } from '../servicos/foto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagemComponent } from '../mensagem/mensagem.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'cadastro',
  templateUrl: './cadastro.component.html' ,
  styles: []
})
export class CadastroComponent implements OnInit {

  foto = new FotoComponent()
  mensagem = new MensagemComponent()
  formCadastro: FormGroup

  constructor(private servico: FotoService
              ,private rotaAtiva: ActivatedRoute
              ,private roteamento: Router
              ,private formBuilder: FormBuilder ){

      this.formCadastro = formBuilder.group({
                            titulo: ['', Validators.compose([
                              Validators.required,
                              Validators.minLength(3)
                            ])],
                            url: ['', Validators.compose([
                              Validators.required,
                              Validators.minLength(10)
                            ])],
                            descricao: ''
                          })

  }

  ngOnInit() {

    this.rotaAtiva.params.subscribe(
      parametros => {
        if (parametros.fotoId){
          this.servico.pesquisar(parametros.fotoId).subscribe(
            fotoApi => {
              this.foto = fotoApi
              this.formCadastro.get('titulo').setValue(this.foto.titulo)
              this.formCadastro.get('url').setValue(this.foto.url)
              this.formCadastro.get('descricao').setValue(this.foto.descricao)
            }
          )
        }
      }
    )

  }

  salvar(){

    this.foto.titulo = this.formCadastro.get('titulo').value
    this.foto.url = this.formCadastro.get('url').value
    this.foto.descricao = this.formCadastro.get('descricao').value

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