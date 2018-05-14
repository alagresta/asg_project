import { Component, OnInit } from '@angular/core';
import { SearchService } from '../service/search/search.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [SearchService]
})
export class HomeComponent implements OnInit {
  public offset: number;
  public  prevTerm: string;
  public searchResult: Object[];
  public originalSearchResult: Object[];

  public defaultImage = 'https://dummyimage.com/80X90/cccccc/000000&text=no+cover';
  constructor(private dataService: SearchService) {
    this.offset = 0;
    this.prevTerm = '';
    this.searchResult = [];
    this.originalSearchResult = [];
  }

  ngOnInit() {
  }

  initSearch(searchTerm: string){
    if(this.prevTerm != searchTerm) {
      this.offset = 0;
      this.originalSearchResult = [];
      this.doSearch(searchTerm);
    }
  }
  doSearch(searchTerm: string): void {
    this.prevTerm = searchTerm !== this.prevTerm ? searchTerm : this.prevTerm;
    this.dataService.find(this.prevTerm, this.offset, 20).subscribe(data => {
      if (data.numFound > 0) {
        console.log(data.docs)
        this.offset = data.docs.length;
        const len = data.docs.length;
        for (let i = 0; i <= len; i++) {
          if(data.docs[i]) {
            this.originalSearchResult.push(data.docs[i]);
          }
        }
      //  this.searchResult = data.docs.slice(0, 20);
        console.log(this.originalSearchResult);
      }
    });
  }

  onScrollDown() {
    console.log('scroll down')
    /*if (this.searchResult.length < this.originalSearchResult.length) {
      const len = this.searchResult.length;
      for (let i = len; i <= len + 20; i++) {
        this.searchResult.push(this.originalSearchResult[i]);
      }
    }*/
    this.doSearch(this.prevTerm);
  }

}
