import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TvShowTableComponent } from './tv-show-table.component';
import { Directive, Input, signal, WritableSignal } from '@angular/core';
import { TvShow } from '../models/api-interface';
import { By } from '@angular/platform-browser';
import { ToggleFavDirective } from '../favorites-view/directives/toggle-fav.directive';

// Mock the directive to avoid dependency on FavCrudService
@Directive({
  selector: '[appToggleFav]',
  standalone: true
})
class MockToggleFavDirective {
  @Input('appToggleFav') data!: TvShow;
}

describe('TvShowTableComponent', () => {
  let component: TvShowTableComponent;
  let fixture: ComponentFixture<TvShowTableComponent>;
  let searchDataSignal: WritableSignal<TvShow[]>;
  let isLoadingSignal: WritableSignal<boolean>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvShowTableComponent], // Import the component to test
    })
    .overrideComponent(TvShowTableComponent, {
      remove: { imports: [ToggleFavDirective] },
      add: { imports: [MockToggleFavDirective] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvShowTableComponent);
    component = fixture.componentInstance;
    
    // Initialize required signals
    searchDataSignal = signal<TvShow[]>([]);
    isLoadingSignal = signal<boolean>(false);
    component.searchData = searchDataSignal;
    component.isLoading = isLoadingSignal;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show spinner when loading', () => {
    isLoadingSignal.set(true);
    fixture.detectChanges();
    
    const spinner = fixture.debugElement.query(By.css('.spin-wrapper'));
    expect(spinner).toBeTruthy();
    
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(0);
  });

  it('should show table rows when data is present and not loading', () => {
    const mockData: TvShow[] = [
      { id: 1, name: 'Show 1', country: 'US', start_date: '2020-01-01', status: 'Running', network: 'NBC', permalink: 'show-1', image_thumbnail_path: '', end_date: null },
      { id: 2, name: 'Show 2', country: 'UK', start_date: '2021-01-01', status: 'Ended', network: 'BBC', permalink: 'show-2', image_thumbnail_path: '', end_date: null }
    ];
    
    isLoadingSignal.set(false);
    searchDataSignal.set(mockData);
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('.spin-wrapper'));
    expect(spinner).toBeFalsy();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(2);

    expect(rows[0].nativeElement.textContent).toContain('Show 1');
    expect(rows[1].nativeElement.textContent).toContain('Show 2');
  });

  it('should show empty table when no data', () => {
    isLoadingSignal.set(false);
    searchDataSignal.set([]);
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(0);
  });
});
