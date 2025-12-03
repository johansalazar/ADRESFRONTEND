import { Routes } from '@angular/router';
import { WelcomeComponent } from './features/welcome/welcome.component';
import { ListAcquisitionsComponent } from './features/list-acquisitions/list-acquisitions.component';
import { CreateAcquisitionComponent } from './features/create-acquisition/create-acquisition.component';
import { DetailAcquisitionComponent } from './features/detail-acquisition/detail-acquisition.component';
import { HistoryDetailComponent } from './features/history-detail/history-detail.component'; 

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'list', component: ListAcquisitionsComponent },
  { path: 'create', component: CreateAcquisitionComponent },

  // RUTAS INDIVIDUALES
  { path: 'detail/:id', component: DetailAcquisitionComponent },
  { path: 'history/:id', component: HistoryDetailComponent },

  { path: 'edit/:id', component: CreateAcquisitionComponent },
  { path: '**', redirectTo: '' }
];
