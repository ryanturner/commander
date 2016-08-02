import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {TRANSLATE_PROVIDERS, TranslateService, TranslatePipe, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  pipes: [TranslatePipe]
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform, translate: TranslateService) {
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      var userLang = navigator.language.split('-')[0]; // use navigator lang if available
      userLang = /(fr|en)/gi.test(userLang) ? userLang : 'en';

       // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('en');

       // the lang to use, if the lang isn't available, it will use the current loader to get them
      translate.use(userLang);
    });
  }
}

ionicBootstrap(MyApp, [TRANSLATE_PROVIDERS]);
