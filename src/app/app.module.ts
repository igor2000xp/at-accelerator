import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FavoritesViewComponent } from './favorites-view/favorites-view.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApiInterceptor } from './interseptors/api.interceptor';

@NgModule({
  declarations: [AppComponent, FavoritesViewComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideHttpClient(withInterceptors([ApiInterceptor]))],
  bootstrap: [AppComponent],
})
export class AppModule {}
