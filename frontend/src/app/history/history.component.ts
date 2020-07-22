import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Task } from '../task';
import { TasksService } from '../tasks.service';
import { SummaryComponent } from '../summary/summary.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.sass'],
})
export class HistoryComponent implements OnInit {
  tasks: Task[];
  @Input() type: string;
  @ViewChild( SummaryComponent ) summary: SummaryComponent;
  constructor(private taskService: TasksService) {}
  public getTasks(): void {
    this.taskService
      .getTasks(this.type)
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
    this.tasks = this.tasks.filter(t => t !== task);
    this.summary.getSummary();
  }
}
