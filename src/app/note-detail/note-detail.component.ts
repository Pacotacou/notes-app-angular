import { Component, inject } from '@angular/core';
import { NOTES } from '../../notes';
import { RouterModule, ActivatedRoute , Router} from '@angular/router';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-note-detail',
  imports: [RouterModule],
  templateUrl: './note-detail.component.html',
  styleUrl: './note-detail.component.css'
})
export class NoteDetailComponent {
  activeRoute = inject(ActivatedRoute);
  router = inject(Router)
  id = Number(this.activeRoute.snapshot.paramMap.get('id'));
  note = NOTES.find((i)=> i.id === this.id);

  delete(){
    let index = -1
    if (this.note){
      index = NOTES.indexOf(this.note);
    }

    if (index !== -1){
      NOTES.splice(index, 1)
    }
     
    this.router.navigateByUrl('/');
  }
}
