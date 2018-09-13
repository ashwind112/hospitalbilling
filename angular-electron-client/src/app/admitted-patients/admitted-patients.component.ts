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

  alert:IAlert;
  admittedPatients: Patient[];
  closed:boolean;
  public alerts: Array<IAlert> = [];
  interval: any;

  constructor(private patientUtilityService: PatientUtilityService) { }

  ngOnInit() {
    this.closed = true;
    this.patientUtilityService.getAdmittedPatients().subscribe((patients) => {
      this.admittedPatients = patients;
    });
    this.alerts.push({
      id:1,
      type:"success",
      message:"Patient Discharged successfully."
    },{
        id:2,
        type:"danger",
        message: "Please make sure patient information is filled completely"
    });
    this.interval = setInterval(() => {
      this.refreshData();
    }, 3000);

  }

  dischargePatient(patientToDischarge: Patient): void {


    if (patientToDischarge.HistoryOf.length === 0 || patientToDischarge.Treatment[patientToDischarge.Treatment.length - 1].TreatmentGiven.length === 0 ||
      patientToDischarge.Diagnosis[patientToDischarge.Diagnosis.length - 1].AdmittedFor.length === 0)
    {
      if(this.closed)
        this.closed = false;
      alert("Failed to update");
      this.alert=this.alerts[1];
      return;
    }
    else {
      patientToDischarge.IsAdmitted = false;
      patientToDischarge.DatesOfDischarge.push(new Date());
      this.patientUtilityService.updatePatient(patientToDischarge._id.toString(), patientToDischarge).subscribe((patientUpdated) => {
        if (patientUpdated) {
          console.log('patient discharged' + patientUpdated);
        }
      });
      console.log(patientToDischarge);
    }
  }

  public closeAlert(alert: IAlert) {
    this.closed = true;
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
