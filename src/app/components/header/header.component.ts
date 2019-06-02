import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  modes = [
    { title: 'easy', field: 5, delay: 2000 },
    { title: 'normal', field: 5, delay: 2000 },
    { title: 'hard', field: 5, delay: 2000 },
  ];

  selectedMode = this.modes[1];

  ngOnInit() {
  }

}
