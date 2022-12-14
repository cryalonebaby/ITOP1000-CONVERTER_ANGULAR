import { Component, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/shared/services/error.service';

@Component({
  selector: 'app-global-error',
  templateUrl: './global-error.component.html',
  styleUrls: ['./global-error.component.scss']
})
export class GlobalErrorComponent implements OnInit {

  constructor(public errorService: ErrorService) { }

  ngOnInit(): void {
  }

  close() {
    this.errorService.clear()
  }

}
