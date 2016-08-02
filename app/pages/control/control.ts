import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {TRANSLATE_PROVIDERS, TranslateService, TranslatePipe, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';

/*
  Generated class for the ControlPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/control/control.html',
  pipes: [TranslatePipe]
})
export class ControlPage {

  constructor(private nav: NavController) {

  }

}
