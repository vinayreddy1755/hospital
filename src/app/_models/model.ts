export class Patient {
  userType: string;
  id: any;
  name: string;
  birthday: string;
  email: string;
  createdOn: Date;
  lastUpdatedOn: Date;
  appointments: Appointment [];
}

export class Doctor {
  userType: string;
  id: any;
  name: string;
  speciality: string;
  createdOn: Date;
  lastUpdatedOn: Date;
  appointments: Appointment [];
}

export class Appointment {
  dateTime: string; 
  id: number; 
  status: boolean; 
  patientName: string;
  doctorName: string; 
  patientId: number; 
  doctorId: number; 
  symptoms: string [];
}

export const TYPE_OF_USER = {
  PATIENT: "PATIENT",
  DOCTOR: "DOCTOR"
}

export class User {
  userType: string;
  _id: any;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  visits?: {date: string, hour: string, id: number, status: string, patientName: string,
    doctorName: string, patientId: number, doctorId: number, read?: boolean,
    exam?: {weight: number, heartRate: number, bloodPressure: number, medHistory: string,
    diagnosis: string, prescription: string, advices: string} }[];
  lastLogged?: string[];
  npi?: number;
  specialty?: string;
  city?: string;
  profilePic?: string;
  rates?: any[];
  rating?: number;
}
