import {
   Component,
   OnInit,
   ViewChild,
   Output,
   EventEmitter,
} from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ListsService } from '../services/lists.service';
import { List } from '../interfaces/list';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
   selector: 'app-add-list',
   templateUrl: './add-list.component.html',
})
export class AddListComponent {
   @Output() listAdded: EventEmitter<List> = new EventEmitter();
   @ViewChild(MatExpansionPanel, { static: true })
   matExpansionPanelElement: MatExpansionPanel;

   newListForm = new FormGroup({
      name: new FormControl('', [
         Validators.required,
         Validators.maxLength(15),
      ]),
   });

   constructor(private listService: ListsService) {}

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
