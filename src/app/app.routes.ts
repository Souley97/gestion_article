import { Routes } from '@angular/router';
import { IndexComponent } from './articles/index/index.component';
import { ShowComponent } from './articles/show/show.component';
import { CreateComponent } from './articles/create/create.component';
import { EditComponent } from './articles/edit/edit.component';

export const routes: Routes = [
    
    { "path": '', component: IndexComponent },
    { "path": 'articles', component: IndexComponent },
    { "path": 'article/:id', component: ShowComponent },
    { path: 'edit/:id', component: EditComponent },
    { "path": 'create', component: CreateComponent },
    { "path": '', redirectTo: '/articles', pathMatch: 'full' }

];
