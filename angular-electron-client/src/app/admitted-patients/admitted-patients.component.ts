import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PatientUtilityService} from '../patient-utility.service';
import {Patient} from '../../model/Patients';
import {and} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-admitted-patients',
  templateUrl: './admitted-patients.component.html',
  styleUrls: ['./admitted-patients.component.css']
})
export class AdmittedPatientsComponent implements OnInit {

  admittedPatients: Patient[];
  alert: IAlert;
  interval: any;

  constructor(private patientUtilityService: PatientUtilityService) { }

  ngOnInit() {
    this.patientUtilityService.getAdmittedPatients().subscribe((patients) => {
      this.admittedPatients = patients;
    });

    this.interval = setInterval(() => {
      this.refreshData();
    }, 3000);

  }
  dischargePatient(patient) {
    if ( patient.HistoryOf.length === 0 && patient.Treatment.length === 0 && patient.AdmitedFor.length === 0) {
      alert({id: 1, message: 'Patient does not have required information', type: 'danger'});
    }
    patient.IsAdmitted = false;
    this.patientUtilityService.updatePatient(patient._id, patient).subscribe((patientUpdated) => {
    if (patientUpdated) {
      console.log('patient discharged' + patientUpdated );
    }
    });
    console.log(patient);
  }
  refreshData() {

    this.patientUtilityService.getAdmittedPatients().subscribe((patients) => {
      this.admittedPatients = patients;
    });
  }

}
export interface IAlert {
  id: number;
  type: string;
  message: string;
}
