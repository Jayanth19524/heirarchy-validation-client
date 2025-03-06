import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [CommonModule],  
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent {
  goBack(): void {
    this.location.back(); // This navigates to the previous page
  }
  data: any = null; // Ensure data is initialized to avoid undefined errors
  validatedData: any[] = []; 
  validationErrors: any[] = []; 

  constructor(private router: Router ,private location: Location) {
    const navigation = this.router.getCurrentNavigation();
    this.data = navigation?.extras.state?.['data'] || null;  

    if (this.data) {
      this.validatedData = this.data.validatedData || []; 
      this.validationErrors = this.data.validationErrors || [];
    }

    console.log('Processed Data:', this.validatedData);
    console.log('Validation Errors:', this.validationErrors);
  }
}
