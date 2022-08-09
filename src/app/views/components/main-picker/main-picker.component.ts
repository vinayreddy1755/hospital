import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertService } from '../../../shared/services';
import { Appointment, Doctor, TYPE_OF_USER, User } from '../../../_models/model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { NotLoggedComponent } from '../../../popups';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../shared/services';
import { AppRouterLinks } from '../../../app-routing.config';
import { UtilService } from 'src/app/shared/services/util.service';
import { DataService } from 'src/app/shared/services/data.service';
import { EventSettingsModel, ScheduleComponent } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-main-picker',
  templateUrl: './main-picker.component.html',
  styleUrls: ['./main-picker.component.scss'],

})
export class MainPickerComponent implements OnInit, OnDestroy, AfterViewInit {
  specialtyForm: FormGroup;
  cityForm: FormGroup;
  specialty;
  city;
  cities;
  doctors;
  specialtySubmitted = false;
  citySubmitted = false;
  stepCounter = 1;
  calendarClicked = false;
  currentUser: User;
  currentUserSubscription: Subscription;
  selectedDoctorDetails;
  users: User[] = [];
  date: string;
  hour: string;
  datePicked = false;
  hourPicked = false;
  requestSent = false;
  visitsCount;
  doctorsList;
  avHours = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
  request = {doctorId: 1, date: 'a', hour: 'b', status: 'c'};

  @ViewChild('datePicker', {static: true}) datePicker: MatDatepicker<Date>;

  @ViewChild("scheduler", {static: true}) scheduler : ScheduleComponent;
  
  @Input() events : Object[] = [];

  @Output() actionCompletedOnScheduler = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private alertService: AlertService,
    private renderer: Renderer2,
    private dialog: MatDialog,
    private userService: UserService,
    private util : UtilService,
    private ds : DataService,
    private activatedRoute : ActivatedRoute
  ) {
    this.renderer.removeClass(document.body, 'landing2');
    this.renderer.addClass(document.body, 'landing1');
    this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (this.currentUser && this.currentUser.userType === 'Doctor') {
        this.router.navigate([`${AppRouterLinks.HOME}`]);
      }
    });
  }

  specialities = []
  userType = ""

  allDoctors = []

  selectedSpeciality = {
    id: null,
    name: null
  };

  selectedDoctor : Doctor = new Doctor()

  public selectedDate: Date = new Date();
  public showWeekend: boolean = false;
  public eventSettings: EventSettingsModel = {
    dataSource: [
      {
          Id: 1,
          Subject: 'Conference',
          StartTime: new Date(2022, 8, 7, 10, 0),
          EndTime: new Date(2022, 8, 9, 11, 0),
          IsAllDay: false
      }, {
          Id: 2,
          Subject: 'Meeting - 1',
          StartTime: new Date(2022, 8, 15, 10, 0),
          EndTime: new Date(2022, 8, 16, 12, 30),
          IsAllDay: false
      }, {
          Id: 3,
          Subject: 'Paris',
          StartTime: new Date(2022, 8, 13, 12, 0),
          EndTime: new Date(2022, 8, 13, 12, 30),
          IsAllDay: false
      }, {
          Id: 4,
          Subject: 'Vacation',
          StartTime: new Date(2022, 1, 12, 10, 0),
          EndTime: new Date(2022, 1, 12, 10, 30),
          IsAllDay: false
      },
      {
          "Subject": "List",
          "Id": 7,
          "StartTime": new Date(2022, 1, 20, 3, 30),
          "EndTime": new Date(2022, 1, 20, 4, 30),
          "IsAllDay": false,
          "StartTimezone": null,
          "EndTimezone": null,
          "Description": "Repeat",
          "RecurrenceRule": "FREQ=DAILY;INTERVAL=1;COUNT=12"
      }
    ]
  };  

  ngOnInit() {
    const loggedInPatient = this.util.getLoggedInPatient();
  }

  ngAfterViewInit(): void {
    this.eventSettings = {
      dataSource: [
        {
            Id: 1,
            Subject: 'Conference',
            StartTime: new Date(2022, 8, 7, 10, 0),
            EndTime: new Date(2022, 8, 7, 11, 0),
            IsAllDay: false
        }, {
            Id: 2,
            Subject: 'Meeting - 1',
            StartTime: new Date(2022, 8, 15, 10, 0),
            EndTime: new Date(2022, 8, 16, 12, 30),
            IsAllDay: false
        }, {
            Id: 3,
            Subject: 'Paris',
            StartTime: new Date(2022, 8, 13, 12, 0),
            EndTime: new Date(2022, 8, 13, 12, 30),
            IsAllDay: false
        }, {
            Id: 4,
            Subject: 'Vacation',
            StartTime: new Date(2022, 1, 12, 10, 0),
            EndTime: new Date(2022, 1, 12, 10, 30),
            IsAllDay: false
        },
        {
            "Subject": "List",
            "Id": 7,
            "StartTime": new Date(2022, 1, 20, 3, 30),
            "EndTime": new Date(2022, 1, 20, 4, 30),
            "IsAllDay": false,
            "StartTimezone": null,
            "EndTimezone": null,
            "Description": "Repeat",
            "RecurrenceRule": "FREQ=DAILY;INTERVAL=1;COUNT=12"
        }
      ]
    }
  }

  actionOnScheduler(event){
    this.actionCompletedOnScheduler.emit(event)
  }

  filterDoctorsListBySpeciality(){
    this.allDoctors = this.util.getAllDoctorsBySpecialityId(this.selectedSpeciality.id);
    this.stepCounter = 2;
  }

  selectSpeciality(speciality){
    this.selectedSpeciality = speciality;
  }

  selectDoctor(doctor){
    this.selectedDoctor = doctor;
  }

  submitSpecialty() {
    this.stepCounter = 2;
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.date = moment((event.value.toLocaleDateString()), 'DD.MM.YYYY').format('DD.MM.YYYY');
    // console.log(this.date);
    this.datePicked = true;
    this.calendarClicked = false;
  }

  // shows specialties based on original cities
  uniqueCities() {
    if (this.doctorsList && this.doctorsList.length > 0) {
      const unique = this.doctorsList.map(s => s.specialty).filter((e, i, a) => a.indexOf(e) === i);
      return unique;
    } else {
      return ['Not Found!'];
    }
  }

  pickSpecialty(specialty) {
    this.cities = this.doctorsList.filter(e => e.specialty == specialty).map(d => d.city).filter((e, i, a) => a.indexOf(e) === i);
    this.specialty = specialty;
    // console.log(specialty);
  }


  pickCity(specialty, city) {
    this.doctors = this.doctorsList.filter(e => e.specialty == specialty && e.city == city);
    this.city = city;
    // console.log(this.doctors);
  }

  submitCity() {
    this.citySubmitted = true;
    if (this.cityForm.invalid) {
      return;
    } else {
      this.stepCounter = 3;
    }
  }

  imgPath() {
    for (let i = 0; i < this.doctors.length; i++) {
      return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
        + this.doctors[i].profilePic);
    }
  }


  get f() {
    return this.specialtyForm.controls;
  }

  get g() {
    return this.cityForm.controls;
  }

  visitsCounter() {
  this.userService.getAll().pipe(first()).subscribe(users => {
    if (users.map(e => e.visits).length > 0) {
      this.visitsCount = users.map(e => e.visits).reduce((a, b) => [...a, ...b]).length;
    } else {
      this.visitsCount = 1; }
      }
    );
  }

  calendarClick(i: number) {
    this.calendarClicked = false;
    setTimeout(() => this.calendarClicked = true, 100);
    this.datePicked = false;
  }

  pickHour(hour) {
    this.hour = hour;
    this.request.date = this.date;
    this.request.doctorId = this.selectedDoctorDetails._id;
    this.request.hour = this.hour;
    this.request.status = 'pending';
    this.hourPicked = true;
    this.requestSent = false;
  }

  sendRequest() {
    if (this.currentUser) {
      this.visitsCount++;
      // console.log(this.visitsCount);
      const foundIndex = this.doctorsList.findIndex(x => x._id === this.selectedDoctorDetails._id);
      const doctorName = this.doctorsList[foundIndex].firstName + ' ' + this.doctorsList[foundIndex].lastName;
      const patientName = this.currentUser.firstName + ' ' + this.currentUser.lastName;
      // console.log(doctor);
      this.currentUser.visits.push({
        date: this.request.date,
        id: this.visitsCount,
        doctorName,
        patientName,
        patientId: this.currentUser._id,
        hour: this.request.hour,
        status: this.request.status,
        doctorId: this.selectedDoctorDetails._id
      });
      this.selectedDoctorDetails.visits.push({
        date: this.request.date,
        id: this.visitsCount,
        patientName,
        patientId: this.currentUser._id,
        doctorName,
        hour: this.request.hour,
        status: this.request.status,
        doctorId: this.selectedDoctorDetails._id,
        read: false
      });
      this.userService.update(this.currentUser).subscribe(data => {
        localStorage.setItem('currentUser', JSON.stringify(data));
      });
      this.userService.update(this.selectedDoctorDetails).subscribe();
      this.requestSent = true;
      this.alertService.success('Request has been sent! Waiting for confirmation.', false);
    } else {
      this.dialog.open(NotLoggedComponent);
    }
  }

  getRating(doctor) {
    if (doctor.rating === undefined) {
      return 0;
    } else {
    return doctor.rating * 20;
    }
  }

  clearAlert() {
    this.alertService.clearAlert();
  }
}
