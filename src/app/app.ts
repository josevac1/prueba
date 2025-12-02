import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Form } from "./fearteras/Form/Form";
import { Nar } from "./fearteras/nar/nar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Form, Nar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Prueba');
}
