import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { TasksService } from '../tasks.service';
import { Task } from '../task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.sass'],
})
export class AddTaskComponent implements OnInit {
  @Output() taskAdded: EventEmitter<Task> = new EventEmitter();
  @ViewChild(MatExpansionPanel, { static: true })
  matExpansionPanelElement: MatExpansionPanel;
  formError = false;
  newTask = {
    name: '',
    date: new Date(),
    comment: '',
  };
  constructor(private taskService: TasksService) {}

  ngOnInit(): void {}

  addTask(): void {
    if (!this.newTask.name) {
      this.formError = true;
      return;
    } else {
      this.formError = false;
    }
    this.taskService.addTask(
      this.newTask.name,
      this.newTask.date,
      this.newTask.comment
    ).subscribe(task => this.taskAdded.emit(task));
    this.clearForm();
  }

  clearForm(): void {
    this.newTask.name = '';
    this.newTask.date = null;
    this.newTask.comment = '';
    this.matExpansionPanelElement.close();
  }

  expand(): void {
    this.matExpansionPanelElement.open();
  }
}
