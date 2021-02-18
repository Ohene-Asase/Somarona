import { Component, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { StatisticService } from '../statistic.service';
import { GoogleCharts } from 'google-charts';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userCountryStats: any;
  globalStats: any;
  countryStats: any[];
  chartData: any[] = [['Country', 'Total Cases']];
  term: string;

  constructor(private statService: StatisticService) { }

  async ngOnInit() {
    await this.fetchSummary();
    await this.fetchUserCountryStats();

    if (this.chartData.length > 5) {
      await GoogleCharts.load(this.drawGeoChart, {
        packages: ['geochart'],
        callback: this.drawGeoChart,
        mapsApiKey: environment.gapi
      });
    }
  }

  async fetchSummary() {
    const summary = await this.statService.getCoronaSummary();
    const flagData = await this.statService.getCountryFlags();
    if (flagData && summary) {
      this.countryStats = summary.Countries;
      if (this.countryStats) {
        this.appendFlags(flagData, this.countryStats);
        this.getChartData();
      }
      this.globalStats = summary.Global;
    }
  }

  async fetchUserCountryStats() {
    const locationData = await this.statService.getUserLocation();
    if (locationData && this.countryStats) {
      this.countryStats.map((stats: any) => {
        if (stats.Country === locationData.country_name) {
          this.userCountryStats = stats;
        }
      });
    }
  }

  drawGeoChart() {
    const geo_1_data = GoogleCharts.api.visualization.arrayToDataTable(this.chartData);
    const geo_1_options = { width: '100%' };
    const geo_1_chart = new GoogleCharts.api.visualization.GeoChart(document.getElementById('geo_1_chart'));
    geo_1_chart.draw(geo_1_data, geo_1_options);
  }

  getChartData() {
    if (this.countryStats) {
      this.countryStats.map((data: any) => {
        const x = [data.Country, data.TotalConfirmed];
        this.chartData.push(x);
      });
    }
  }

  private appendFlags(flagData: any[], summaryData: any[]) {
    flagData.map(x => {
      summaryData.map(y => {
        if (x.name === y.Country) {
          y.flag = x.flag;
        }
      });
    });
  }
}
