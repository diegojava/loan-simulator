import { AfterViewInit, Component, OnInit, Output, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { capital } from 'src/environments/environment.capital';
import { LoanComponent } from './loan/loan.component';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'loan-simulator';
  capital = capital.base;

  displayedColumns: string[] = ['cardId', 'name', 'email', 'date', 'amount', 'isApproved', 'action'];
  dataSource!: MatTableDataSource<any>;

  loanAmount!: number;
  loanList: any;
  
  amounts!: Array<number>;
  data: any;
  totalAmount !: any;
  amount!: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
  ) {
    this.amounts = [];
  }

  ngOnInit(): void {
    this.getLoans();
    setTimeout(() => {
      this.renderTable();
      this.getAmountOnLoan();
    }, 1000);
  }

  openDialog(): any {
    if (this.loanAmount == 0) {
      alert("Lo sentimos, no hay capital para prestar");
      return false;
    }
    this.dialog.open(LoanComponent, {
      width: '40%',
      data: this.loanAmount
    });
  }

  getLoans() {
    this.api.getLoan().subscribe(res => {
      this.data = res;
    }) 
  }

  renderTable() {
      this.dataSource = new MatTableDataSource(this.data)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
  }

  getAmountOnLoan() {
    this.amounts = [];
      this.data.filter((value: any) => {
        if (value.isApproved && !value.isPaid) {
          this.amounts.push(value.amount)
        }
      });
      let total = this.amounts.reduce((prev, current) => {
        return prev + current
      }, 0);
      this.loanAmount = this.capital - total;
  }

  setLoanAsPaid(id: string): void {
    let value: any;
    for (value of Object.values(this.data)) {
      if (value.id == id) {
        this.api.putLoan({... value, isPaid: true}, id)
        .subscribe({
          next:(res) => {
            this.renderTable();
            this.api.refresh();
          }
        })
      }
    }
    this.getAmountOnLoan();
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
