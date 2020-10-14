import { AccountService } from './../../services/account.service';
import { IDetailResponse } from './../../interfaces/account.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  account:IDetailResponse ={
    user: {
      id:0,
      fullname:'',
      phone:'',
      email:''
    },
    entrepreneurships: [],
    deals: []
  };

  constructor(
    private accountService:AccountService
  ) { }

  ngOnInit() {
  }

  async ionViewDidEnter(){
    this.account = await this.accountService.getDetailsAccount();
  }

}
