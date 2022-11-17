import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements OnInit {
  @Input() control = new FormControl()
  @Input() label: any | string
  @Input() type: any | string
  @Input() error: any | string
  
  constructor() { }

  ngOnInit(): void {
  }

}
