import { Component, OnInit } from '@angular/core';
import { UploadService } from '../data/upload.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-fire-list',
  templateUrl: './fire-list.component.html',
  styleUrls: ['./fire-list.component.scss']
})
export class FireListComponent implements OnInit {

  public fires$;

  constructor(
    private upload: UploadService,
  ) { }

  async ngOnInit() {
    this.fires$ = await this.upload.getFires();
    this.fires$.pipe(tap(console.log)).subscribe();
  }

}
