import * as FileSaver from 'file-saver';

export class FileDownloader {

  constructor() {}

  public blobHandler(data) {
    const contentDisposition = data['headers'].get('Content-Disposition');
    const contentType = data['headers'].get('Content-Type');
    const isContentDispositionInline = contentDisposition.split(';')[0].endsWith('inline');
    const filename = contentDisposition.split('filename')[1];
    const firstIndex = filename.indexOf('"');
    const lastIndex = filename.lastIndexOf('"');


    const name = filename.substring(firstIndex + 1, lastIndex).trim();
    const blob = new Blob([data['body']], { type: contentType });

    if (isContentDispositionInline) {
      const fileURL = window.URL.createObjectURL(blob);
      window.open(fileURL, '_blank')
    } else {
      FileSaver.saveAs(blob, name);
    }
  }
}
