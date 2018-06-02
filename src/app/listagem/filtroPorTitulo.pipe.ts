import { Pipe, PipeTransform } from "@angular/core";
import { FotoComponent } from "../foto/foto.component";

@Pipe({
    name: 'filtroPorTitulo'
})
export class FiltroPorTitulo implements PipeTransform {
    
    transform(listaFotos: FotoComponent[], termoFiltro: string): FotoComponent[] {
        return listaFotos.filter(foto => foto.titulo.toUpperCase().includes(termoFiltro.toUpperCase()))
    }

}