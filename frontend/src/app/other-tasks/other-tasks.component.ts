import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Task } from '../interfaces/task';
import { TasksService } from '../services/tasks.service';
import { SummaryComponent } from '../summary/summary.component';

@Component({
  selector: 'app-other-tasks',
  templateUrl: './other-tasks.component.html'
})
export class OtherTasksComponent implements OnInit {
  @ViewChild(SummaryComponent) summary: SummaryComponent;
  @Input() type: string;
  @Input() listId: string;
  tasks: Task[];

  constructor(private taskService: TasksService) {}

  ngOnInit(): void {
     this.getTasks();
  }

  public getTasks(): void {
    this.taskService.getTasks(this.type, this.listId).subscribe(
      (newTasks) =>
        (this.tasks = newTasks.sort((a, b) => {
          return (
            new Date(b.date.toString()).getTime() -
            new Date(a.date.toString()).getTime()
          );
        }))
    );
  }

  public setTaskState(task: Task, state: string): void {
    task.taskState = state;
    this.taskService.editTask(task).subscribe();
    this.tasks = this.tasks.filter((t) => t !== task);
    this.summary.getSummary();
  }

  public deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe();
    this.tasks = this.tasks.filter((t) => t._id !== id);
    this.summary.getSummary();
  }
}
