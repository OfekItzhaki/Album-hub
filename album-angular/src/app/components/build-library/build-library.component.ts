import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../../services/server-service/server.service'

@Component({
  selector: 'app-build-library',
  templateUrl: './build-library.component.html',
  styleUrls: ['./build-library.component.css']
})
export class BuildLibraryComponent implements OnInit {

  constructor( private router: Router, private serverService: ServerService ) { }

  ngOnInit(): void {
    this.serverService.checkIfFolderExists();
  }


  JumpToPermissions() {
    this.router.navigateByUrl('permissions');
  }

}
