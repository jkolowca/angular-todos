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
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.sass']
})
export class AddListComponent implements OnInit {
  @Output() listAdded: EventEmitter<List> = new EventEmitter();
  @ViewChild(MatExpansionPanel, { static: true })
  matExpansionPanelElement: MatExpansionPanel;
  formError = false;
  newListForm = new FormGroup({
    name: new FormControl(''),
  });
  constructor(private listService: ListsService) {}

  ngOnInit(): void {}

  addList(): void {
    if (!this.newListForm.controls.name.value) {
      this.formError = true;
      return;
    } else {
      this.formError = false;
    }
    this.listService
      .addList(
        this.newListForm.controls.name.value
      )
      .subscribe((task) => this.listAdded.emit(task));
    this.clearForm();
  }

  clearForm(): void {
    this.newListForm.setValue({ name: ''});
    this.matExpansionPanelElement.close();
  }

  expand(): void {
    this.matExpansionPanelElement.open();
  }
}
