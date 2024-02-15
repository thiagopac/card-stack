import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularCardStack } from 'angular-card-stack';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AngularCardStack],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'card-stack-example';
}
