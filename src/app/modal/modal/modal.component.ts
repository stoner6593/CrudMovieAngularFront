import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() title = 'Information';
  @Input() c;
  @Input() d;
  
  constructor() { }

  ngOnInit(): void {
  }

}
