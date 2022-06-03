import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from './app.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'app2';
  displayedColumns: string[] = ['pic', 'first_name', 'last_name', 'email'];
  dataSource = new MatTableDataSource<any>([]);
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  data: any;

  constructor(private appService: AppService) {}
  ngOnInit() {
    this.appService.getData().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource<Element>(response.data);
      this.dataSource.paginator = this.paginator;
      this.data = response.data;
      this.totalSize = this.data.length;
      this.setPaginator();
    });
  }

  getPaginatorData(e: PageEvent) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.setPaginator();
  }
  private setPaginator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const pageData = this.data.slice(start, end);
    this.dataSource = pageData;
  }
}
