import { Component, OnInit, ViewChild } from '@angular/core';
import { LogViewModalComponent } from './log-view-modal/log-view-modal.component';
import Issue from '../../shared/types/Issue';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
    selector: 'app-logs',
    templateUrl: './logs.component.html',
    styleUrls: ['./logs.component.scss'],
    providers: [ApiService]
})
export class LogsComponent implements OnInit {

    @ViewChild(LogViewModalComponent) modalComponent: LogViewModalComponent;

    public subscription: Subscription;
    public isLoading: boolean;

    public logs: Issue[];
    public originalLogs: Issue[];

    public key = 'Name';
    public reverse = false;
    public currentPage = 1;
    public filterText = '';
    public selectedFilter: string;

    public table_headers = [
        { 'label': 'ID', 'id': 'ID' },
        { 'label': 'Name', 'id': 'Name' },
        { 'label': 'Asset', 'id': 'Asset' },
        { 'label': 'Status', 'id': 'Status' },
        { 'label': 'Severity (Asset risk)', 'id': 'Severity' },
        { 'label': 'Responsible', 'id': 'Responsible' },
        { 'label': 'Port', 'id': 'Port' },
        { 'label': 'Protocol', 'id': 'Protocol' },
        { 'label': 'Source', 'id': 'Source' },
        { 'label': 'Changed date', 'id': 'ChangedDate' },
        { 'label': 'Last seen date', 'id': 'LastSeenDate' },
        { 'label': 'Due date', 'id': 'DueDate' }
    ];

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.getLogs();
    }

    public showModal(issue: Issue): void {
        this.modalComponent.showModal(issue);
    }

    public sort(key: string): void {
        this.key = key;
        this.reverse = !this.reverse;
    }

    private getLogs(): void {
        this.isLoading = true;
        this.subscription = this.apiService.getLogs().subscribe(
            (logs: Issue[]) => {
                this.originalLogs = logs;
                this.logs = logs;
                this.isLoading = false;
            },
            (err: any) => {
                console.log(err);
                this.isLoading = false;
            }
        );
    }

    public searchFilter(): void {
        this.logs = [];
        if (this.filterText === '') {
            this.resetLogs();
            return;
        }
        this.originalLogs.forEach(log => {
            if (log[this.selectedFilter].toLowerCase().includes(this.filterText.toLowerCase())) {
                this.logs = [...this.logs, log];
            }
        });
    }

    public resetLogs(): void {
        this.logs = [];
        this.logs = [...this.originalLogs];
    }

}
