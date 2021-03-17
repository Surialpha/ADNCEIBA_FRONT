import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: 'toolbar.component.html',
  styles: [`:host {
    background: linear-gradient(to bottom, #32383e 10%, #32383f 40%, #1C1C1C 180%),
    linear-gradient(to top, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.25) 200%);
    background-blend-mode: multiply;
    color: rgba(255, 255, 255, 0.87);
    display: block;
    height: 48px;
    padding: 0 16px;
  }
  h1 {
    display: inline;
    font-size: 20px;
    font-weight: normal;
    letter-spacing: 0.1px;
    line-height: 48px;
  }

  .more {
    background: url("/assets/svg/more.svg");
    float: right;
    height: 24px;
    margin-top: 12px;
    width: 24px;
  }`]
})
export class ToolbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
