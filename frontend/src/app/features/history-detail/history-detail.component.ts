import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { AcquisitionFacade } from '../../application/acquisition.facade';
import { History } from '../../domain/models/history.model';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe, JsonPipe]
})
export class HistoryDetailComponent implements OnInit {

  acquisitionId: string = '';
  history: History[] = [];
  error: string | null = null;

  constructor(
    private readonly facade: AcquisitionFacade,
    private readonly route: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.acquisitionId = this.route.snapshot.paramMap.get('id') ?? '';

    if (!this.acquisitionId) {
      this.error = 'ID inválido.';
      return;
    }

    this.loadHistory(this.acquisitionId.toUpperCase());
  }

  private loadHistory(id: string): void {
  this.facade.getHistory(id).subscribe({
    next: (res: any) => {
      // Tomar el array desde res.data, o [] si no existe
      this.history = Array.isArray(res?.data) ? res.data : [];

      // Ordenar por fecha descendente
      if (this.history.length > 0) {
        this.history.sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );

        // Parsear payload usando for...of
        for (const h of this.history) {
          try {
            const parsed = JSON.parse(h.payload);
            (h as any).parsedPayload = parsed.After ?? parsed;
          } catch {
            (h as any).parsedPayload = { error: 'Invalid JSON payload' };
          }
        }
      }

      this.cdr.detectChanges();
      console.log('Historial cargado:', this.history);
    },
    error: (err) => {
      console.error('Error al cargar el historial', err);
      this.error = 'Error al cargar el historial';
      this.history = [];
    }
  });
}}