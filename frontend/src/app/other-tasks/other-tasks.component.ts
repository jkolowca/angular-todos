import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Task } from '../task';
import { TasksService } from '../tasks.service';
import { SummaryComponent } from '../summary/summary.component';

@Component({
  selector: 'app-other-tasks',
  templateUrl: './other-tasks.component.html',
  styleUrls: ['./other-tasks.component.sass'],
})
export class OtherTasksComponent implements OnInit {
  tasks: Task[];
  @Input() type: string;
  @Input() listId: string;
  @ViewChild(SummaryComponent) summary: SummaryComponent;

  constructor(
    private taskService: TasksService
  ) {}
  public getTasks(): void {
    this.taskService
      .getTasks(this.type, this.listId)
      .subscribe((newTasks) => (this.tasks = newTasks));
  }

  ngOnInit(): void {
    this.getTasks();
  }

  formatDate(task: Task): string {
    return new Date(task.date).toLocaleDateString('en-US');
  }

  public setTaskState(task: Task, state: string): void {
    task.task_state = state;
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
