import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url: string = 'https://crud-heroes-e663e.firebaseio.com'

  constructor(private http: HttpClient) { }

  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.url}/heroes.json`, heroe)
      .pipe(
        map((resp: any) => {
          heroe.id = resp.name;
          return heroe;
        })
      );
  }

  actualizarHeroe(id: string, heroe: HeroeModel) {
    return this.http.put(`${this.url}/heroes/${id}.json`, heroe);
  }

  getHeroes() {
    return this.http.get(`${this.url}/heroes.json`)
      .pipe(
        map(resp => this.crearArreglo(resp)))
  }

  private crearArreglo(hereosObj: object) {

    const heroes:HeroeModel[] = [];

    if(hereosObj === null){
      return [];
    }

    Object.keys(hereosObj).forEach(key => {
      const heroe:HeroeModel = hereosObj[key];
      heroe.id = key;

      heroes.push(heroe);
    })

    return heroes;
  }
}
