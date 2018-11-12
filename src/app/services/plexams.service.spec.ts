import { TestBed } from '@angular/core/testing';

import { PlexamsService } from './plexams.service';

describe('PlexamsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlexamsService = TestBed.get(PlexamsService);
    expect(service).toBeTruthy();
  });
});
