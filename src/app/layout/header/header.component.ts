import { SharedService } from './../../shared/services/shared.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [SharedService],
    animations: [
        trigger('toggleHeight', [
            state('inactive', style({
                height: '0',
                opacity: '0'
            })),
            state('active', style({
                height: '*',
                opacity: '1'
            })),
            transition('inactive => active', animate('200ms ease-in')),
            transition('active => inactive', animate('200ms ease-out'))
        ])
    ],
})
export class HeaderComponent implements OnInit {
    messagesData: Array<any>;
    tasksData: Array<any>;
    maThemeModel: string;
    sidebarVisible = false;

    itemsMenu = [
        { link: 'home', icon: 'zmdi-home', label: 'Início' },
    ];

    // Sub menu visibilities
    navigationSubState: any = {
        Tables: 'inactive',
        Forms: 'inactive',
        SamplePages: 'inactive',
        UserInterface: 'inactive',
        Components: 'inactive',
        Charts: 'inactive',
    };

    // Toggle sub menu
    toggleNavigationSub(menu, event) {
        event.preventDefault();
        this.navigationSubState[menu] = (this.navigationSubState[menu] === 'inactive' ? 'active' : 'inactive');
    }

    setTheme() {
        this.sharedService.setTheme(this.maThemeModel);
    }

    constructor(private sharedService: SharedService) {
        sharedService.maThemeSubject.subscribe((value) => {
            this.maThemeModel = value;
        });
        this.sharedService.sidebarVisibilitySubject.subscribe((value) => {
            this.sidebarVisible = value;
        });

    }

    ngOnInit() {
    }

    closeMenu() {
        document.getElementById('js-menu').click();
    }

}
