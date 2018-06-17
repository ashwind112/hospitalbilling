import { Injectable } from '@angular/core';
import {Patient} from '../model/Patients';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {forEach} from '@angular/router/src/utils/collection';

@Injectable()
export class PatientUtilityService {
  patientData: Patient[];

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>('http://localhost:4000/api/getAllPatients');
  }

  getAdmittedPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>('http://localhost:4000/api/getAdmittedPatients');
  }

  addPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>('http://localhost:4000/api/addPatient', patient, this.httpOptions);
  }

  getPatientsByName(name: string ): Observable<Patient[]> {
    return this.http.get<Patient[]>('http://localhost:4000/api/getPatient?name=' + name);
  }

  updatePatient(id: string, patientToUpdate: Patient): Observable<Patient> {
    return this.http.put<Patient>('http://localhost:4000/api/updatePatient/' + id, patientToUpdate);
  }

  getPatientById(_id: string): Observable<Patient> {
    return this.http.get<Patient>('http://localhost:4000/api/getPatient?_id' + _id);
  }
}
