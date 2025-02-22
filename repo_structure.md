# Code Structure

- app/
    - add-note/
        - add-note.component.css
        - add-note.component.html
        - add-note.component.spec.ts
        - add-note.component.ts
    - header/
        - header.component.css
        - header.component.html
        - header.component.spec.ts
        - header.component.ts
    - not-found/
        - not-found.component.css
        - not-found.component.html
        - not-found.component.spec.ts
        - not-found.component.ts
    - note-detail/
        - note-detail.component.css
        - note-detail.component.html
        - note-detail.component.spec.ts
        - note-detail.component.ts
    - notes-list/
        - notes-list.component.css
        - notes-list.component.html
        - notes-list.component.spec.ts
        - notes-list.component.ts
    - app.component.css
    - app.component.html
    - app.component.spec.ts
    - app.component.ts
    - app.config.server.ts
    - app.config.ts
    - app.routes.server.ts
    - app.routes.ts
- index.html
- main.server.ts
- main.ts
- notes.ts
- server.ts
- styles.css

# Code Content

Filepath: /app/add-note/add-note.component.css
```css

```

Filepath: /app/add-note/add-note.component.html
```html
<p>add-note works!</p>
<form [formGroup]="addNoteForm" (ngSubmit)="addNote()">
    <div>
        <label for="note-title">Title: 
            <input id="note-title" formControlName="title" />
        </label>
    </div>
    <div>
        <label for="note-text">Text:
            <input id="note-text" formControlName="text"/>
        </label>
    </div>
    <button type="submit">Add Note</button>
</form>

<p>title:{{ addNoteForm.value.title }} </p>
```

Filepath: /app/add-note/add-note.component.spec.ts
```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNoteComponent } from './add-note.component';

describe('AddNoteComponent', () => {
  let component: AddNoteComponent;
  let fixture: ComponentFixture<AddNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

```

Filepath: /app/add-note/add-note.component.ts
```ts
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

```

Filepath: /app/app.component.css
```css
input.ng-valid {
    border-color: green;
    background-color: lightgreen;
}

input.ng-invalid {
    border-color: red;
    background-color: lightcoral;
}

form p{
    justify-content: right;
    align-items: end;
}
```

Filepath: /app/app.component.html
```html

<app-header/>

<router-outlet />

```

Filepath: /app/app.component.spec.ts
```ts
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'NotesApp' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('NotesApp');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, NotesApp');
  });
});

```

Filepath: /app/app.component.ts
```ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddNoteComponent } from './add-note/add-note.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { HeaderComponent } from './header/header.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AddNoteComponent, NotesListComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}

```

Filepath: /app/app.config.server.ts
```ts
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRouting(serverRoutes)
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);

```

Filepath: /app/app.config.ts
```ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay())]
};

```

Filepath: /app/app.routes.server.ts
```ts
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];

```

Filepath: /app/app.routes.ts
```ts
import { Routes } from '@angular/router';
import { NotesListComponent } from './notes-list/notes-list.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';

export const routes: Routes = [
    {path: '', component: NotesListComponent},
    {path: 'new', component: AddNoteComponent},
    {path: 'note/:id', component: NoteDetailComponent},
    {path: '**', component: NotFoundComponent}
];

```

Filepath: /app/header/header.component.css
```css
.red{
    background-color: red;
}


```

Filepath: /app/header/header.component.html
```html
<h1>My Notes</h1>
```

Filepath: /app/header/header.component.spec.ts
```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

```

Filepath: /app/header/header.component.ts
```ts
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

```

Filepath: /app/not-found/not-found.component.css
```css

```

Filepath: /app/not-found/not-found.component.html
```html
<p>not-found works!</p>

```

Filepath: /app/not-found/not-found.component.spec.ts
```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

```

Filepath: /app/not-found/not-found.component.ts
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

}

```

Filepath: /app/note-detail/note-detail.component.css
```css

```

Filepath: /app/note-detail/note-detail.component.html
```html
@if (note) {
    <div id="note-container">
        <span class="note-title">{{note.title}}</span>
        <span class="note-id">{{note.id}}</span>
        <span class="note-text">{{note.text}}</span>
        <button (click)="delete()">Delete Note</button>
    </div>
}
<nav>
    <button routerLink="">Back to List</button>
</nav>
```

Filepath: /app/note-detail/note-detail.component.spec.ts
```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteDetailComponent } from './note-detail.component';

describe('NoteDetailComponent', () => {
  let component: NoteDetailComponent;
  let fixture: ComponentFixture<NoteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

```

Filepath: /app/note-detail/note-detail.component.ts
```ts
import { Component, inject } from '@angular/core';
import { NOTES } from '../../notes';
import { RouterModule, ActivatedRoute , Router} from '@angular/router';


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

```

Filepath: /app/notes-list/notes-list.component.css
```css
.red {
    color: red;
}
```

Filepath: /app/notes-list/notes-list.component.html
```html
<div class="container">
    <nav>
      <button routerLink="./new">Add New</button>
    </nav>
    <ul class="notes">
      @for (note of notes; track $index) {
      <li>
        <button [routerLink]="['/note',note.id]">
          <span class="note-title">{{ note.title }}</span>
          <span class="note-text">{{ note.text }}</span>
        </button>
      </li>
      }
    </ul>
  </div>
  
```

Filepath: /app/notes-list/notes-list.component.spec.ts
```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesListComponent } from './notes-list.component';

describe('NotesListComponent', () => {
  let component: NotesListComponent;
  let fixture: ComponentFixture<NotesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

```

Filepath: /app/notes-list/notes-list.component.ts
```ts
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

```

Filepath: /index.html
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>NotesApp</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root>
  </app-root>
</body>
</html>

```

Filepath: /main.server.ts
```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;

```

Filepath: /main.ts
```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

```

Filepath: /notes.ts
```ts
export interface Note{
    id: number;
    title: string;
    text: string;
    
}

export const NOTES: Note[] = [
    {id: 1, title: 'Note 1', text: 'This is the first note'},
    {id: 2, title: 'Note 2', text: 'This is the second note'},
    {id: 3, title: 'Note 3', text: 'This is the third note'},
];
```

Filepath: /server.ts
```ts
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);

```

Filepath: /styles.css
```css
/* You can add global styles to this file, and also import other style files */

```

