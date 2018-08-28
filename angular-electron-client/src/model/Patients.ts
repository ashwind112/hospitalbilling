class AdmitionInfo {
  AddmitedFor: string;
  AdmittedOn: Date;

  constructor() {
    this.AddmitedFor = "";
  }

}

class TreatmentInfo {
  TreatmentGiven: string;
  TreatmentGivenOn: Date;

  constructor() {
    this.TreatmentGiven = "";
  }

}


export class Patient {
  _id: number;
  FirstName: string;
  LastName: string;
  MiddleName: string;
  Address: string;
  DatesOfAdmission: Date[];
  DatesOfDischarge: Date[];
  HistoryOf: string;
  AdmitedFor: AdmitionInfo[];
  Treatment: TreatmentInfo[];
  PhoneNumber: string;
  IsAdmitted: boolean;
  Age: number;
  Gender: String;

  constructor() {
    this.FirstName = "";
    this.LastName = "";
    this.MiddleName = "";
    this.Address = "";
    this.DatesOfAdmission = [];
    this.DatesOfDischarge = [];
    this.HistoryOf = "";
    this.AdmitedFor = new Array();
    this.Treatment = new Array();
    this.PhoneNumber = "";
    this.IsAdmitted = false;
    this.Age = 0;
    this.Gender = "";
  }


}
