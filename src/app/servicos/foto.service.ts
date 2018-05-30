import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { FotoComponent } from "../foto/foto.component";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class FotoService{

    private url = 'http://localhost:3000/v1/fotos/'
    private cabecalho = {
        headers: new HttpHeaders({"Content-Type":"application/json"})
    }
    
    constructor(private conexaoApi: HttpClient){}    

    listar(): Observable<FotoComponent[]>{
        return this.conexaoApi.get<FotoComponent[]>(this.url)
    }

    pesquisar(id: string): Observable<FotoComponent> {
        return this.conexaoApi.get<FotoComponent>(this.url + id)
    }

    cadastrar(foto: FotoComponent): Observable<MensagensFotoService>{
        return this.conexaoApi.post(this.url, foto,this.cabecalho)
        .pipe(
            map(() => new MensagensFotoService(`${foto.titulo} cadastrada com sucesso`,'success') )
        )
    }

    deletar(foto: FotoComponent): Observable<MensagensFotoService>{
        return this.conexaoApi.delete(this.url+foto._id)
        .pipe(
            map(() => new MensagensFotoService(`${foto.titulo} excluída com sucesso`,'success') )
        )
                                
    }

    alterar(foto: FotoComponent): Observable<MensagensFotoService>{
        return this.conexaoApi.put(this.url+foto._id, foto)
        .pipe(
            map(() => new MensagensFotoService(`${foto.titulo} alterada com sucesso`,'success'))
        )
    }
}


class MensagensFotoService{

    constructor(private _texto, private _tipo){}

    get texto(){
        return this._texto
    }

    get tipo(){
        return this._tipo
    }
}