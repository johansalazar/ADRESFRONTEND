import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
     <div class="container d-flex justify-content-center align-items-center vh-100">
      <div class="card shadow-lg border-0 p-4" style="max-width: 480px; width: 100%;">
        
        <div class="text-center mb-3">
          <i class="bi bi-box-seam-fill text-primary" style="font-size: 3.5rem;"></i>
        </div>

        <h2 class="text-center fw-bold mb-3">Bienvenido a Adquisiciones</h2>
        
        <p class="text-center text-muted">
          Administre las adquisiciones de forma sencilla: crear, editar, listar y consultar historial.
        </p>

        <div class="d-grid mt-4">
          <a class="btn btn-primary btn-lg" routerLink="/list">
            <i class="bi bi-list-ul me-2"></i>
            Ir a la lista de adquisiciones
          </a>
        </div>
      </div>
    </div>
  `
})
export class WelcomeComponent {}
