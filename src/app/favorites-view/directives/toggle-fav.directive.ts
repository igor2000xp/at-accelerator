import { Directive, ElementRef, HostListener, inject, Input, OnInit, Renderer2, signal, Signal } from '@angular/core';
import { FavCrudService } from '../services/fav-crud.service';
import { TvShow } from 'src/app/models/api-interface';

@Directive({
  selector: '[appToggleFav]',
  standalone: true,
})
export class ToggleFavDirective implements OnInit {
  @Input('appToggleFav') data!: TvShow;
  private favCrudService = inject(FavCrudService);
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);
  private favorites: Signal<TvShow[]> = signal<TvShow[]>([]);
  private exists = false;

  ngOnInit() {
    this.favorites = this.favCrudService.getLocalStorageFavorites();
    this.exists = this.favorites().some(fav => fav.id === this.data.id);
    this.updateHighlight();
  }

  @HostListener('click')
  toggleFav() {
    if (this.exists) {
      this.favCrudService.removeFromFavorites(this.data);
    } else {
      this.favCrudService.addToFavorites(this.data);
    }
    this.exists = !this.exists;
    this.updateHighlight();
  }

  private updateHighlight() {
    this.favCrudService.getLocalStorageFavorites();
    if (this.exists) {
      this.renderer.addClass(this.elementRef.nativeElement, 'highlight');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'highlight');
    }
    // this is the original way to toggle the highlight but it's not safe
    // because it's not controlled by the Angular

    // this.elementRef.nativeElement.classList.toggle('highlight', exists);
  }
}
