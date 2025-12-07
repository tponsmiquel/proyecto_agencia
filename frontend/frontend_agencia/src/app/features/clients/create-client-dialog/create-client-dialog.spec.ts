import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClientDialog } from './create-client-dialog';

describe('CreateClientDialog', () => {
  let component: CreateClientDialog;
  let fixture: ComponentFixture<CreateClientDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateClientDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateClientDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
