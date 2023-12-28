import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupFormComponent } from './signup-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupFormComponent],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input Element Testing', () => {
    it('should have a element with class --username', () => {
      const el = fixture.debugElement.query(By.css('.--username'));
      expect(el).toBeTruthy();
    });
    it('should have a label with class --username for the username field', () => {
      const el = fixture.debugElement.query(By.css('.--username label'));
      expect(el).toBeTruthy();
      expect(el.nativeElement.getAttribute('for')).toEqual('username');
      expect(el.attributes['for']).toEqual('username');
    });
    it('should display Username on the label for the username field', () => {
      const el = fixture.debugElement.query(By.css('.--username label'));
      expect(el).toBeTruthy();
      expect(el.nativeElement.innerText).toEqual('Username');
    });

    it('should have a input element with class ctrl for the username field', () => {
      const el = fixture.debugElement.query(By.css('.--username input.ctrl'));
      expect(el).toBeTruthy();
      expect(el.attributes['type']).toEqual('text');
      expect(el.attributes['id']).toEqual('username');
      expect(el.attributes['name']).toEqual('username');
      expect(el.attributes['autocomplete']).toEqual('off');
    });
  });

  describe('Form Binding', () => {
    it('should bind the username to its FormConrol', () => {
      const el = fixture.debugElement.query(By.css('.--username .ctrl'));
      const ctrl = component.registerForm.get('username')!;

      const name = 'jay patel';
      ctrl.setValue(name);
      fixture.detectChanges();

      expect((el.nativeElement as HTMLInputElement).value).toEqual(name);
    });

    it('should mark username as invalid when it has no value', () => {
      const ctrl = component.registerForm.get('username');

      ctrl?.setValue(null);
      fixture.detectChanges();

      expect(ctrl?.invalid).toBeTrue();
    });
    it('should mark username as valie when it has value', () => {
      const ctrl = component.registerForm.get('username');

      ctrl?.setValue('Jay Patel');
      fixture.detectChanges();

      expect(ctrl?.valid).toBeTrue();
    });
    it('should mark username as invalid when its value is longer then 10 characters', () => {
      const ctrl = component.registerForm.get('username');

      ctrl?.setValue('Jay Patel simform');
      fixture.detectChanges();

      expect(ctrl?.invalid).toBeTrue();
    });
    it('should mark username as valid when its value is less then 10 characters', () => {
      const ctrl = component.registerForm.get('username');

      ctrl?.setValue('Jay Patel');
      fixture.detectChanges();

      expect(ctrl?.valid).toBeTrue();
    });
  });

  describe('Select Element Testing', () => {
    it('shoule have a ctrl-row element with class --team', () => {
      const el = fixture.debugElement.query(By.css('.ctrl-row.--team'));
      expect(el).toBeTruthy();
    });

    it('should have a label with class ctrl-label for the team field', () => {
      const el = fixture.debugElement.query(By.css('.--team label'));
      expect(el).toBeTruthy();
      expect(el.attributes['for']).toEqual('team');
    });

    it('should render correct number of team options', () => {
      const teamList = [
        { id: 1, name: 'team 1' },
        { id: 2, name: 'team 2' },
        { id: 3, name: 'team 3' },
      ];
      component.teamList = teamList;
      fixture.detectChanges();

      const optionEl = fixture.debugElement.queryAll(By.css('.--team option'));
      expect(optionEl.length).toBe(teamList.length + 1);
    });

    it('should display correct text on the dropdown options', () => {
      const teamList = [
        { id: 1, name: 'team 1' },
        { id: 2, name: 'team 2' },
        { id: 3, name: 'team 3' },
      ];
      component.teamList = teamList;
      fixture.detectChanges();

      const optionEl = fixture.debugElement.queryAll(By.css('.--team option'));
      optionEl.forEach((option, index) => {
        if (index != 0) {
          expect(
            (option.nativeElement as HTMLOptionElement).innerText.trim()
          ).toEqual(teamList[index - 1]['name']);
        }
      });
    });
  });
});
