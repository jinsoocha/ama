// main entry point

import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { AppComponent } from './app.component';
import { appRouterProviders } from './app.routes';

bootstrap(AppComponent, [
  appRouterProviders,
  HTTP_PROVIDERS,
  disableDeprecatedForms(),
  provideForms()
])
.catch(err => console.error(err));