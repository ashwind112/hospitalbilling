class AdmitionInfo{
  AddmitedFor:string;
  AdmittedOn:Date;

  constructor(){
    this.AddmitedFor ="";
  }

}

class TreatmentInfo{
  TreatmentGiven:string;
  TreatmentGivenOn:Date;

  constructor(){
    this.TreatmentGiven ="";
  }

}


export class Patient{
    _id:number;
    FirstName:string;
    LastName:string;
    MiddleName:string;
    Address:string;
    DatesOfAdmission:Date[];
    DatesOfDischarge:Date[];
    HistoryOf:string;
    AdmitedFor:AdmitionInfo;
    Treatment:TreatmentInfo;
    PhoneNumber:string;
    IsAdmitted:boolean;
    Age:number;
    Gender:String;

    constructor(){
        this.FirstName = "";
        this.LastName = "";
        this.MiddleName = "";
        this.Address = "";
        this.DatesOfAdmission=[];
        this.DatesOfDischarge=[];
        this.HistoryOf = "";
        this.AdmitedFor = new AdmitionInfo();
        this.Treatment = new TreatmentInfo();
        this.PhoneNumber = "";
        this.IsAdmitted = false;
        this.Age = 0;
        this.Gender = "";
    }

   /* createPateint(FirstName:string,LastName:string,MiddleName:string,Address:string,
        DateOfAdmission:Date,DateOfDischarge:Date,HistoryOf:string,AdmitedFor:string,
        Treatment:string,PhoneNumber:string,IsAdmitted:boolean,Age:number,Gender:string){
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.MiddleName = MiddleName;
        this.Address = MiddleName
        this.DatesOfAdmission.push(DateOfAdmission);
        this.DatesOfDischarge.push(DateOfDischarge);
        this.HistoryOf = HistoryOf;
        this.AdmitedFor = AdmitedFor;
        this.Treatment = AdmitedFor;
        this.PhoneNumber = String(PhoneNumber);
        this.IsAdmitted = IsAdmitted;
        this.Age = Age;
        this.Gender = Gender;

    }*/

}
