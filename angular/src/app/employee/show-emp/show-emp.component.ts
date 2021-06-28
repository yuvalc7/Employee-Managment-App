import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css'],
})
export class ShowEmpComponent implements OnInit {
  constructor(private service: SharedService) {}

  EmployeesList: any = [];
  FilterEmployeesList: any = [];
  sortStates: any = [];
  searchTerm: string = '';
  ModalTitle: string = '';
  ActivateAddEditEmpComp: boolean = false;
  emp: any;

  ngOnInit(): void {
    this.refreshEmpList();
    setTimeout(() => {
      this.initSortStates();
    }, 1000);
  }

  sort(key: any, type: string) {
    let reverse = false;
    if (this.sortStates[key]) {
      reverse = true;
    }
    this.FilterEmployeesList.sort(function (a: any, b: any) {
      if (type == 'number') {
        return reverse ? b[key] - a[key] : a[key] - b[key];
      } else {
        return reverse
          ? a[key].toLowerCase() > b[key].toLowerCase()
            ? -1
            : 1
          : a[key].toLowerCase() > b[key].toLowerCase()
          ? 1
          : -1;
      }
    });
    this.sortStates[key] = !this.sortStates[key];
  }

  filterEmployee(event: any) {
    event = event.toLowerCase();
    this.FilterEmployeesList = this.EmployeesList.filter((employee: any) => {
      return (
        employee.full_name.toLowerCase().includes(event) ||
        employee.phone.toString().includes(event) ||
        employee.employee_type.toLowerCase().includes(event) ||
        employee.days_in_month.toString().includes(event) ||
        employee.start_date_work.toLowerCase().includes(event) ||
        employee.current_month_salary.toString().includes(event)
      );
    });
  }

  addClick() {
    this.emp = {
      id: 0,
      full_name: '',
      src_picture:this.service.PhotoUrl + "anonymous.png",
      phone: '',
      employee_type: '',
      start_date_work: '',
      days_in_month: '',
      current_month_salary: '',
      sex: '',
      email: '',
    };
    this.ModalTitle = 'Add Employee';
    this.ActivateAddEditEmpComp = true;
  }

  showEmployee(data: any) {
    console.log(data);
    
    this.emp = {
      id: -1,
      full_name: data.full_name,
      email: data.email,
      src_picture:data.src_picture,
      phone: data.phone,
      sex: data.sex,
      employee_type: data.employee_type,
      start_date_work: data.start_date_work,
      days_in_month: data.days_in_month,
      current_month_salary: data.employee_type == 'Junior' ? 5000 : data.employee_type == 'Senior' ? 7000 + (30*data.days_in_month) : 12000 + (50*data.days_in_month) ,
    };
    this.ModalTitle = 'Employee Details';
    this.ActivateAddEditEmpComp = true;
  }

  editClick(item: any) {
    this.emp = item;
    this.ModalTitle = 'Edit Employee';
    this.ActivateAddEditEmpComp = true;
  }

  deleteClick(item: any) {
    if (confirm('Are you sure??')) {
      this.service.deleteEmployee(item.id).subscribe((data) => {
        alert(data.toString());
        this.refreshEmpList();
      });
    }
  }

  closeClick() {
    this.ActivateAddEditEmpComp = false;
    this.refreshEmpList();
  }

  async refreshEmpList() {
    await this.service.getEmpList().subscribe((data) => {      
      this.EmployeesList = data;
      this.FilterEmployeesList = data;
    });
  }

  initSortStates() {
    let keys = Object.keys(this.FilterEmployeesList[0]);
    console.log(this.FilterEmployeesList);

    keys.forEach((key, index) => {
      if (
        index != 0 &&
        key != 'src_picture' &&
        key != 'sex' &&
        key != 'email'
      ) {
        this.sortStates[key] = false;
      }
    
    });
  }
}
