import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';  // Import HttpClient
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-info',
  standalone: true,
  imports: [CommonModule],  
  templateUrl: './file-info.component.html',
  styleUrls: ['./file-info.component.css']
})
export class FileInfoComponent implements OnInit {
  data: any = null;  // To store the entire response from the API
  validatedData: any[] = []; // To store validated data
  validationErrors: any[] = []; // To store validation errors
  file: any = '';  // To store the file ID
  fileId: string = '';  // To store the _id of the file

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) { 
    const navigation = this.router.getCurrentNavigation();
    console.log(navigation);

    if (navigation?.extras.state) {
      this.file = navigation.extras.state['data_file'];  // Retrieve the file object
      console.log('File from state:', this.file);

      // Set `data` and `_id`
      this.data = {
        validatedData: this.file.data,
        validationErrors: this.file.errors
      };
      this.fileId = this.file._id;  // Assuming the file object has an `_id` property

      console.log('File ID:', this.fileId);
    }
  }

  ngOnInit(): void {
    // Additional logic if needed
  }

  goBack(): void {
    this.router.navigate(['/']);  // Go back to previous page or desired route
  }
}
