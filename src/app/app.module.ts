import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { apiInterceptor } from './api/interceptor/api-interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FavoritesViewComponent } from './favorites-view/favorites-view.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, FavoritesViewComponent],
  imports: [BrowserModule, AppRoutingModule],
  bootstrap: [AppComponent],
  providers: [provideHttpClient(withInterceptors([apiInterceptor]))],
})
export class AppModule {}
