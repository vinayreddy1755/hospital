import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewsComponents } from './components';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../_material/material.module';
import { XunkCalendarModule } from 'xunk-calendar';
import { TextFieldModule } from '@angular/cdk/text-field';
import { SharedModule } from '../shared/shared.module';
import { Ng2FileSizeModule } from "ng2-file-size";
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AgendaService, DayService, MonthAgendaService, MonthService, RecurrenceEditor, RecurrenceEditorModule, ScheduleModule, TimelineMonthService, 
  TimelineViewsService, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';
  
@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    Ng2FileSizeModule,
    ReactiveFormsModule,
    MaterialModule,
    XunkCalendarModule,
    TextFieldModule,
    SharedModule,
    ScheduleModule,
  ],
  exports: [
    ...ViewsComponents
  ],
  declarations: [
    ...ViewsComponents,
    AppointmentComponent
  ],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, 
    TimelineViewsService, TimelineMonthService]
})
export class ViewsModule { }
