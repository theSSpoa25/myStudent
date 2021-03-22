import { Byte } from "@angular/compiler/src/util";

export interface Attachment {
  id: number;
  fileName: string;
  fileType: string;
  data?: string;
}

