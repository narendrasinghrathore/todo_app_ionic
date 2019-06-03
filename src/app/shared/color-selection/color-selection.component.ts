import {
  Component, OnInit, ChangeDetectionStrategy,
  ViewEncapsulation,
  OnDestroy
} from '@angular/core';
import { ThemeManagerService } from '../services/theme-manager.service';
import { ITheme } from '../../../app/models/Theme';
import { filter, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-color-selection',
  templateUrl: './color-selection.component.html',
  styleUrls: ['./color-selection.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorSelectionComponent implements OnInit, OnDestroy {

  colors = [];

  selectedTheme: ITheme;

  subs: Subscription;

  constructor(private themeManager: ThemeManagerService) { }

  ngOnInit() {
    this.subs = this.themeManager.currentTheme.pipe(
      filter(val => !!val),
      tap(val => {
        this.selectedTheme = val;
      })
    ).subscribe();

    this.themeManager.getDefaultTheme().subscribe();
    this.colors = [...this.themeManager.themes];
  }
  /**
   * Apply selected theme on change of select
   * @param theme :id number
   */
  changeTheme(theme) {
    this.themeManager.setTheme(theme['target']['value']);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
