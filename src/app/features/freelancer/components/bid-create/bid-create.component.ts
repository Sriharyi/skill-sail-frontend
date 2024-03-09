import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {BidForm} from "../../../../shared/models/freelancer/bid";

@Component({
  selector: 'app-bid-create',
  templateUrl: './bid-create.component.html',
  styleUrls: ['./bid-create.component.scss']
})
export class BidCreateComponent {
  public bidForm:FormGroup<BidForm>;

  constructor(private fb:FormBuilder,private matDialogRef:MatDialogRef<BidCreateComponent>) {
    this.bidForm = this.createBidForm();
  }

  ngOnInit(): void {
  }

  createBidForm():FormGroup {
    return  this.fb.group<BidForm>({
      bidAmount: this.fb.control(null, [Validators.required]),
      proposal: this.fb.control(null, [Validators.required])
    });
  }

  submitBid() {
    this.matDialogRef.close(this.bidForm.value);
  }

}
