import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title = 'My Notes';
  isRed = false;
  count = 0;
  arr = ['orange', 'blue', 'green', 'yellow', 'purple'];
  change(){
    this.isRed = !this.isRed;
    this.count += 1;
  }

}
