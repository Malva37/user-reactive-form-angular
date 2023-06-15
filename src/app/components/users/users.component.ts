import { Component, OnInit } from '@angular/core';
import { User } from 'src/types/User';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'framework',
    'delete',
  ];
  users = new MatTableDataSource<User>();

  constructor(
    public dialog: MatDialog,
    public usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.usersService.users$.subscribe((data) => {
      this.users.data = data;
    });
  }


  onDelete(id: number) {
    this.usersService.deleteUser(id).subscribe();
  }

}
