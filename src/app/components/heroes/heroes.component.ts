import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';

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
        this.verificarRegistros();

      });
  }

  borrarHeroe(id: string, i: number) {

    let heroe: HeroeModel = this.heroes[i];

    Swal.fire({
      title: 'Borrar Heroe',
      text: `Esta seguro que desea borrar a ${heroe.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(info => {
      if (info.value) {
        this.heroeService.deleteHeroe(id)
          .subscribe(resp => {
            this.heroes.splice(i, 1);
            Swal.fire({
              title: heroe.nombre,
              text: 'Borrado',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
            })
            this.verificarRegistros();
          })
      }
    })


  }

  verificarRegistros() {
    if (this.heroes.length == 0) {
      this.registros = true;
    } else {
      this.registros = false;
    }
  }
}
