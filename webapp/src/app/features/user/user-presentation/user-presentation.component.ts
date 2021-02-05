import { UserService } from 'src/app/_services/api/user.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/_models/user/User';
import { FileUploader } from 'ng2-file-upload';
@Component({
  selector: 'app-user-presentation',
  templateUrl: './user-presentation.component.html',
  styleUrls: ['./user-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPresentationComponent implements OnInit {

  @Input()  user!: User | null;
  @Output() testEvent = new EventEmitter<any>();
  @Output() uploadProfilePicture = new EventEmitter<any>();
  @ViewChild('fileInput') fileInput!: ElementRef;
  public actualizationNedded!: boolean;
  public uploader!: FileUploader;
  public hasBaseDropZoneOver = false;
  public fileName!: string;
  public envelopeId!: number;

  public roles = [
    'ADMIN',
    'USER'
  ];
  userForm!: FormGroup;
  uploadForm: FormGroup = this.fb.group({
    profile: ['']
  })

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: this.fb.control(this.user?.username, Validators.required),
      email: this.fb.control(this.user?.email, [Validators.required, Validators.email]),
      roles: this.fb.control(this.getUserRoles(), [Validators.required]),
      name: this.fb.control(this.user?.name),
      surname: this.fb.control(this.user?.surname),
      address: this.fb.control(this.user?.address)
    });

    this.initializeFileUploader();
  }

  saveChanges() {
    if (this.userForm.valid) {
      this.testEvent.emit({
        id: this.user?.id,
        userForm: this.userForm.value
      })
    }
  }

  private getUserRoles() {
    const roles = this.user?.roles as any[];

    return roles.map(role => role.role) as any[];
  }

  onFileChange(event: any) {
    let reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.uploadForm.get('profile')?.patchValue({
          file: reader.result
        });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }
  
  uploadProfilePicutre() {
    if (this.uploader.queue.length > 0) {
      const formData = new FormData();
      formData.append('file', this.uploader.queue[0].file.rawFile);
      this.uploadProfilePicture.emit({
        id: this.user?.id,
        formData: formData
      })
    }

  }

  initializeFileUploader = () => {
    this.uploader = new FileUploader({
      url: 'test',
      disableMultipart: true,
      removeAfterUpload: true
    });

    this.uploader.queue = [];
    this.fileInput.nativeElement.value = '';
  };

  public onFileSelected() {
    if (this.uploader.queue.length > 1) {
      this.uploader.queue.splice(0, this.uploader.queue.splice.length - 1);
    }
    this.fileName = this.uploader.queue[0].file.name;
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }


}
