import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentComponent } from './student.component';
import { StudentService } from './student.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('StudentComponent', () => {
  let component: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentComponent],
      imports: [HttpClientTestingModule],
      providers: [StudentService],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('spy on method', () => {
    spyOn(component, 'calculate');
    component.saveData();
    expect(component.calculate).toHaveBeenCalledTimes(1);
  });
  it('spy on method - 1', () => {
    spyOn(component, 'calculate').and.returnValue(30);
    let result = component.studentResult();
    expect(result).toBe('Fail');
  });
  it('spy on method - API', () => {
    let service = fixture.debugElement.injector.get(StudentService);
    spyOn(service, 'saveDetails').and.callFake(() => {
      return of({
        result: 200,
      });
    });
    component.saveData();
    expect(component.result).toEqual({
      result: 200,
    });
  });
});
