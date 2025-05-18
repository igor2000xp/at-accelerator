import { Directive, ElementRef, HostListener, inject, Input, OnInit } from '@angular/core';
import { FavCrudService } from '../services/fav-crud.service';
import { TvShow } from 'src/app/models/api-interface';

@Directive({
  selector: '[appToggleFav]',
  standalone: true,
})
export class ToggleFavDirective implements OnInit {
  private favCrudService = inject(FavCrudService);
  private elementRef = inject(ElementRef);
  @Input('appToggleFav') data!: TvShow;

  ngOnInit() {
    this.updateHighlight();
  }

  @HostListener('click')
  toggleFav() {
    const favorites = this.favCrudService.getLocalStorageFavorites();
    const exists = favorites.some(fav => fav.id === this.data.id);

    if (exists) {
      this.favCrudService.removeFromFavorites(this.data);
      console.log('removeFromFavorites', this.data);
    } else {
      this.favCrudService.addToFavorites(this.data);
      console.log('addToFavorites', this.data);
    }
    this.updateHighlight();
  }

  private updateHighlight() {
    const favorites = this.favCrudService.getLocalStorageFavorites();
    const exists = favorites.some(fav => fav.id === this.data.id);
    this.elementRef.nativeElement.classList.toggle('highlight', exists);
  }
}
