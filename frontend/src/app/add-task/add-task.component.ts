import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TasksService } from '../services/tasks.service';
import { Task } from '../interfaces/task';

@Component({
   selector: 'app-add-task',
   templateUrl: './add-task.component.html',
})

export class AddTaskComponent {
   @Input() listId: string;
   @Output() taskAdded: EventEmitter<Task> = new EventEmitter();
   @ViewChild(MatExpansionPanel, { static: true }) matExpansionPanelElement: MatExpansionPanel;

   newTaskForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.max(35)]),
      date: new FormControl(new Date()),
      comment: new FormControl(''),
   });

   constructor(private taskService: TasksService) {}

   addTask(): void {
      this.taskService
         .addTask( this.listId, this.newTaskForm.value)
         .subscribe((task) => this.taskAdded.emit(task));
      this.clearForm();
   }

   clearForm(): void {
      this.newTaskForm.setValue({ name: '', date: new Date(), comment: '' });
      this.matExpansionPanelElement.close();
   }

   expand(): void {
      this.matExpansionPanelElement.open();
   }
}
