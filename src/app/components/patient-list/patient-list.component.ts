import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  patients: Patient[] = [];
  errorMessage: string = '';

  constructor(private patientService: PatientService, private router: Router) { }

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.patientService.getAllPatients().subscribe({
      next: (data) => this.patients = data,
      error: (err) => this.errorMessage = err.message
    });
  }

  viewPatient(id: number): void {
    this.router.navigate(['/patients', id]);
  }

  editPatient(id: number): void {
    this.router.navigate(['/patients/edit', id]);
  }

  deletePatient(id: number): void {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.patientService.deletePatient(id).subscribe({
        next: () => this.loadPatients(),
        error: (err) => this.errorMessage = err.message
      });
    }
  }
}
