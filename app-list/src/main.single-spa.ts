import { enableProdMode, NgZone } from '@angular/core';
import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular';
import { Router, NavigationStart, provideRouter } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';

import { App } from './app/app';
import { appConfig } from './app/app.config';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';

if (process.env['NODE_ENV'] === 'production') {
  enableProdMode();
}

const lifecycles = singleSpaAngular({
  bootstrapFunction: (singleSpaProps) => {
    singleSpaPropsSubject.next(singleSpaProps);
    return bootstrapApplication(App, {
      ...appConfig,
      providers: [
        ...(appConfig.providers || []),
        ...getSingleSpaExtraProviders(),
      ],
    });
  },
  template: '<app-root />',
  Router,
  NavigationStart,
  NgZone,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
