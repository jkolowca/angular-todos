import { Component, OnInit, Input } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
   selector: 'app-summary',
   templateUrl: './summary.component.html',
})
export class SummaryComponent {
   @Input() listId: string;
   finishedRatio: number;
   finished: number;
   active: number;

   constructor(private taskService: TasksService) {}

   getSummary(): void {
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
