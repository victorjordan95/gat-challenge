import { Component, OnInit, ViewChild } from '@angular/core';
import gatJson from '../gat'
import { LogViewModalComponent } from './log-view-modal/log-view-modal.component';
import Issue from '../../shared/types/Issue';

@Component({
    selector: 'app-logs',
    templateUrl: './logs.component.html',
    styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

    @ViewChild(LogViewModalComponent) modalComponent: LogViewModalComponent;

    public json;
    public table_headers = [
        'ID', 'Name', 'Asset', 'Status', 'Severity (Asset risk)', 'Responsible', 'Port',
        'Protocol', 'Service name', 'Source',
        'Changed date', 'Last seen date', 'Due date'
    ];

    public key = 'nome';
    public reverse = false;
    public currentPage = 1;
    public filter = '';

    constructor() { }

    ngOnInit() {
        this.json = gatJson;
    }

    public showModal(issue: Issue): void {
        this.modalComponent.showModal(issue);
    }

    public sort(key: string): void {
        this.key = key;
        this.reverse = !this.reverse;
    }

}
