import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-color-selection',
  templateUrl: './color-selection.component.html',
  styleUrls: ['./color-selection.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ColorSelectionComponent implements OnInit {

  colors = [
    'primary',
    'secondary',
    'success',
    'warning',
    'danger',
    'error',
    'medium',
    'light'
  ];

  constructor() { }

  ngOnInit() { }

  segmentChanged(value) {
    console.log(value);
  }

}
