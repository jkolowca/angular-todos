import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.sass'],
})
export class SummaryComponent implements OnInit {
  finishedRatio: number;
  constructor(
    private taskService: TasksService,
    private route: ActivatedRoute
  ) {}
  finished: number;
  active: number;

  ngOnInit(): void {
    this.getSummary();
  }

  public getSummary(): void {
    const listId = this.route.snapshot.paramMap.get('id');
    this.taskService
      .getTasksCount('finished', listId)
      .subscribe((c) => (this.finished = c));
    this.taskService.getTasksCount('active', listId).subscribe((c) => {
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
