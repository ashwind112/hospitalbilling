import { Component, OnInit } from '@angular/core';
import {Patient} from '../../model/Patients';
import {PatientUtilityService} from '../patient-utility.service';

import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css']
})
export class ViewPatientComponent implements OnInit {
  selectedPatient: Patient;
  displayPatient: Patient = new Patient();

  constructor(private patientUtilityService: PatientUtilityService) { }

  ngOnInit() {

  }

  selectedItem(item) {
    this.displayPatient = item.item;
    console.log(this.displayPatient);
  }
  patientResultFormatter = (result: Patient) => result.FirstName + ' ' + result.MiddleName + ' ' + result.LastName;
  patientInputFormatter = (result: Patient) => result.FirstName + ' ' + result.MiddleName + ' ' + result.LastName;
  // Function to auto complete search patient by name
  search = (text$: Observable <Patient>) => {
    return text$
      .debounceTime(200)
      .distinctUntilChanged()
      .do((term) => {console.log(term); } )
      .switchMap(term => this.patientUtilityService.getPatientsByName(term.toString()).map((patients) => {
        return patients.map((patient) => term = patient);
      }));
  }

}


// term = patient.FirstName + ' ' + patient.MiddleName + ' ' + patient.LastName
