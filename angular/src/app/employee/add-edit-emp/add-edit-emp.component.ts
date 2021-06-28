import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css'],
})
export class AddEditEmpComponent implements OnInit {
  constructor(private service: SharedService) {}

  validateField: any = [];
  @Input() emp: any;
  id: string = '';
  full_name: string = '';
  src_picture: string = '';
  PhotoFileName: string = '';
  phone: string = '';
  employee_type: string = '';
  start_date_work: string = '';
  days_in_month: string = '';
  photoFilePath: string = '';
  current_month_salary: string = '';
  email: string = '';
  sex: string = '';

  ngOnInit(): void {
    this.id = this.emp.id;
    this.full_name = this.emp.full_name;
    this.email = this.emp.email;
    this.sex = this.emp.sex;
    this.src_picture = this.emp.picture;
    this.phone = this.emp.phone;
    this.employee_type = this.emp.employee_type;
    this.start_date_work = this.emp.start_date_work;
    this.days_in_month = this.emp.days_in_month;
    this.current_month_salary = this.emp.current_month_salary;
    this.initValidateArray();
  }

  initValidateArray() {
    this.validateField['full_name'] = true;
    this.validateField['phone'] = true;
    this.validateField['days_in_month'] = true;
    this.validateField['sex'] = true;
    this.validateField['employee_type'] = true;
    this.validateField['email'] = true;
    this.validateField['start_date_work'] = true;
  }

  addEmployee() {
    if (this.validateForm()) {
      var val = {
        id: this.id,
        full_name: this.full_name,
        //src_picture: this.service.PhotoUrl + this.src_picture,
        src_picture: this.src_picture,
        phone: this.phone,
        employee_type: this.employee_type,
        start_date_work: this.start_date_work,
        days_in_month: this.days_in_month,
        current_month_salary: this.current_month_salary,
        email: this.email,
        sex: this.sex,
      };
      this.service.addEmployee(val).subscribe((res) => {
        alert(res.toString());
      });
    }
  }

  updateEmployee() {
    if (this.validateField) {
      var val = {
        id: this.id,
        full_name: this.full_name,
//        src_picture: this.src_picture.includes(this.service.PhotoUrl) ? this.src_picture : this.service.PhotoUrl+this.src_picture,
src_picture:this.src_picture,
  
phone: this.phone,
        employee_type: this.employee_type,
        start_date_work: this.start_date_work,
        days_in_month: this.days_in_month,
        current_month_salary: this.current_month_salary,
        sex: this.sex,
        email: this.email,
      };
      this.service.updateEmployee(val).subscribe((res) => {
        alert(res.toString());
      });
    }
  }

  validateForm() {
    this.validateField['full_name'] = this.numberOrletterOnly(
      this.full_name.replace(/ /g, ''),
      /^[A-Za-z]+$/
    );
    this.validateField['phone'] = this.numberOrletterOnly(this.phone, /^\d+$/);
    this.validateField['days_in_month'] = this.numberOrletterOnly(
      this.days_in_month,
      /^\d+$/
    );
    this.validateField['sex'] = this.sex != '';
    this.validateField['employee_type'] = this.employee_type != '';
    this.validateField['email'] = this.validateEmail(this.email);
    this.validateField['start_date_work'] = this.start_date_work != '';

    let values = Object.values(this.validateField);
    return values.filter((el: any) => el == false).length == 0;
  }
  numberOrletterOnly(fieldCheck: string, letters: any) {
    if (fieldCheck.match(letters)) {
      return true;
    } else {
      return false;
    }
  }
  validateEmail(email: any) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  uploadPhoto(event: any) {
    var file = event.target.files[0];

    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.service.UploadPhoto(formData).subscribe((data: any) => {
      let fileName = data.toString();
      this.src_picture = this.service.PhotoUrl + fileName;
    });
  }
}
