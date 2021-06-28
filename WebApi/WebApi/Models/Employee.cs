using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class Employee
    {

        public int id { get; set; }
        public string src_picture { get; set; }
        public string employee_type { get; set; }
        public string full_name { get; set; }
        public string phone { get; set; }
        public string start_date_work { get; set; }
        public string days_in_month { get; set; }
        public string current_month_salary { get; set; }

        public string email { get; set; }
        public string sex { get; set; }

    }
}
