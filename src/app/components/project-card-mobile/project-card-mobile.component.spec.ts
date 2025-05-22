import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCardMobileComponent } from './project-card-mobile.component';

describe('ProjectCardMobileComponent', () => {
  let component: ProjectCardMobileComponent;
  let fixture: ComponentFixture<ProjectCardMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCardMobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectCardMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
