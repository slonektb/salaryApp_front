import { Component, OnInit } from '@angular/core';
import {ExcelService} from "./service/excel.service";

@Component({
  selector: 'app-a',
  templateUrl: './a.component.html',
  styleUrls: ['./a.component.scss']
})
export class AComponent implements OnInit {

  constructor(private excelService: ExcelService) {
  }
  generateExcel() {
    // this.excelService.generateExcel();
  }

  ngOnInit() {
  }
}
