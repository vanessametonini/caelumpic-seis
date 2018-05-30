import { Component, OnInit } from '@angular/core';
import { FotoComponent } from '../foto/foto.component';
import { FotoService } from '../servicos/foto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cadastro',
  templateUrl: './cadastro.component.html' ,
  styles: []
})
export class CadastroComponent implements OnInit {

  foto = new FotoComponent()

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
                    () => {
                      console.log(`${this.foto.titulo} alterada com sucesso`)
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
                      () => console.log(`${this.foto.titulo} cadastrada com sucesso`)
                      ,erro => console.log(erro)
                    )
    }
  }
}