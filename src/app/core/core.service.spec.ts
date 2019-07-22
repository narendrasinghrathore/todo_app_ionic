import { TestBed } from '@angular/core/testing';

import { CoreService } from './core.service';
import { CoreModule } from './core.module';

describe('CoreService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [CoreModule],
        providers: [CoreService]
    }));

    it('should be created', () => {
        const service: CoreService = TestBed.get(CoreService);
        expect(service).toBeTruthy();
    });

    it('should create toast', () => {
        const service: CoreService = TestBed.get(CoreService);
        service.displayToast('Hello');
        const div: HTMLDivElement = document.querySelector('div.toast-container');
        const indexOf = div.textContent.search(/Hello/gi);
        expect(indexOf).toBeGreaterThan(-1);
    });
});
