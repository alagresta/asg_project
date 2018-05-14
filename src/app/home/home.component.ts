import { Component, OnInit } from '@angular/core';
import { SearchService } from '../service/search/search.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [SearchService]
})
export class HomeComponent implements OnInit {
  public page: number;
  public  prevTerm: string;
  public searchResult: Object[];
  constructor(private dataService: SearchService) {
    this.page = 1;
    this.prevTerm = '';
    this.searchResult = [];
  }

  ngOnInit() {
  }

  doSearch(searchTerm: string): void {
    this.prevTerm = searchTerm !== this.prevTerm ? searchTerm : this.prevTerm;
    this.dataService.find(this.prevTerm, 1, 10).subscribe(data => {
      this.searchResult = data;
    });
  }

}
