import { Component, inject } from '@angular/core';
import { ReactiveFormsModule,FormGroup, FormControl, Validators } from '@angular/forms';
import { NOTES} from '../../notes';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-note',
  imports: [ReactiveFormsModule],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.css'
})
export class AddNoteComponent {
  
  addNoteForm = new FormGroup({
    title: new FormControl('', Validators.required),
    text : new FormControl('')
  });

  router = inject(Router);

  addNote(){
    let title = this.addNoteForm.value.title ?? '';
    let text = this.addNoteForm.value.text ?? '';
    
    if (this.addNoteForm.valid){
      let ids = NOTES.map((a) => a.id);
      let maxId = 0;
      if (ids.length > 0){
        maxId = Math.max(...ids);
      }
      let newNote = {
        id : maxId + 1,
        title : title,
        text : text
      };
      NOTES.unshift(newNote);
      this.addNoteForm.reset();
      this.router.navigateByUrl('/');
  } }
}
