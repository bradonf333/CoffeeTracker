import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'underscore';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CoffeeTracker';

  constructor() {}

  ngOnInit() {}
}
