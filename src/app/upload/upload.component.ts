import { Component, OnInit } from '@angular/core';
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
export class UploadComponent implements OnInit {
  selectedFile: File | null = null;
  loading: boolean = false;
  alertMessage: string = '';
  alertTitle: string = '';
  alertType: 'success' | 'error' = 'success';
  fileData: any | undefined;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Fetch all uploaded files when the component is initialized
    this.getAllUploadedFiles();
  }
  onRowClick(file: any): void {
    // Handle the row click event here. You can navigate to a different page or show more details.
    console.log('Row clicked:', file._id);
    this.router.navigate(['/file-info'], { state: { data_file: file } });  // Navigate to details page
  }
  
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  getAllUploadedFiles(): void {
    this.http.get<{ data: any[] }>('https://heirarchy-validation-api.onrender.com/api/upload/all').subscribe({
      next: (response) => {
        this.fileData = response; // Store the file data in the component
        console.log(response);
        console.log(this.fileData);
      },
      error: (error) => {
        console.error('Error fetching files:', error);
      },
    });
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
        this.showAlert('Error', 'File upload failed! ' + (error.response ||  error.status), 'error');
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
