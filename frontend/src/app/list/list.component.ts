import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from '../task';
import { TasksService } from '../tasks.service';
import { FormGroup, FormControl } from '@angular/forms';
import { SummaryComponent } from '../summary/summary.component';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass'],
})
export class ListComponent implements OnInit {
  @ViewChild(SummaryComponent) summary: SummaryComponent;
  @ViewChild(AddTaskComponent) addTaskForm: AddTaskComponent;
  tasks: Task[];
  editedTask: Task;
  formError = false;
  taskEditForm = new FormGroup({
    name: new FormControl(''),
    date: new FormControl(''),
    comment: new FormControl(''),
  });
  constructor(private taskService: TasksService) {}

  public getTasks(): void {
    this.taskService.getTasks('active').subscribe((newTasks) => {
      this.tasks = newTasks;
      if (this.tasks.length === 0) { this.addTaskForm.expand(); }
    });
    console.log('List pulls tasks');
  }

  public deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe();
    this.tasks = this.tasks.filter((t) => t._id !== id);
    this.summary.getSummary();
  }

  ngOnInit(): void {
    this.getTasks();
  }

  formatDate(task: Task): string {
    return new Date(task.date).toLocaleDateString('en-US');
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
    task.task_state = state;
    this.taskService.editTask(task).subscribe();
    this.tasks = this.tasks.filter((t) => t !== task);
    this.summary.getSummary();
    if (this.tasks.length === 0 ) { this.addTaskForm.expand(); }
  }

  public cancelTaskEdit(): void {
    this.editedTask = null;
  }

  public onNewTask(task: Task): void {
    this.getTasks();
    this.summary.getSummary();
  }
}
