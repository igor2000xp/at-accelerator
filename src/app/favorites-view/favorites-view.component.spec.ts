import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesViewComponent } from './favorites-view.component';
import { FavCrudService } from './services/fav-crud.service';
import { signal, WritableSignal, Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TvShow } from '../models/api-interface';

// Mock Child Component to avoid dependencies and test inputs
@Component({
  selector: 'app-tv-show-table',
  template: '<div>Mock Table</div>',
  standalone: true // Use standalone if the real one isn't, but here we can make the mock standalone for easier testing or declare it
})
class MockTvShowTableComponent {
  @Input() searchData: any;
  @Input() isLoading: any;
}

describe('FavoritesViewComponent', () => {
  let component: FavoritesViewComponent;
  let fixture: ComponentFixture<FavoritesViewComponent>;
  let mockFavCrudService: { favDataSignal: WritableSignal<TvShow[]>; emptyFavorites: jasmine.Spy };
  let favDataSignalSpy: WritableSignal<TvShow[]>;

  beforeEach(async () => {
    // Setup Mock Service with Signals
    favDataSignalSpy = signal<TvShow[]>([]);
    mockFavCrudService = {
      favDataSignal: favDataSignalSpy,
      emptyFavorites: jasmine.createSpy('emptyFavorites')
    };

    await TestBed.configureTestingModule({
      declarations: [FavoritesViewComponent],
      imports: [MockTvShowTableComponent], // Import standalone mock or declare if not standalone. Let's assume declarations for safety if not standalone context.
      providers: [
        { provide: FavCrudService, useValue: mockFavCrudService }
      ]
    })
    // Note: If FavoritesViewComponent is NOT standalone (it has module comments in snippet), 
    // we must declare it. If Mock is standalone, we import it. 
    // If Mock is not standalone, we declare it.
    // To be safe and avoid "standalone" confusion without seeing module file:
    // I will use a schema or just declare the mock.
    .overrideComponent(FavoritesViewComponent, {
        add: { imports: [MockTvShowTableComponent] } 
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should initialize favData from service', () => {
      // Access protected property via type casting or just verify via child input
      expect((component as any).favData).toBe(favDataSignalSpy);
    });

    it('should initialize isLoading as false', () => {
      expect((component as any).isLoading()).toBeFalse();
    });
  });

  describe('User Interactions', () => {
    it('should call emptyFavorites service method when "Clean Favorites" button is clicked', () => {
      const button = fixture.debugElement.query(By.css('button.primary'));
      
      expect(button).toBeTruthy('Clean Favorites button should exist');
      
      button.nativeElement.click();
      
      expect(mockFavCrudService.emptyFavorites).toHaveBeenCalled();
    });
  });

  describe('Child Component Integration', () => {
    it('should pass correct signals to app-tv-show-table', () => {
        const tableDebugEl = fixture.debugElement.query(By.directive(MockTvShowTableComponent));
        expect(tableDebugEl).toBeTruthy('Child table component should be present');
        
        const tableInstance = tableDebugEl.componentInstance as MockTvShowTableComponent;
        
        // Verify inputs receive the signals
        expect(tableInstance.searchData).toBe(favDataSignalSpy);
        // Compare the signal value for isLoading
        expect(typeof tableInstance.isLoading).toBe('function'); 
        expect(tableInstance.isLoading()).toBeFalse();
    });

    it('should update child component when service signal updates', () => {
        const mockShow: TvShow = { id: 1, name: 'Test Show' } as TvShow;
        favDataSignalSpy.set([mockShow]);
        fixture.detectChanges();

        const tableDebugEl = fixture.debugElement.query(By.directive(MockTvShowTableComponent));
        const tableInstance = tableDebugEl.componentInstance as MockTvShowTableComponent;

        // The input reference remains the same signal, but its value changes
        expect(tableInstance.searchData()).toEqual([mockShow]);
    });
  });
});
