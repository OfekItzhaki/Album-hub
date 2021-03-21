import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HashGuardService } from 'src/app/services/hash-guard/hash-guard.service';

@Component({
  selector: 'app-hash',
  templateUrl: './hash.component.html',
  styleUrls: ['./hash.component.css'],
})
export class HashComponent implements OnInit {
  constructor(
    private active: ActivatedRoute,
    private hashService: HashGuardService
  ) {}

  ngOnInit(): void {
    console.log('HashComponent get hit.......');
    this.hashService.open('1');
  }
}
