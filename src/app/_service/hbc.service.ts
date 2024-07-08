import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HbcService {

  url: string = 'https://668bdde90b61b8d23b0b7fd9.mockapi.io/participant/Participant';

  constructor(private http: HttpClient) { }

  listProjet(): Observable<any> {
    return this.http.get<any>(`${this.url}`);
  }

  createParticipant(projet: any): Observable<any> {
    return this.http.post<any>(`${this.url}`, projet);
  }

  modifierProjet(id: number,element:any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`,element);
  }
}
