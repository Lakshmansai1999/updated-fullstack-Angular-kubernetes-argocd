import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: any[] = [];

  employee = {
    name: '',
    email: ''
  };

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  saveEmployee() {
    this.employeeService.addEmployee(this.employee).subscribe({
      next: () => {

        this.employee = {
          name: '',
          email: ''
        };

        this.loadEmployees();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}