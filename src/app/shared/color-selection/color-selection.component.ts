import {
  Component, ChangeDetectionStrategy, Input, Output, EventEmitter
} from '@angular/core';
import { ITheme } from '../../../app/models/Theme';

@Component({
  selector: 'app-color-selection',
  templateUrl: './color-selection.component.html',
  styleUrls: ['./color-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorSelectionComponent {

  @Input()
  colors = [];

  @Input()
  selectedTheme: ITheme;

  @Output()
  colorChange: EventEmitter<number> = new EventEmitter(true);

  /**
   * Apply selected theme on change of select
   * @param themeId :id number
   */
  changeTheme(themeId: number) {
    this.colorChange.emit(themeId);
  }
}
