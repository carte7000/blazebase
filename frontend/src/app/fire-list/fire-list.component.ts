import { Component, OnInit } from '@angular/core';
import { UploadService } from '../data/upload.service';
import { tap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-fire-list',
  templateUrl: './fire-list.component.html',
  styleUrls: ['./fire-list.component.scss']
})
export class FireListComponent implements OnInit {

  public fires$;

  constructor(
    private upload: UploadService,
    private domSan: DomSanitizer,
  ) { }

  async ngOnInit() {
    this.fires$ = await this.upload.getFires();
    this.fires$.pipe(tap(console.log)).subscribe();
  }

  getStyle(vote: number) {
    let size = 12;
    if (vote) {
      size = size * vote;
    }
    return this.domSan.bypassSecurityTrustStyle(`font-size: ${size}px`);
  }

  voteUp(id) {
    this.upload.voteUp(id);
  }

  voteDown(id) {
    this.upload.voteDown(id);
  }


}
