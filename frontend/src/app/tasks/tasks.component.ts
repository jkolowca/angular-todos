import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ListsService } from '../lists.service';
import { List } from '../list';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass'],
})
export class TasksComponent implements OnInit {
  title = 'to-do';
  date = new Date();
  list: List = { _id: 'a', name: '' };
  constructor(
    private listService: ListsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    const listId = this.route.snapshot.paramMap.get('id');
    this.listService.getList(listId).subscribe((l) => {
      if (!l) {
        this.router.navigateByUrl('/');
      }
      this.list = l;
    });
  }
}
