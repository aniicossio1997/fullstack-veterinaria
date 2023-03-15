import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Mascota } from '../../interfaces/mascota';


import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MascotaService } from '../../services/mascota.service';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-listado-mascota',
  templateUrl: './listado-mascota.component.html',
  styleUrls: ['./listado-mascota.component.css']
})
export class ListadoMascotaComponent  implements AfterViewInit, OnInit{
  public displayedColumns: string[] = [ 'name', 'edad','peso','color','acciones'];
  public mascotas = new MatTableDataSource<Mascota>();
  public loading:boolean=false;
  constructor(private _snackBar: MatSnackBar, private _mascotaService:MascotaService){}
  ngOnInit(): void {
    this.handletMascotas()
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngAfterViewInit() {
    this.mascotas.paginator = this.paginator;
    if(this.mascotas.data.length < 1) return;
    this.paginator._intl.itemsPerPageLabel='Item por pagina';
    this.mascotas.sort = this.sort;
  }
  applyFilter(event: Event) {
    //if((event.target as HTMLInputElement).value.length < 2) return;
    const filterValue = (event.target as HTMLInputElement).value;
    this.mascotas.filter = filterValue.trim().toLowerCase();
    if (this.mascotas.paginator) {
      this.mascotas.paginator.firstPage();
    }
  }
  eliminarMascota(id:number){
    this.loading=true;
    setTimeout(() => {
      this.loading=false;

      this._mascotaService.deleteMascota(id).subscribe(()=>{
        this.mensajeExito();
        this._mascotaService.getMascotas();
      })
    }, 2000);
  }

  private mensajeExito():void{
    this._snackBar.open('la Mascota fue eliminada con exito','',{
      duration:2000,
      panelClass: ['green-snackbar']

    })
  }
  // handletMascotas(){
  //   this._mascotaService.getMascotas().subscribe(
  //     mascotas=> {this.mascotas.data=mascotas},
  //     error => alert('error al conectar la API')
  //   )
  // }
  handletMascotas(){
    this.loading=true;
    this._mascotaService.getMascotas().subscribe({
        next: (mascotas) => this.mascotas.data=mascotas,
        error: (e) => alert('error al conectar la API'),
        complete: () => console.log('complete')
    })
    setTimeout(() => {
      this.loading=false;
    }, 1000);

  }
}
