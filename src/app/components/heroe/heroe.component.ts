import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from "@angular/forms";
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';
import { HeroeModel } from 'src/app/models/heroe.model';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  vivo: boolean = true;

  constructor(private fb: FormBuilder, private heroeService: HeroesService, private router: ActivatedRoute) {
  }

  form = this.fb.group({
    id: [{ value: '', disabled: true }],
    nombre: ['', Validators.required],
    poder: ['', Validators.required],
    vivo: ['true', Validators.required]
  })

  ngOnInit() {
    this.router.params
      .subscribe(data => {
        if (data['id'] != 'nuevo') {
          this.heroeService.getHeroe(data['id'])
            .subscribe((resp: HeroeModel) => {
              resp.id = data['id'];
              this.vivo = resp.vivo;
              this.form.setValue(resp);
            })
        }
      })
  }

  guardar() {

    Swal.fire({
      title: 'Espere',
      text: 'Guardado informacion',
      icon: 'info',
      allowOutsideClick: false
    })

    Swal.showLoading();

    if (this.form.controls['id'].value == '') {
      this.heroeService.crearHeroe(this.form.value)
        .subscribe(resp => {
          Swal.fire({
            title: resp.nombre,
            text: 'Guardado',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })
          this.form.setValue(resp);
        })
    } else {
      this.heroeService.actualizarHeroe(this.form.controls['id'].value, this.form.value)
        .subscribe(resp => {
          Swal.fire({
            title: this.form.controls['nombre'].value,
            text: 'Actualizado Correctamente',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })
        })
    }

  }

  estado() {
    if (this.vivo) {
      this.vivo = false
      this.form.controls['vivo'].setValue(this.vivo)
    } else {
      this.vivo = true;
      this.form.controls['vivo'].setValue(this.vivo)
    }
  }

}
