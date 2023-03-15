import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MascotaService } from 'src/app/services/mascota.service';
import { Mascota } from '../../interfaces/mascota';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-ver-mascota',
  templateUrl: './ver-mascota.component.html',
  styleUrls: ['./ver-mascota.component.css']
})
export class VerMascotaComponent implements OnInit, OnDestroy{
  private _id!:number;
  public  mascota!:Mascota;
  public mascota$!:Observable<Mascota>;
  private _routerSub!:Subscription;
  constructor(private _mascotaService:MascotaService,private _arouter:ActivatedRoute){
    //se crea solo cuando se crea el componente
    // this._id= Number(this._arouter.snapshot.paramMap.get('id'));
  }
  ngOnDestroy(): void {
    this._routerSub.unsubscribe();
  }

  ngOnInit(): void {
    //this.handleMascota(this._id);
    this._routerSub=this._arouter.params.subscribe(data=>
      {
        this._id=data['id'];
        this.mascota$=this._mascotaService.getMascota(this._id);
      })

  }

  // private handleMascota(id:number){
  //   this._mascotaService.getMascota(id).subscribe(mascota=> this.mascota=mascota)
  // }

}
