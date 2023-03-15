import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mascota } from '../interfaces/mascota';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  private  url:string=environment.endpoint;
  private _uri:string='/api/Mascotas'
  constructor(private http:HttpClient) { }

  getMascotas():Observable<Mascota[]>{
    return this.http.get<Mascota[]>(`${this.url}${this._uri}`)
  }
  getMascota(id:number):Observable<Mascota>{
    return this.http.get<Mascota>(`${this.url}${this._uri}/${id}`);
  }
  deleteMascota(id:number):Observable<void>{
    return this.http.delete<void>(`${this.url}${this._uri}/${id}`);
  }
}
