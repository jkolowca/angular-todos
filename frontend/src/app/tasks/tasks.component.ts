import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ListsService } from '../services/lists.service';
import { List } from '../interfaces/list';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})

export class TasksComponent implements OnInit {
  date = new Date();
  list: List = { _id: 'a', name: '' };

  constructor(
    private location: Location,
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

  goHome(): void {
    this.location.back();
  }
}
