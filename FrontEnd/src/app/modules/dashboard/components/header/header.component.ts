import { AuthService } from 'src/app/modules/home/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostEditPopUpComponent } from '../post-edit-pop-up/post-edit-pop-up.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private dialog: MatDialog, private authService: AuthService) {}

  ngOnInit(): void {}

  public create() {
    this.dialog.open(PostEditPopUpComponent, {
      width: '50%',
      data: { isEditingMode: false },
    });
  }

  public logout() {
    this.authService.logout()
  }
}
