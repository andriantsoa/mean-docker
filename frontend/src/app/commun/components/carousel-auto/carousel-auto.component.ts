import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel-auto',
  templateUrl: './carousel-auto.component.html',
  styleUrls: ['./carousel-auto.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [style({ opacity: 0 }), animate('200ms', style({ opacity: 1 }))]),
      transition('* => void', [style({ opacity: 1 }), animate('200ms', style({ opacity: 0 }))]),
    ])
  ]
})
export class CarouselAutoComponent implements OnInit {

  public current = 0;
  public imgList = [
    'https://picsum.photos/600/400/?image=0',
    'https://picsum.photos/600/400/?image=1',
    'https://picsum.photos/600/400/?image=2',
  ];

  ngOnInit(): void {
    setInterval(() => {
      this.current = ++this.current % this.imgList.length;
    }, 2000);
  }

}
