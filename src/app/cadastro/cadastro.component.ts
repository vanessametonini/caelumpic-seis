import { Component, OnInit } from '@angular/core';
import { FotoComponent } from '../foto/foto.component';
import { FotoService } from '../servicos/foto.service';

@Component({
  selector: 'cadastro',
  templateUrl: './cadastro.component.html' ,
  styles: []
})
export class CadastroComponent implements OnInit {

  foto = new FotoComponent()

  constructor(private servico: FotoService) { }

  ngOnInit() {}

  salvar(){
    
    this.servico.cadastrar(this.foto)
                  .subscribe(
                    () => console.log(`${this.foto.titulo} cadastrada com sucesso`)
                    ,erro => console.log(erro)
                  )
    
  }

}