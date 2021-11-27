import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  title:string       = "Make Your CSS Dynamic with CSS Custom Properties";
  subTitle:string    = "Changing properties of CSS document all arround";
  writerName:string  = "Javier Ponsoda";
  writerImg:string   = "data:image/jpeg;base64,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";
  date:string        = "Nov 23";
  tags:Array<string> = ["JS","HTML","CSS"];
  htmlContent:string = "Hola mundo!";
  editorActivo:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
