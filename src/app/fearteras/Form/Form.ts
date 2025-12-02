import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-form',
  imports: [],
  templateUrl: './Form.html',
  styleUrl: './Form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form { }
