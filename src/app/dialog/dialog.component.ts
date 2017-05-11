import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { OrdersService } from '../providers/orders.service';

@Component({
  selector: 'app-dialog',
  template:`<div class="prompt" >
    <h4>Are your sure?</h4>
    <button class="btn btn-success"
    (click)="sendHidePrompt()">No</button>
    <button class="btn btn-danger"
    (click)="updateStatus(order)">Yes</button>
  </div>`,
  styleUrls: ['../bootstrap.css','../dashboard/dashboard.component.css']
})
export class DialogComponent implements OnInit {
  @Input() order;
  @Input() prompt:boolean;
  @Output() hidePrompt = new EventEmitter<boolean>();

  constructor(private _ordersService: OrdersService) { }

  ngOnInit() { }
  updateStatus(order){
    this._ordersService.updateStatus(order);
    this.sendHidePrompt();
  }
  sendHidePrompt(){
    this.hidePrompt.emit(false);
  }
}
