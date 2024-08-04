import { Component, OnInit, Input } from '@angular/core';
import { global } from 'src/app/global';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  @Input() articles!: Array<Article>;
  public url;
  constructor() { 
    this.url = global.url;
  }

  ngOnInit(): void {
  }

}
