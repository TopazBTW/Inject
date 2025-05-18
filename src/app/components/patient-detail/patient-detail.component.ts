import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {
  patient: Patient | null = null;
  errorMessage = '';

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.patientService.getPatientById(+id).subscribe({
        next: (data) => this.patient = data,
        error: (err) => this.errorMessage = err.message
      });
    }
  }
}
