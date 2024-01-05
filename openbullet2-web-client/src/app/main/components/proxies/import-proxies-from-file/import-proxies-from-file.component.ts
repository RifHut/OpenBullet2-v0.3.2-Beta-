import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { ProxiesToImport } from '../import-proxies-from-text/import-proxies-from-text.component';

@Component({
  selector: 'app-import-proxies-from-file',
  templateUrl: './import-proxies-from-file.component.html',
  styleUrls: ['./import-proxies-from-file.component.scss']
})
export class ImportProxiesFromFileComponent {
  @Output() confirm = new EventEmitter<ProxiesToImport>();
  @ViewChild('fileUpload') fileUpload: FileUpload | null = null;
  selectedFile: File | null = null;

  defaultUsername: string = '';
  defaultPassword: string = '';
  defaultProxyType: string = '';
  proxyTypes: string[] = [
    'http',
    'socks4',
    'socks5',
    'socks4a'
  ];

  constructor(private messageService: MessageService) {

  }

  public reset() {
    this.fileUpload?.clear();
    this.selectedFile = null;
    this.defaultUsername = '';
    this.defaultPassword = '';
    this.defaultProxyType = 'http';
  }

  submitForm() {
    if (this.selectedFile === null) {
      console.log('No files selected');
      return;
    }

    let fileReader = new FileReader();

    fileReader.onload = (e) => {
      if (fileReader.result === null) {
        this.messageService.add({
          severity: 'error',
          summary: 'Invalid file',
          detail: `Could not read lines from file ${this.selectedFile?.name}`
        });
        return;
      }

      const lines = fileReader.result.toString().split(/[\r\n]+/);

      this.confirm.emit({
        defaultUsername: this.defaultUsername,
        defaultPassword: this.defaultPassword,
        defaultType: this.defaultProxyType,
        proxies: lines
      });
    }

    fileReader.readAsText(this.selectedFile);
  }

  isFormValid() {
    return this.selectedFile !== null;
  }

  readProxiesFromFile() {
    this.selectedFile
  }
}
