import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ToggleFavDirective } from './toggle-fav.directive';
import { FavCrudService } from '../services/fav-crud.service';
import { TvShow } from 'src/app/models/api-interface';
import { signal, WritableSignal } from '@angular/core';

// Test Host Component
@Component({
  template: `
    <div [appToggleFav]="testShow"></div>
  `,
  standalone: true,
  imports: [ToggleFavDirective]
})
class TestHostComponent {
  testShow: TvShow = { id: 1, name: 'Test Show' } as TvShow;
}

describe('ToggleFavDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let divElement: DebugElement;
  let mockFavCrudService: { 
    favDataSignal: WritableSignal<TvShow[]>, 
    addToFavorites: jasmine.Spy, 
    removeFromFavorites: jasmine.Spy 
  };
  let favoritesSignal: WritableSignal<TvShow[]>;

  const mockShow: TvShow = { id: 1, name: 'Test Show' } as TvShow;

  beforeEach(async () => {
    favoritesSignal = signal<TvShow[]>([]);
    
    mockFavCrudService = {
      favDataSignal: favoritesSignal,
      addToFavorites: jasmine.createSpy('addToFavorites'),
      removeFromFavorites: jasmine.createSpy('removeFromFavorites')
    };

    await TestBed.configureTestingModule({
      imports: [TestHostComponent, ToggleFavDirective],
      providers: [
        { provide: FavCrudService, useValue: mockFavCrudService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    divElement = fixture.debugElement.query(By.directive(ToggleFavDirective));
  });

  it('should not have "highlight" class initially if show is not in favorites', () => {
    favoritesSignal.set([]); // Empty favorites
    fixture.detectChanges(); // Triggers ngOnInit
    
    expect(divElement.nativeElement.classList.contains('highlight')).toBeFalse();
  });

  it('should have "highlight" class initially if show is already in favorites', () => {
    favoritesSignal.set([mockShow]); // Show is in favorites
    fixture.detectChanges(); // Triggers ngOnInit
    
    expect(divElement.nativeElement.classList.contains('highlight')).toBeTrue();
  });

  it('should add to favorites and add "highlight" class when clicked if not currently a favorite', () => {
    favoritesSignal.set([]);
    fixture.detectChanges();
    
    expect(divElement.nativeElement.classList.contains('highlight')).toBeFalse();

    divElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(mockFavCrudService.addToFavorites).toHaveBeenCalledWith(mockShow);
    expect(divElement.nativeElement.classList.contains('highlight')).toBeTrue();
  });

  it('should remove from favorites and remove "highlight" class when clicked if currently a favorite', () => {
    // Initial state: it is a favorite
    favoritesSignal.set([mockShow]);
    fixture.detectChanges(); 
    
    // Internal state of directive 'exists' should be true now
    expect(divElement.nativeElement.classList.contains('highlight')).toBeTrue();

    // Click to toggle
    divElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(mockFavCrudService.removeFromFavorites).toHaveBeenCalledWith(mockShow);
    expect(divElement.nativeElement.classList.contains('highlight')).toBeFalse();
  });
});
