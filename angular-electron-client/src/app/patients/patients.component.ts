import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Patient} from '../../model/Patients';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {PatientUtilityService} from '../patient-utility.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  newPatient:Patient;
  patientsData:Patient[];

  constructor(private patientUtilityService:PatientUtilityService ) { }

  ngOnInit() {
    this.newPatient = new Patient();

    this.patientUtilityService.getPatients().subscribe((patients) => {
      this.patientsData = patients
    } );

  }

  addPatientToDB():void{
    this.newPatient.DatesOfAdmission.push(new Date());
    this.newPatient.IsAdmitted = true;
    console.log(this.newPatient);
    this.patientUtilityService.addPatient(this.newPatient).subscribe(
      res =>{
        console.log(res);
      },
      err =>{
        console.log("Error Occured");
      }
    )
  }

  provechange():void{
    alert(this.newPatient.Gender);
  }
}
