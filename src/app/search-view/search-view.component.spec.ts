import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchViewComponent } from './search-view.component';
import { ApiService } from '../api/services/api.service';
import { Component, Input, signal, WritableSignal } from '@angular/core';
import { TvShow } from '../models/api-interface';
import { By } from '@angular/platform-browser';
import { TvShowTableComponent } from '../tv-show-table/tv-show-table.component';

// Mock Child Component (Standalone)
@Component({
  selector: 'app-tv-show-table',
  template: '<div>Mock Table</div>',
  standalone: true
})
class MockTvShowTableComponent {
  @Input() searchData: any;
  @Input() isLoading: any;
}

describe('SearchViewComponent', () => {
  let component: SearchViewComponent;
  let fixture: ComponentFixture<SearchViewComponent>;
  let mockApiService: { 
    getTvShows: jasmine.Spy, 
    isLoading: WritableSignal<boolean> 
  };
  let searchDataSignalSpy: WritableSignal<TvShow[]>;

  beforeEach(async () => {
    // Setup Mock Service
    searchDataSignalSpy = signal<TvShow[]>([]);
    mockApiService = {
      getTvShows: jasmine.createSpy('getTvShows').and.returnValue(searchDataSignalSpy),
      isLoading: signal<boolean>(false)
    };

    await TestBed.configureTestingModule({
      imports: [SearchViewComponent],
      providers: [
        { provide: ApiService, useValue: mockApiService }
      ]
    })
    .overrideComponent(SearchViewComponent, {
      remove: { imports: [ TvShowTableComponent ] },
      add: { imports: [MockTvShowTableComponent] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should call getTvShows with empty string on init', () => {
      // Called in constructor
      expect(mockApiService.getTvShows).toHaveBeenCalledWith('');
    });

    it('should initialize isLoading from service', () => {
      expect((component as any).isLoading).toBe(mockApiService.isLoading);
    });
  });

  describe('Interactions', () => {
    it('should call getTvShows with search term when onClickHandler is called', () => {
      const searchTerm = 'Stargate';
      component.onClickHandler(searchTerm);
      
      expect(mockApiService.getTvShows).toHaveBeenCalledWith(searchTerm);
    });

    it('should prevent default on event if provided', () => {
      const mockEvent = jasmine.createSpyObj('Event', ['preventDefault']);
      component.onClickHandler('test', mockEvent);
      
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('should update searchData signal when api returns new signal', () => {
        const newSignal = signal<TvShow[]>([{ id: 1, name: 'New Show' } as TvShow]);
        mockApiService.getTvShows.and.returnValue(newSignal);
        
        component.onClickHandler('new search');
        
        // Access the protected property to verify it was updated
        expect((component as any).searchData).toBe(newSignal);
    });
  });

  describe('Child Component Integration', () => {
    it('should pass correct signals to app-tv-show-table', () => {
        const tableDebugEl = fixture.debugElement.query(By.directive(MockTvShowTableComponent));
        expect(tableDebugEl).toBeTruthy('Child table component should be present');
        
        const tableInstance = tableDebugEl.componentInstance as MockTvShowTableComponent;
        
        // Verify inputs receive the signals
        expect(tableInstance.searchData).toBe(searchDataSignalSpy);
        expect(tableInstance.isLoading).toBe(mockApiService.isLoading);
    });
  });
});
