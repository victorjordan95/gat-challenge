import { Component, OnInit, ViewChild } from '@angular/core';
import gatJson from '../gat'
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

    public key = 'Name';
    public reverse = false;
    public currentPage = 1;
    public filter = '';

    public table_headers = [
        'ID', 'Name', 'Asset', 'Status', 'Severity (Asset risk)', 'Responsible', 'Port',
        'Protocol', 'Source',
        'Changed date', 'Last seen date', 'Due date'
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
