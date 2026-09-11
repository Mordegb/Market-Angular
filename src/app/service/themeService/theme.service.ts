import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const THEME_KEY = 'Theme'; // campo do local storage

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private plataformID = inject(PLATFORM_ID);
  private darkModeSig = signal<boolean>(this.getSavedThem());
  readonly isDark = this.darkModeSig.asReadonly();

  constructor() {
    this.applyClass(this.darkModeSig());
  }

  private getSavedThem() {
    if (!isPlatformBrowser(this.plataformID)) return false;
    return localStorage.getItem(THEME_KEY) === 'true';
  }

  toggleTheme() {
    const novoValor = !this.darkModeSig();
    this.darkModeSig.set(novoValor);
    this.applyClass(novoValor);
    if (isPlatformBrowser(this.plataformID)) {
      localStorage.setItem(THEME_KEY, String(novoValor));
    }
  }

  private applyClass(isDark: boolean): void {
    if (!isPlatformBrowser(this.plataformID)) return;
    document.body.classList.toggle('dark-mode', isDark);
  }
}
