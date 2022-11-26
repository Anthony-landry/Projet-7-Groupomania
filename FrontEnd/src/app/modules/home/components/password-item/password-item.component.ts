import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-item',
  templateUrl: './password-item.component.html',
  styleUrls: ['./password-item.component.css']
})
export class PasswordItemComponent implements OnInit {

  @Input() valid: boolean = true;
  @Input() label: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
