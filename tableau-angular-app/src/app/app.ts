import { HttpClientModule } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Tableau } from './tableau/tableau';

@Component({
  selector: 'app-root',
  imports: [HttpClientModule,Tableau ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tableau-angular-app');
}
