import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { DataComponent } from './data/data.component';

export const routes: Routes = [
  { path: '', component: UploadComponent },            // Upload component as the default route
  { path: 'data', component: DataComponent },

];
