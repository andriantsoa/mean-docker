import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

interface IIconList { [key: string]: string; }
const iconUrl = 'assets/icons';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  list: IIconList = {
    facebook: `${iconUrl}/facebook.svg`,
    linkedin: `${iconUrl}/linkedin.svg`,
    candidat: `${iconUrl}/candidat.svg`,
    entreprise: `${iconUrl}/entreprise.svg`,
  };
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) { }

  public load(): void {
    Object.keys(this.list).forEach(icon => {
      this.matIconRegistry.addSvgIcon(
        icon,
        this.domSanitizer.bypassSecurityTrustResourceUrl(this.list[icon])
      );
    });
  }
}
