import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {TRANSLATE_PROVIDERS, TranslateService, TranslatePipe, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';

/*
  Generated class for the SettingsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/settings/settings.html',
  pipes: [TranslatePipe]
})
export class SettingsPage {

  constructor(private nav: NavController) {

  }

}
