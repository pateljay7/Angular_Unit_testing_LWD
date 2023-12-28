import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent {
  constructor(private fb: FormBuilder) {}
  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.maxLength(10)]],
    password: [null, [Validators.required]],
    gender: ['M'],
    email: [null, [Validators.required, Validators.email]],
    team: [null || 0, [Validators.required]],
    subscription: [true],
  });
  teamList: { id: number; name: string }[] = [
    { id: 1, name: 'Red Team' },
    { id: 2, name: 'Yellow Team' },
    { id: 3, name: 'Blue Team' },
    { id: 4, name: 'Black Team' },
  ];
  isFormValid(): boolean {
    return this.registerForm.valid;
  }

  submitForm(): void {
    if (!this.isFormValid()) {
      window.alert('Please fill all the fields before submitting the form!');
    }
    const body = this.registerForm.value;
    const msg = `
    Your Registration Information:

    Username: ${body.username}
    Password: *******
    Email: ${body.email}
    Gender: ${body.gender === 'M' ? 'Male' : 'Female'}
    Team: ${this.teamList.find((team) => team.id === body.team!)?.name}
    Subscription: ${body.subscription ? 'Yes' : 'NO'}
    `;
    window.confirm(msg);
  }
}
