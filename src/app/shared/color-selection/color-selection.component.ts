import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { ThemeManagerService } from '../services/theme-manager.service';

@Component({
  selector: 'app-color-selection',
  templateUrl: './color-selection.component.html',
  styleUrls: ['./color-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorSelectionComponent implements OnInit {

  colors = [];

  selectedTheme: string;

  constructor(private themeManager: ThemeManagerService) { }

  ngOnInit() {
    this.selectedTheme = this.themeManager.currentTheme;
    this.colors = this.themeManager.themes;
  }

  changeTheme(theme) {
    this.selectedTheme = this.themeManager.setTheme(theme);
  }
}
