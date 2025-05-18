import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {
  patient: Patient = {
    nom: '',
    prenom: '',
    dateNaissance: '',
    cin: '',
    sexe: '',
    adresse: '',
    typedesoin: '',
    inp: ''
  };
  isEditMode = false;
  errorMessage = '';

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.patientService.getPatientById(+id).subscribe({
        next: (data) => this.patient = data,
        error: (err) => this.errorMessage = err.message
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.patientService.updatePatient(this.patient.id!, this.patient).subscribe({
        next: () => this.router.navigate(['/patients']),
        error: (err) => this.errorMessage = err.message
      });
    } else {
      this.patientService.createPatient(this.patient).subscribe({
        next: () => this.router.navigate(['/patients']),
        error: (err) => this.errorMessage = err.message
      });
    }
  }
}
