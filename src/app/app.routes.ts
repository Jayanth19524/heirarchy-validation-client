import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { DataComponent } from './data/data.component';
import { FileInfoComponent } from './file-info/file-info.component';

export const routes: Routes = [
  { path: '', component: UploadComponent },            // Upload component as the default route
  { path: 'data', component: DataComponent },
  { path:"file-info",component:FileInfoComponent}

];
