import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AcquisitionFacade } from '../../application/acquisition.facade';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Acquisition } from '../../domain/models/acquisition.model';
import { DateHelper } from '../../domain/helpers/dateHelper';

@Component({
  selector: 'app-create-acquisition',
  templateUrl: './create-acquisition.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class CreateAcquisitionComponent implements OnDestroy {
  form = this.fb.group({
    budget: [0],
    unit: ['', Validators.required],
    type: ['', Validators.required],
    quantity: [1, [Validators.required, Validators.min(1)]],
    unitValue: [0, [Validators.required, Validators.min(0)]],
    acquisitionDate: [DateHelper.toLocalDatetime(new Date()), Validators.required],
    supplier: ['', Validators.required],
    documentation: ['']
  });

  idToEdit: string | null = null;
  submitting = false;
  submitError: string | null = null;
  private subscription = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly facade: AcquisitionFacade,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idToEdit = id;
      const sub = this.facade.get(id).subscribe({
        next: (res: any) => {
          if (res?.data) {
            const a: Acquisition = res.data;
            // patch values: convertir ISO string a formato local para input
            this.form.patchValue({
              ...a,
              acquisitionDate: DateHelper.toLocalDatetime(a.acquisitionDate)
            });
          }
        },
        error: (err) => {
          console.error('Error cargando adquisición para edición', err);
          this.submitError = 'Error al cargar los datos de la adquisición';
        }
      });
      this.subscription.add(sub);
    }
  }

  submit() {
    if (this.form.invalid) return;

    this.submitting = true;
    this.submitError = null;

    // Payload con acquisitionDate como ISO string
    const payload: Partial<Acquisition> = {
      ...this.form.value,
      acquisitionDate: DateHelper.toISOString(this.form.value.acquisitionDate)
    };

    const operation$ = this.idToEdit
      ? this.facade.update(this.idToEdit, payload)
      : this.facade.create(payload);

    const sub = operation$.subscribe({
      next: () => this.router.navigate(['/list']),
      error: (err) => {
        console.error('Error al guardar', err);
        this.submitError = 'Error al guardar la adquisición. Intente nuevamente.';
        this.submitting = false;
      }
    });

    this.subscription.add(sub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
