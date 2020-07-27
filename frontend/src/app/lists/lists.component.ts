import { Component, OnInit } from '@angular/core';
import { List } from '../interfaces/list';
import { ListsService } from '../services/lists.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html'
})

export class ListsComponent implements OnInit {
  date = new Date();
  lists: List[];

  constructor(private listService: ListsService) {}

  ngOnInit(): void {
    this.getLists();
  }

  getLists(): void {
    this.listService.getLists().subscribe((newLists) => {
       this.lists = newLists;
     });
    console.log('List pulls lists');
  }

  deleteList(id: string): void {
    this.listService.deleteList(id).subscribe();
    this.lists = this.lists.filter((t) => t._id !== id);
  }
}
