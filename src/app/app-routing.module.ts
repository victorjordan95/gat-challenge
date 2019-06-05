import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalculosComponent } from './pages/calculos/calculos.component';
import { LogsComponent } from './pages/logs/logs.component';

const routes: Routes = [
  {path: '', component: LogsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
