import { Injectable } from '@angular/core';
// import * as CryptoJS from 'crypto-js';
// import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private readonly cryptoSecret = 'secret';

  public encrypt(pass: string): string {
    if (pass.trim() === '') {
      return;
    }
    return '';
    // return bcrypt.hashSync(pass, 10);

    // return CryptoJS.AES.encrypt(pass, this.cryptoSecret.trim()).toString();
  }

  private decrypt(cryptedValue: string): string {
    if (cryptedValue.trim() === '') {
      return;
    }
    return '';
    // return CryptoJS.AES.decrypt(cryptedValue.trim(), this.cryptoSecret.trim()).toString(CryptoJS.enc.Utf8);
  }

}
