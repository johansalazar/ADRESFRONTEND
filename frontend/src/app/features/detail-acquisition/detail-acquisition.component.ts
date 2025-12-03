import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AcquisitionFacade } from '../../application/acquisition.facade';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { Acquisition } from '../../domain/models/acquisition.model';

@Component({
  selector: 'app-detail-acquisition',
  templateUrl: './detail-acquisition.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe, CurrencyPipe]
})
export class DetailAcquisitionComponent implements OnInit {

    acquisitions: Acquisition;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly facade: AcquisitionFacade,
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.facade.get(id).subscribe({
      next: (res: any) => {
        if (res.data) {
          this.acquisitions = res.data;
          console.error('acquisition: ', this.acquisitions);
        } else {
          this.acquisitions = res;
          console.error('2acquisition: ', this.acquisitions);
        }
        this.cdr.detectChanges();
        console.log('Acquisitions loaded:', this.acquisitions);
      },
      error: err => {
        console.error('Error fetching acquisition details', err);
      }
    });
  }

  verHistorial() {
    this.router.navigate([`/history/${this.acquisitions.id}`]);
  }

  goBack() {
    this.router.navigate(['/list']);
  }
}
