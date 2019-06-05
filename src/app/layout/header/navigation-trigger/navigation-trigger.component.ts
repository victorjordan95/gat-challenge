import { SharedService } from './../../../shared/services/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-trigger',
  templateUrl: './navigation-trigger.component.html',
  styleUrls: ['./navigation-trigger.component.scss']
})
export class NavigationTriggerComponent implements OnInit {
  sidebarVisible = false;

  constructor(private sharedService: SharedService) {
    sharedService.sidebarVisibilitySubject.subscribe((value: boolean) => {
      this.sidebarVisible = value;
    })
  }

  toggleSidebarVisibility() {
    this.sharedService.toggleSidebarVisibilty()
  }

  ngOnInit() {

  }
}
