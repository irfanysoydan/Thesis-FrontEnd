import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Party } from 'src/app/models/party.model';
import { PartyService } from 'src/app/services/party.service';

@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.scss'],
})
export class ElectionComponent implements OnInit {
  electionId: any;
  electionname: string = '';
  parties: Party[] = [];
  isError: boolean = false;
  message: string = '';
  constructor(private partyService: PartyService, private router: Router) {}

  ngOnInit(): void {
    this.electionId = history.state.id;
    this.getPartiesByElectionId(this.electionId);
  }
  getPartiesByElectionId(id: string) {
    this.partyService.getAllPartiesByElectionId(id).subscribe((response) => {
      if (response.isSuccessful) {
        response.data.forEach((partyId: string) => {
          this.partyService.getPartyById(partyId).subscribe((response) => {
            this.parties.push(response.data);
          });
        });
      }
    });
  }
}
