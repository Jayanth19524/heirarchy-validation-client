import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload',
  standalone: true,
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  imports: [CommonModule],
})
export class UploadComponent {
  selectedFile: File | null = null;
  loading: boolean = false;
  alertMessage: string = '';
  alertTitle: string = '';
  alertType: 'success' | 'error' = 'success';

  constructor(private http: HttpClient, private router: Router) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (!this.selectedFile) {
      this.showAlert('Error', 'No file selected!', 'error');
      return;
    }

    this.loading = true;
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post('https://heirarchy-validation-api.onrender.com/api/upload', formData).subscribe({
      next: (response) => {
        this.loading = false;
        this.showAlert('Success', 'File uploaded successfully!', 'success');
        setTimeout(() => this.router.navigate(['/data'], { state: { data: response } }), 1000);
      },
      error: (error) => {
        this.loading = false;
        console.error('Upload error:', error);
        this.showAlert('Error', 'File upload failed! ' + (error.message || 'Unknown error'), 'error');
      },
    });
  }

  showAlert(title: string, message: string, type: 'success' | 'error') {
    this.alertTitle = title;
    this.alertMessage = message;
    this.alertType = type;

    if (type === 'error') {
      document.querySelector('.custom-alert-box')?.classList.add('shake');
      setTimeout(() => {
        document.querySelector('.custom-alert-box')?.classList.remove('shake');
      }, 500);
    }

    setTimeout(() => this.closeAlert(), 3000); // Auto-close after 3 seconds
  }

  closeAlert() {
    this.alertMessage = '';
  }
}
