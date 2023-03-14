import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mascota } from '../../interfaces/mascota';

@Component({
  selector: 'app-agregar-editar-mascota',
  templateUrl: './agregar-editar-mascota.component.html',
  styleUrls: ['./agregar-editar-mascota.component.css']
})
export class AgregarEditarMascotaComponent implements OnInit {
  public loading:boolean=false;
  form:FormGroup;

  constructor(private fb:FormBuilder){
    this.form=this.fb.group({
      nombre:['',Validators.required],
      edad:['',Validators.required,],
      raza:['',Validators.required],
      color:['',Validators.required],
      peso:['',Validators.required]
    })
  }
  ngOnInit(): void {
  }
  agregar(){
    console.log('agregar mascota', {form: this.form});
    const {nombre, edad,raza,color,peso}=this.form.value;
    const mascota:Mascota={
      name:nombre,
      edad,
      color,
      peso,
      raza
    }
    console.log({mascota});
  }
}
