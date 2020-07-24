import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ListsService } from '../lists.service';
import { List } from '../list';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.sass'],
})
export class AddListComponent implements OnInit {
  @Output() listAdded: EventEmitter<List> = new EventEmitter();
  @ViewChild(MatExpansionPanel, { static: true })
  matExpansionPanelElement: MatExpansionPanel;
  newListForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(15)]),
  });
  constructor(private listService: ListsService) {}

  ngOnInit(): void {}

  addList(): void {
    console.log('list added');
    this.listService
      .addList(this.newListForm.controls.name.value)
      .subscribe((task) => this.listAdded.emit(task));
    this.clearForm();
  }

  clearForm(): void {
    this.matExpansionPanelElement.close();
  }

  expand(): void {
    this.matExpansionPanelElement.open();
  }
}
