import { ProfilePicture } from './../../_models/user/profile-picture';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'toImage'
})
export class ToImagePipe implements PipeTransform {

  constructor(
    private sanitizer: DomSanitizer
  ) {}

  transform(profilePicture: ProfilePicture): any {
    // if (data) {
    //   const img = `<img `
    // }

    const src = `data:${profilePicture.type};base64, ${profilePicture.data}`;

    if (profilePicture && profilePicture.data) {
      return this.sanitizer.bypassSecurityTrustHtml(
        `<img src="${src}" class="profile-picture-img" style=" height: 120px; width: 120px; border-radius: 50%;">`
      )
    }

    return null;

    // const<img [src]="profilePicture && profilePicture.data ? 'data:image/png;base64, ' + profilePicture.data : 'assets/images/portraits/sailor.jpg'" alt="">
  }

}
