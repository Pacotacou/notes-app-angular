import { Component } from '@angular/core';
import { NOTES } from '../../notes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-notes-list',
  imports: [RouterModule],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.css'
})
export class NotesListComponent {
  notes = NOTES;
  show(title: string){
    alert(title);
  }
}
