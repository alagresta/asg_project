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
  public searchResult: any;
  constructor(private dataService: SearchService) {
    this.page = 1;
    this.searchResult = {};
  }

  ngOnInit() {
  }

  doSearch(searchTerm: string): void {
    this.dataService.find(searchTerm, 1, 10).subscribe(data => {
      console.log(data);
    });
  }

}
