import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  public articles!: Array<Article>;
  public status!: string;

  constructor(
    private _articleService: ArticleService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(){
    this._route.params.subscribe(
      params=>{
        if(params.search){
          //Search articles
          this._articleService.search(params.search).subscribe(
            response=>{
              if(response.status == "success"){
                this.status = "success";
                this.articles = response.articles;
              }else{
                this.status = "error";
              }
            },
            error=>{
              this.status = "error";
              console.log(error);
            }
          );
        }else{
          //Get all articles
          this._articleService.getAll().subscribe(
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
    );
    
  }

}
