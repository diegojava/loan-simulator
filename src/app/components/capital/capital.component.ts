import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-capital',
  templateUrl: './capital.component.html',
  styleUrls: ['./capital.component.scss']
})
export class CapitalComponent implements OnInit {

  @Input() amount!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
