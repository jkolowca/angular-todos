import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from '../interfaces/task';
import { TasksService } from '../services/tasks.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SummaryComponent } from '../summary/summary.component';
import { AddTaskComponent } from '../add-task/add-task.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-active-tasks',
  templateUrl: './active-tasks.component.html'
})

export class ActiveTasksComponent implements OnInit {
  @ViewChild(SummaryComponent, {static: false}) summary: SummaryComponent;
  @ViewChild(AddTaskComponent) addTaskForm: AddTaskComponent;

  tasks: Task[];
  editedTask: Task;
  listId: string;

  taskEditForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(35)]),
    date: new FormControl(''),
    comment: new FormControl(''),
  });

  constructor(
    private taskService: TasksService,
    private route: ActivatedRoute
  ) {}

  public getTasks(): void {
    this.taskService.getTasks('active', this.listId).subscribe((newTasks) => {
      this.tasks = newTasks.sort((a, b) => {
        return new Date(a.date.toString()).getTime() - new Date(b.date.toString()).getTime();
      });
      if (!this.tasks.length) {
        this.addTaskForm.expand();
      }
    });
  }

  public updateTasks(): void {
     this.getTasks();
     this.summary.getSummary();
  }

  public deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe();
    this.tasks = this.tasks.filter((t) => t._id !== id);
    this.summary.getSummary();
  }

  ngOnInit(): void {
    this.listId = this.route.snapshot.paramMap.get('id');
    this.getTasks();
  }

  public editTask(task: Task): void {
    if (this.editedTask) {
      this.cancelTaskEdit();
    }
    this.editedTask = task;
    this.taskEditForm.setValue({
      name: task.name,
      date: task.date,
      comment: task.comment,
    });
  }

  public saveTaskEdit(): void {
    this.editedTask.name = this.taskEditForm.controls.name.value;
    this.editedTask.date = this.taskEditForm.controls.date.value;
    this.editedTask.comment = this.taskEditForm.controls.comment.value;
    this.taskService.editTask(this.editedTask).subscribe();
    this.editedTask = null;
  }

  public setTaskState(task: Task, state: string): void {
    task.taskState = state;
    this.taskService.editTask(task).subscribe();
    this.tasks = this.tasks.filter((t) => t !== task);
    this.summary.getSummary();
    if (this.tasks.length === 0) {
      this.addTaskForm.expand();
    }
  }

  public cancelTaskEdit(): void {
    this.editedTask = null;
  }
}
