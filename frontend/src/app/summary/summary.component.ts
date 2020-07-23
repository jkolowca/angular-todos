import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { Task } from '../task';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.sass'],
})
export class SummaryComponent implements OnInit {
  finishedRatio: number;

  constructor(private taskService: TasksService) {}

  ngOnInit(): void {
    this.getSummary();
  }

  public getSummary(): void {
    this.taskService.getTasks().subscribe((t) => this.calculateSummary(t));
  }

  calculateSummary(tasks: Task[]): void {
    const all = tasks.length;
    let finished = 0;
    tasks.forEach((t) => {
      if (t.task_state === 'finished') {
        finished++;
      }
    });
    this.finishedRatio = Math.floor((finished / all) * 100);
  }
}
