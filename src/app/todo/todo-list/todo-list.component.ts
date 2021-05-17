import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { Subscription } from 'rxjs';
import { Todo } from 'src/app/model/todo';
import { TodoService } from 'src/app/services/todo.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html'
})
export class TodoListComponent implements OnInit {

  todo: Todo
  todoList: Todo[] = [];
  displayName: string;

  constructor(private todoService: TodoService, private router: Router, private tokenService: TokenService, private authService: SocialAuthService) {
  }

  ngOnInit(): void {
    this.todo = new Todo();
    this.displayName = this.tokenService.getUserName()
    this.updateList()
  }

  onSubmit() {
    this.todo.done = false;
    this.todoService.save(this.todo).subscribe(response => {
      this.todo = new Todo();
      this.updateList()
    });
  }

  delete(todo: Todo) {
    this.todoService.delete(todo).subscribe(response =>
      this.updateList()
    );
  }

  onStatusUpdated(todo: Todo) {
    this.todoService.update(todo).subscribe();
  }

  updateList() {
    this.todoService.list().subscribe(response => this.todoList = response);
  }

  logout() {
    this.authService.signOut().then(data => {
      this.tokenService.logout();
      this.displayName = null;
      this.router.navigate(['/login']);
    });
  }
}
