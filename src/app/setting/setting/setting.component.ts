import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  profileIcon = 'man';

  pageTitle: string;

  ngOnInit() {
    this.getRouteInfo();
  }

  tabChanged(event) {
    this.pageTitle = event['tab'];
  }

  getRouteInfo() {

  }


}
