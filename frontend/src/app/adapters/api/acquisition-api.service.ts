import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Acquisition } from '../../domain/models/acquisition.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AcquisitionApiService {
  private readonly base = '/api/Acquisition';

  constructor(private readonly http: HttpClient) {}

  list(): Observable<Acquisition[]> {
    return this.http.get<Acquisition[]>(this.base);
  }

  get(id: string): Observable<Acquisition> {
    return this.http.get<Acquisition>(`${this.base}/${id}`);
  }

  create(body: Partial<Acquisition>): Observable<Acquisition> {
    return this.http.post<Acquisition>(this.base, body);
  }

  update(id: string, body: Partial<Acquisition>): Observable<any> {
    return this.http.put(`${this.base}/${id}`, body);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.base}/${id}`);
  }

  getHistory(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/${id}/history`);
  }
}

