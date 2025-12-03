import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AcquisitionFacade } from '../../application/acquisition.facade';
import { Acquisition } from '../../domain/models/acquisition.model';
import { Router, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { finalize, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-list-acquisitions',
  templateUrl: './list-acquisitions.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ListAcquisitionsComponent implements OnInit {
  acquisitions: Acquisition[] = [];
  loading = false;
  error: string | undefined = undefined;

  constructor(
    private readonly facade: AcquisitionFacade,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.error = undefined;

    this.facade.list().pipe(
      catchError(err => {
        console.error('Error listando', err);
        this.error = 'Ocurrió un error al cargar los datos.';
        return of([] as Acquisition[]);
      }),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: (res: any) => {
        if (res.data) {
          this.acquisitions = res.data;
        } else {
          this.acquisitions = res;
        }
        this.cdr.detectChanges();
        console.log('Acquisitions loaded:', this.acquisitions);      
               
      },
      error: err => {
        console.error(err);
        this.error = 'Ocurrió un error al cargar los datos.';
        this.loading = false;
      }
    });
   
        this.loading = false;
  }

  confirmDelete(id: string) {
    if (!confirm('¿Eliminar esta adquisición? Esta acción puede ser reversible sólo con historial.')) return;
    this.facade.delete(id).subscribe({
      next: () => this.load(),
      error: err => { console.error(err); alert('Error al eliminar'); }
    });
  }
}
