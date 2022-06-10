import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSliderChange } from '@angular/material/slider';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  MAX_SLIDER = 100000;
  loanForm !: FormGroup;
  amount: number = 0;
  url: any;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<LoanComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public capital: any
  ) {
  }

  ngOnInit(): void {
    this.url = this.router.url;
    this.loanForm = this.formBuilder.group({
      cardId: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      date: ['', Validators.required],
      amount: ['', Validators.min(1000)],
      isApproved: this.qualifyLoan(),
      isPaid: false,
      id: this.uuid()
    });
    console.log(this.capital)
    if (this.capital < 100000) this.MAX_SLIDER = this.capital;
  }

  uuid = () => {
    const part1 = Date.now().toString(36);
    const part2 = Math.random().toString(36).substring(2);
    return `${part1}${part2}`
  }
  
  qualifyLoan() {
    return Math.random() < 0.5;
  }
  
  onInputChange(event: MatSliderChange) {
    this.amount = event.value || 0;
  }

  requestLoan() {
    if (this.loanForm.get('amount')?.value == 0 || !this.loanForm.valid) {
      alert('error');
    }
    this.loanForm.get('isApproved')?.value 
      ? alert("¡Felicidades! tu solicitud fue exitosa") 
      : alert("Lo sentimos, tu solicitud fue denegada");
    this.api.postLoan(this.loanForm.value)
      .subscribe({
        next:(res) => {
          this.loanForm.reset();
          this.api.refresh();
          this.dialogRef.close(); 
        },
        error:() => {
          alert("Something went wrong")
        }
      })
  }
}
