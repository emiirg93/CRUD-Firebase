import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  loading: boolean;
  registros: boolean = false;

  constructor(private heroeService: HeroesService) { }

  ngOnInit() {
    this.loading = true;
    this.heroeService.getHeroes()
      .subscribe(resp => {

        this.heroes = resp
        this.loading = false;

        if (this.heroes.length == 0) {
          this.registros = true;
        } else {
          this.registros = false;
        }
        
      });
  }

}
