import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nar.html',
  styleUrl: './nar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Nar { }
