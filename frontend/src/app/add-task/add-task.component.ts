import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { TasksService } from '../tasks.service';
import { Task } from '../task';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.sass'],
})
export class AddTaskComponent implements OnInit {
  @Output() taskAdded: EventEmitter<Task> = new EventEmitter();
  @ViewChild(MatExpansionPanel, { static: true })
  matExpansionPanelElement: MatExpansionPanel;
  newTaskForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.max(35)]),
    date: new FormControl(new Date()),
    comment: new FormControl(''),
  });
  @Input() listId: string;
  constructor(
    private taskService: TasksService
  ) {}

  ngOnInit(): void {}

  addTask(): void {
    this.taskService
      .addTask(
        this.listId,
        this.newTaskForm.controls.name.value,
        this.newTaskForm.controls.date.value,
        this.newTaskForm.controls.comment.value
      )
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
