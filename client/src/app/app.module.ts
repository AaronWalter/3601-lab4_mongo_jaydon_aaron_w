import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {MATERIAL_COMPATIBILITY_MODE} from '@angular/material';


import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {UserComponent} from './users/user.component';
import {UserListComponent} from './users/user-list.component';
import {UserListService} from './users/user-list.service';
import {TodoComponent} from "./todos/todo.component";
import {TodoListComponent} from "./todos/todo-list.component";
import {TodoListService} from "./todos/todo-list.service";
import {Routing} from './app.routes';
import {APP_BASE_HREF} from '@angular/common';

import {CustomModule} from './custom.module';
import {AddUserComponent} from './users/add-user.component';
import {AddTodoComponent} from "./todos/add-todo.component";
import {MdFormFieldModule} from "@angular/material";
import {MdInputModule} from "@angular/material";
import { CompatibilityModule } from '@angular/material';
import {NoConflictStyleCompatibilityMode} from '@angular/material';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    Routing,
    CustomModule,
    MdFormFieldModule,
    MdInputModule,
    CompatibilityModule,
    NoConflictStyleCompatibilityMode
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    UserListComponent,
    UserComponent,
    TodoListComponent,
    TodoComponent,
    AddUserComponent,
    AddTodoComponent
  ],
  providers: [
    UserListService,
    TodoListService,
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}
  ],
  entryComponents: [
    AddUserComponent,
    AddTodoComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
