import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-demo',
  standalone: true, 
  imports: [FormsModule], 
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent {
  name: string = '';
  count: number = 0;

  increment() {
    this.count++;
  }

  reset() {
    this.name = '';
    this.count = 0;
  }
}