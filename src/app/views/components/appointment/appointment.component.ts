import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { Appointment } from 'src/app/_models/model';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private ds : DataService,
    private util : UtilService) { }

  userType = ""

  appointments : Appointment[] = []

  loading = true;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.userType = params.get("userType");
      if(this.userType == "PATIENT"){
        const loggedInPatient = this.util.getLoggedInPatient()
        this.ds.getAllAppointmentsByPatientId(loggedInPatient.id).subscribe(res => {
          const apiData = res.body["response"];
          this.loading = false
        })
      }
    })
  }

}
