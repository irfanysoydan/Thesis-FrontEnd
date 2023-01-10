import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Election } from 'src/app/models/election.model';
import { ElectionService } from 'src/app/services/election.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  elections: Election[] = [];
  isError: boolean = false;
  message: string = '';

  constructor(
    private electionService: ElectionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getElections();
  }

  getElections() {
    this.electionService.getElections().subscribe((response) => {
      if (response.isSuccessful) {
        this.elections = response.data;
      } else {
        this.elections = [];
      }
    });
  }

  navigateDetails(id: any) {
    this.router.navigate(['election'], { state: { id: id } });
  }
}
