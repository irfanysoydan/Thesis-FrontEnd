import { transition } from '@angular/animations';
import { BootstrapOptions, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Party } from 'src/app/models/party.model';
import { Transaction } from 'src/app/models/transaction.model';
import { BlockchainService } from 'src/app/services/blockchain.service';
import { LocalService } from 'src/app/services/local.service';
import { PartyService } from 'src/app/services/party.service';
import Swal from 'sweetalert2';
const CryptoJS = require("crypto-js");
const { SHA256, enc } = CryptoJS;

@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.scss'],
})
export class ElectionComponent implements OnInit {
  isVoted: boolean = false;
  electionId: any;
  electionname: string = '';
  parties: Party[] = [];
  isError: boolean = false;
  message: string = '';
  privateKey: string = "";
  constructor(private partyService: PartyService, private router: Router, private blockchainService: BlockchainService, private localService: LocalService) { }

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
  vote(id: any, partyName: any) {
    Swal.fire({
      title: "Oy kullanmak için özel anahtarınızı giriniz.",
      text: "",
      input: "text",
      inputPlaceholder: 'Özel anahtar',
      icon: 'info', showCancelButton: true
    }).then(response => {
      if (response.isConfirmed) {
        this.privateKey = response.value;
        Swal.fire({
          title: "Dikkat bu işlem geri alınamaz!",
          text: `${partyName} partisine oy vermek istediğinize emin misiniz?`,
          icon: "warning",
          showCancelButton: true
        })
          .then(response => {
            if (response.isConfirmed) {
              const tx = new Transaction(this.localService.getData("publicKey"), "Valid address", {
                partyID: SHA256(id).toString(enc.hex)
              });
              tx.sign(this.privateKey);
              this.blockchainService.sendTransactionToBlockchain(tx).subscribe(response => {
                if (response.success) {
                  Swal.fire("Tebrikler", "Başarılı bir şekilde oy kullandınız", "success");
                  this.isVoted = true;
                } else {
                  Swal.fire("Oy kullanmadınız!", "Sistemsel bir hata oluştu.", "error")
                }
              });
            } else {
              Swal.fire("Oy kullanmadınız", "Özel anahtırınızla oy kullanabilirsiniz", "warning")
            }
          });
      } else {
        Swal.fire("Oy kullanmadınız", "Özel anahtırınızla oy kullanabilirsiniz", "warning")
      }
    })
  }
}
