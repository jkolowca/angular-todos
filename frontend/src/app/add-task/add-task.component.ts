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
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
  newTaskForm = new FormGroup({
    name: new FormControl(''),
    date: new FormControl(new Date()),
    comment: new FormControl(''),
  });
  listId: string;
  constructor(
    private taskService: TasksService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  addTask(): void {
    if (!this.newTaskForm.controls.name.value) {
      this.formError = true;
      return;
    } else {
      this.formError = false;
    }
    this.listId = this.route.snapshot.paramMap.get('id');
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
