import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent implements OnInit {

  sheetData: any;
  actionType: string;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    @Optional() @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {
    this.sheetData = data;
    this.actionType = data.actionType;
  }

  ngOnInit() {
  }

  bookingChoice(choice: string) {
    this.bottomSheetRef.dismiss(choice);
  }

}
