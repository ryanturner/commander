import {Component} from '@angular/core';
import {ControlPage} from '../control/control';
import {SettingsPage} from '../settings/settings';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = ControlPage;
    this.tab2Root = SettingsPage;
  }
}
