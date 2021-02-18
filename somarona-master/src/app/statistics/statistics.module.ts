import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { StatisticService } from './statistic.service';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    SharedModule,
    FormsModule,
    AngularFireAuthGuardModule,
  ],
  providers: [StatisticService]
})
export class StatisticsModule { }
