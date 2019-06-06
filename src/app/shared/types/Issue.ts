export default interface Issue {
    ID: number;
    Name: string;
    Description: string;
    Asset: string;
    Status: string;
    Severity: string;
    Responsible: string;
    Port: number;
    Protocol: string;
    ServiceName: string;
    Source: string;
    ChangedDate: string;
    LastSeenDate: string;
    DueDate: string;
    Tags: string;
    KB: string;
    Recommendations: string;
    RootCause: string;
}
