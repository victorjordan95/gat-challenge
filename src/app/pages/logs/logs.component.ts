import { Component, OnInit } from '@angular/core';
import gatJson from '../gat'

@Component({
    selector: 'app-logs',
    templateUrl: './logs.component.html',
    styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

    public json;
    public table_headers = [
        'ID', 'Name', 'Description', 'Asset', 'Status', 'Severity (Asset risk)', 'Responsible', 'Port',
        'Protocol', 'Service name', 'Source',
        'Changed date', 'Last seen date', 'Due date', 'Tags', 'KB', 'Recommendations', 'Root cause'
    ];

    public key = 'nome';
    public reverse = false;
    public currentPage = 1;
    public filter = '';

    constructor() { }

    ngOnInit() {
        this.json = gatJson;
    }

    public sort(key: string): void {
        this.key = key;
        this.reverse = !this.reverse;
    }

}
