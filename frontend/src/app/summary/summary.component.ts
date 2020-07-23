import { Component, OnInit, Input } from '@angular/core';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.sass'],
})
export class SummaryComponent implements OnInit {
  finishedRatio: number;
  constructor(private taskService: TasksService) {}
  finished: number;
  active: number;
  @Input() listId: string;
  ngOnInit(): void {
    this.getSummary();
  }

  public getSummary(): void {
    this.taskService
      .getTasksCount('finished', this.listId)
      .subscribe((c) => (this.finished = c));
    this.taskService.getTasksCount('active', this.listId).subscribe((c) => {
      this.active = c;
      this.calculateSummary();
    });
  }

  calculateSummary(): void {
    this.finishedRatio = Math.floor(
      (this.finished / (this.finished + this.active)) * 100
    );
  }
}
