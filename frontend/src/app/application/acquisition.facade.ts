import { Injectable } from '@angular/core';
import { AcquisitionApiService } from '../adapters/api/acquisition-api.service';
import { Acquisition } from '../domain/models/acquisition.model';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AcquisitionFacade {
  constructor(private readonly service: AcquisitionApiService) { }

  list(): Observable<Acquisition[]> {
    return this.service.list();
  }

  get(id: string): Observable<Acquisition> {
    return this.service.get(id);
  }
  create(payload: Partial<Acquisition>) { return this.service.create(payload); }
  update(id: string, payload: Partial<Acquisition>) { return this.service.update(id, payload); }
  delete(id: string) { return this.service.delete(id); }
  getHistory(id: string) { return this.service.getHistory(id); }
}
