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

    /**
     * Show modal with the clicked issue content
     * @param issue Issue - The clicked issue by user
     */
    public showModal(issue: Issue): void {
        this.modalComponent.showModal(issue);
    }

    /**
     * Order the column by the clicked
     * column in HTML table.
     * Orders it by ASC or DESC
     * @param key String - Clicked header in HTML
     */
    public sort(key: string): void {
        this.key = key;
        this.reverse = !this.reverse;
    }

    /**
     * Search in the log array the
     * input value. If it's empty,
     * returns all logs.
     */
    public searchFilter(): void {
        this.logs = [];
        if (this.filterText === '') {
            this.resetLogs();
            return;
        }
        this.originalLogs.forEach((log: Issue) => {
            if ( log[this.selectedFilter]
                    .toString()
                    .toLowerCase()
                    .includes(this.filterText.toString().toLowerCase())) {
                this.logs = [...this.logs, log];
            }
        });
    }

    /**
     * Clean any filter and
     * return to the original state.
     */
    public resetLogs(): void {
        this.logs = [];
        this.logs = [...this.originalLogs];
    }

    /**
     * Fetch from server the logs
     */
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

}
