import { Component } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent {

  public imageObject = [
    {
      // image: 'assets/images/partners/partner-1.png',
      thumbImage: 'assets/images/partners/partner-1.png',
      // title: 'Hummingbirds are amazing creatures'
    },
    {
      image: 'assets/images/partners/partner-2.png',
      thumbImage: 'assets/images/partners/partner-2.png',
    },
    {
      image: 'assets/images/partners/partner-3.png',
      thumbImage: 'assets/images/partners/partner-3.png',
      // title: 'Example with title.'
    },
    {
      image: 'assets/images/partners/partner-4.png',
      thumbImage: 'assets/images/partners/partner-4.png',
      // title: 'Hummingbirds are amazing creatures'
    },
    {
      image: 'assets/images/partners/partner-5.png',
      thumbImage: 'assets/images/partners/partner-5.png',
    },
    {
      image: 'assets/images/partners/partner-1.png',
      thumbImage: 'assets/images/partners/partner-1.png',
      // title: 'Example two with title.'
    },
    {
      image: 'assets/images/partners/partner-2.png',
      thumbImage: 'assets/images/partners/partner-2.png',
    },
    {
      image: 'assets/images/partners/partner-3.png',
      thumbImage: 'assets/images/partners/partner-3.png',
      // title: 'Example with title.'
    },
    {
      image: 'assets/images/partners/partner-4.png',
      thumbImage: 'assets/images/partners/partner-4.png',
      // title: 'Hummingbirds are amazing creatures'
    },
    {
      image: 'assets/images/partners/partner-5.png',
      thumbImage: 'assets/images/partners/partner-5.png',
    }
  ];

}
