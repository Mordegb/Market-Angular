import { Component, signal } from '@angular/core';
import { RouterOutlet, NavigationEnd, Router } from '@angular/router';
import { NavBar } from './components/nav-bar/nav-bar';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Market-polo');
  mostrarNavBar: boolean = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const rotasSemNavBar = ['/login'] //;
        this.mostrarNavBar = !rotasSemNavBar.includes(event.url);
      });
  }
}
