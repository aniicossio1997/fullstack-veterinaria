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
const listadoMascota: Mascota[] = [
  {id: 1, name: 'Hydrogen', peso: 1.0079, raza: 'H',edad:2, color:"blue"},
  {id: 2, name: 'Helium', peso: 4.0026, raza: 'He',edad:4, color:"blue"},
  {id: 3, name: 'Lithium', peso: 6.941, raza: 'Li',edad:2, color:"blue"},
  {id: 4, name: 'Beryllium', peso: 9.0122, raza: 'Be',edad:2, color:"blue"},
  {id: 5, name: 'Boron', peso: 10.811, raza: 'B',edad:2, color:"blanco"},
  {id: 6, name: 'Carbon', peso: 12.0107, raza: 'C',edad:2, color:"blanco"},
  {id: 7, name: 'Nitrogen', peso: 14.0067, raza: 'N',edad:1, color:"blanco"},
  {id: 8, name: 'Oxygen', peso: 15.9994, raza: 'O',edad:3, color:"blanco"},
  {id: 9, name: 'Fluorine', peso: 18.9984, raza: 'F',edad:2, color:"blue"},
  {id: 10, name: 'Neon', peso: 20.1797, raza: 'Ne',edad:2, color:"blue"},
];

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
  eliminarMascota(){
    this.loading=true;
    setTimeout(() => {
      this.loading=false;
      this._snackBar.open('la Mascota fue eliminada con exito','',{
        duration:2000,
        panelClass: ['green-snackbar']

      })
    }, 2000);


  }
  handletMascotas(){
    this._mascotaService.getMascotas().subscribe(
      mascotas=> {this.mascotas.data=mascotas}
    )
  }
}
