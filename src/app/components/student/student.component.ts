import { Component } from '@angular/core';
import { StudentService } from './student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent {
  sum: number = 0;
  result: any;
  constructor(private service: StudentService) {}
  calculate(num1: number, num2: number) {
    this.sum = num1 + num2;
    return this.sum;
  }

  saveData() {
    let info = {
      sumVal: this.calculate(5, 5),
      name: 'Mean Stack Dept',
    };
    this.saveDataInToConsole(info);
    this.service.saveDetails(info).subscribe((response) => {
      this.result = response;
    });
  }

  studentResult() {
    if (this.calculate(10, 20) >= 40) {
      return 'Pass';
    } else {
      return 'Fail';
    }
  }
  saveDataInToConsole(info: any) {
    console.log(info);
  }
}
