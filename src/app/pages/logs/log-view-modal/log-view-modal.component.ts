import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import Issue from '../../../shared/types/Issue';

@Component({
  selector: 'app-log-view-modal',
  templateUrl: './log-view-modal.component.html',
  styleUrls: ['./log-view-modal.component.scss']
})
export class LogViewModalComponent implements OnInit {
  @ViewChild('createModal') createModal: ModalDirective;

  public issue: Issue;
  public tags: string[];
  
  constructor() { }

  ngOnInit() {
  }

  showModal(issue: Issue): void {
    this.issue = issue;
    this.tags = issue.Tags.split(';');
    console.log(issue)
    this.createModal.show();
  }

}
