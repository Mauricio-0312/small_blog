import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import {Article} from "../../models/article";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public articles!: Array<Article>;
  public status: any;

  constructor(
    private _articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(){
    this._articleService.getLatest().subscribe(
      response =>{
        if(response.status == "success"){
          this.articles = response.articles;
          this.status = "success";
        }else{
          this.status = "error";
        }
      },
      error =>{
        this.status = "error";
        console.log(error);
      }
    );
  }


}
