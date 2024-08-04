import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public search: string ;
  constructor(
    private _articleService: ArticleService,
    private _router: Router
  ) { 
    this.search = "";
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this._router.navigate(["/blog/", this.search]);
  }
}
