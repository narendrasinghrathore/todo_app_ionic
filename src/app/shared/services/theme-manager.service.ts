import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as Color from 'color';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { ITheme } from '../../../app/models/Theme';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThemeManagerService {
  themes_: ITheme[] = [
    {
      name: 'Dark Pink',
      id: 1,
      style: {
        primary: 'rgba(0, 0, 0, 1)',
        secondary: 'rgba(244, 0, 104, 1)',
        light: 'rgba(244, 245, 248, 1)',
        medium: 'rgba(152, 154, 162, 1)',
        dark: 'rgba(229, 98, 94, 1)',
        danger: 'rgba(240, 65, 65, 1)',
        warning: 'rgba(255, 206, 0, 1)',
        success: 'rgba(16, 220, 96, 1)',
        tertiary: 'rgba(247, 77, 145, 1)'
      }
    },
    {
      name: 'Light Yellow',
      id: 2,
      style: {
        primary: 'rgba(229, 224, 89, 1)',
        secondary: 'rgba(189, 211, 88, 1)',
        light: 'rgba(255, 255, 255, 1)',
        medium: 'rgba(153, 151, 153, 1)',
        dark: 'rgba(229, 98, 94, 1)'
      }
    },
    {
      name: 'Dark Green',
      id: 4,
      style: {
        primary: 'rgba(0, 0, 0, 1)',
        secondary: 'rgba(37, 153, 9, 1)',
        light: 'rgba(244, 245, 248, 1)',
        medium: 'rgba(152, 154, 162, 1)',
        dark: 'rgba(229, 98, 94, 1)',
        danger: 'rgba(240, 65, 65, 1)',
        warning: 'rgba(255, 206, 0, 1)',
        success: 'rgba(16, 220, 96, 1)',
        tertiary: 'rgba(247, 77, 145, 1)'
      }
    },
    {
      name: 'Cream Horizon',
      id: 5,
      style: {
        primary: 'rgba(98, 131, 149, 1)',
        secondary: 'rgba(150, 137, 123, 1)',
        light: 'rgba(223, 213, 165, 1)',
        medium: 'rgba(219, 173, 106, 1)',
        dark: 'rgba(207, 153, 95, 1)'
      }
    }
  ];

  /**
   * Emit name of selected theme or selected one
   */
  currentTheme: BehaviorSubject<ITheme> = new BehaviorSubject(null);

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private storage: Storage
  ) {}

  /**
   * Will emit previously applied theme  and unsubscribe on
   * it's own.
   */
  getDefaultTheme(): void {
    from(this.storedTheme)
      .pipe(take(1))
      .subscribe((theme: ITheme) => {
        const appliedTheme = theme ? theme.style : {};
        this.setGlobalCSS(CSSTextGenerator(appliedTheme));
        this.currentTheme.next(theme);
      });
  }

  /**
   * Return array of color palettes
   */
  get themes() {
    return this.themes_;
  }

  // Override all global variables with a new theme
  setTheme(id): void {
    console.log(id);
    const theme: ITheme = this.themes.filter(a => a.id === id)[0];
    const cssText = CSSTextGenerator(theme.style);
    this.setGlobalCSS(cssText);
    this.currentTheme.next(theme);
    this.storage.set(`theme`, theme);
  }

  // Define a single CSS variable
  setVariable(name, value) {
    this.document.documentElement.style.setProperty(name, value);
  }

  private setGlobalCSS(css: string) {
    this.document.documentElement.style.cssText = css;
  }

  get storedTheme() {
    return this.storage.get('theme');
  }
}

const defaults = {
  primary: '#454545',
  secondary: '#9e9e9e',
  tertiary: '#d1d1d1',
  success: '#0ca549',
  warning: '#c69e00',
  danger: '#f58181',
  dark: '#4f535b',
  medium: '#989aa2',
  light: '#f4f5f8'
};

function CSSTextGenerator(colors) {
  colors = { ...defaults, ...colors };

  const {
    primary,
    secondary,
    tertiary,
    success,
    warning,
    danger,
    dark,
    medium,
    light
  } = colors;

  const shadeRatio = 0.1;
  const tintRatio = 0.1;

  return `
    --ion-color-base: ${light};
    --ion-color-contrast: ${dark};
    --ion-background-color: ${light};
    --ion-text-color: ${dark};
    --ion-toolbar-background-color: ${contrast(light, 0.1)};
    --ion-toolbar-text-color: ${contrast(dark, 0.1)};
    --ion-item-background-color: ${contrast(light, 0.3)};
    --ion-item-text-color: ${contrast(dark, 0.3)};
    --ion-color-primary: ${primary};
    --ion-color-primary-rgb: 69,69,69;
    --ion-color-primary-contrast: ${contrast(primary)};
    --ion-color-primary-contrast-rgb: 255,255,255;
    --ion-color-primary-shade:  ${Color(primary).darken(shadeRatio)};
    --ion-color-primary-tint:  ${Color(primary).lighten(tintRatio)};
    --ion-color-secondary: ${secondary};
    --ion-color-secondary-rgb: 158,158,158;
    --ion-color-secondary-contrast: ${contrast(secondary)};
    --ion-color-secondary-contrast-rgb:  0,0,0;
    --ion-color-secondary-shade:  ${Color(secondary).darken(shadeRatio)};
    --ion-color-secondary-tint: ${Color(secondary).lighten(tintRatio)};
    --ion-color-tertiary:  ${tertiary};
    --ion-color-tertiary-rgb: 209,209,209;
    --ion-color-tertiary-contrast: ${contrast(tertiary)};
    --ion-color-tertiary-contrast-rgb: 0,0,0;
    --ion-color-tertiary-shade: ${Color(tertiary).darken(shadeRatio)};
    --ion-color-tertiary-tint:  ${Color(tertiary).lighten(tintRatio)};
    --ion-color-success: ${success};
    --ion-color-success-rgb: 12,165,73;
    --ion-color-success-contrast: ${contrast(success)};
    --ion-color-success-contrast-rgb: 255,255,255;
    --ion-color-success-shade: ${Color(success).darken(shadeRatio)};
    --ion-color-success-tint: ${Color(success).lighten(tintRatio)};
    --ion-color-warning: ${warning};
    --ion-color-warning-rgb: 198,158,0;
    --ion-color-warning-contrast: ${contrast(warning)};
    --ion-color-warning-contrast-rgb: 0,0,0;
    --ion-color-warning-shade: ${Color(warning).darken(shadeRatio)};
    --ion-color-warning-tint: ${Color(warning).lighten(tintRatio)};
    --ion-color-danger: ${danger};
    --ion-color-danger-rgb: 245,129,129;
    --ion-color-danger-contrast: ${contrast(danger)};
    --ion-color-danger-contrast-rgb: 0,0,0;
    --ion-color-danger-shade: ${Color(danger).darken(shadeRatio)};
    --ion-color-danger-tint: ${Color(danger).lighten(tintRatio)};
    --ion-color-dark: ${dark};
    --ion-color-dark-rgb: 79,83,91;
    --ion-color-dark-contrast: ${contrast(dark)};
    --ion-color-dark-contrast-rgb: 255,255,255;
    --ion-color-dark-shade: ${Color(dark).darken(shadeRatio)};
    --ion-color-dark-tint: ${Color(dark).lighten(tintRatio)};
    --ion-color-medium: ${medium};
    --ion-color-medium-rgb: 152,154,162;
    --ion-color-medium-contrast: ${contrast(medium)};
    --ion-color-medium-contrast-rgb: 255,255,255;
    --ion-color-medium-shade: ${Color(medium).darken(shadeRatio)};
    --ion-color-medium-tint: ${Color(medium).lighten(tintRatio)};
    --ion-color-light: ${light};
    --ion-color-light-rgb: 244,244,244;
    --ion-color-light-contrast: $${contrast(light)};
    --ion-color-light-contrast-rgb: 0,0,0;
    --ion-color-light-shade: ${Color(light).darken(shadeRatio)};
    --ion-color-light-tint: ${Color(light).lighten(tintRatio)};`;
}

function contrast(color, ratio = 0.8) {
  color = Color(color);
  return color.isDark() ? color.lighten(ratio) : color.darken(ratio);
}
