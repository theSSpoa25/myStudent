import { Component, Input, OnInit } from '@angular/core';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { map, mergeMap, take } from 'rxjs/operators';
import { UserState } from 'src/app/store/reducers/user.reducer';
import { getUser } from 'src/app/store/selectors/user.selectors';
import { Attachment } from 'src/app/_models/attachment/attachment';
import { User } from 'src/app/_models/user/User';
import { TicketService } from 'src/app/_services/api/ticket.service';
import { FileDownloader } from 'src/app/_shared/file-downloader';
import * as FileSaver from 'file-saver';
import { at } from 'lodash';

@Component({
  selector: 'app-issue-attachement',
  templateUrl: './issue-attachement.component.html',
  styleUrls: ['./issue-attachement.component.scss'],
})
export class IssueAttachementComponent implements OnInit {
  @Input() ticketId: number;
  user: User;
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;
  attachments: Attachment[] = [];
  faFilePdf = faFilePdf;

  constructor(
    private ticketService: TicketService,
    private store: Store<UserState>,
    private toastr: ToastrService
  ) {
    this.store
      .pipe(select(getUser))
      .pipe(map((user) => (this.user = user)))
      .subscribe();
  }

  ngOnInit(): void {
    this.initializeFileUploader();
    this.ticketService.getAllAttachments(this.ticketId).subscribe((res) => {
      this.attachments = res;
    });
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeFileUploader = () => {
    this.uploader = new FileUploader({
      url: 'test',
      disableMultipart: true,
      removeAfterUpload: true,
    });

    this.uploader.queue = [];
  };

  dropped(e) {
    const formData = new FormData();
    formData.append('file', this.uploader.queue[0].file.rawFile);
    this.initializeFileUploader();
    this.ticketService
      .uploadAttachment(this.user.id, this.ticketId, formData)
      .pipe(
        mergeMap((res) => {
          this.toastr.success('File uploaded Succesffully');
          return this.ticketService.getAllAttachments(this.ticketId);
        })
      )
      .subscribe((res) => {
        this.attachments = res;
      });
  }

  download(fileId: number) {
    this.ticketService.getAttachment(fileId).subscribe((attachement) => {
      const byteArray = new Uint8Array(atob(attachement.data).split('').map(char => char.charCodeAt(0)));
      const blob =  new Blob([byteArray], {type: attachement.fileType});
      FileSaver.saveAs(blob, attachement.fileName);
    });
  }

  blobToBase64 = (blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };
}
