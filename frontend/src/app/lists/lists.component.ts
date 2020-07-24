import { Component, OnInit } from '@angular/core';
import { List } from '../list';
import { ListsService } from '../lists.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.sass'],
})
export class ListsComponent implements OnInit {
  date = new Date();
  lists: List[];
  constructor(private listService: ListsService) {}

  public getLists(): void {
    this.listService.getLists().subscribe((newLists) => {
      this.lists = newLists;
    });
    console.log('List pulls lists');
  }

  public deleteTask(id: string): void {
    this.listService.deleteList(id).subscribe();
    this.lists = this.lists.filter((t) => t._id !== id);
  }

  ngOnInit(): void {
    this.getLists();
  }

  public onNewList(list: List): void {
    this.getLists();
  }
}
