using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using WebApi .Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public EmployeeController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;

        }

        //api method to get Employees details
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select id,full_name ,employee_type,
            src_picture, phone, convert(varchar(10), start_date_work, 120) as start_date_work,
            days_in_month, current_month_salary, email, sex
            from Employee";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                try { 
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                }
                }
                finally
                {
                  myCon.Close();

                }
            }
            return new JsonResult(table);

        }

        [HttpPost]

        public JsonResult Post(Employee emp)
        {

            string query = @"
                insert into Employee 
                (full_name ,employee_type, src_picture, phone, start_date_work, days_in_month, current_month_salary,email,sex)
                values
                (
                '" + emp.full_name + @"' 
                ,'" + emp.employee_type + @"'                 
                ,'" + emp.src_picture + @"'         
                ,'" + emp.phone + @"' 
                ,'" + emp.start_date_work + @"' 
                ,'" + emp.days_in_month + @"' 
                ,'" + emp.current_month_salary + @"' 
                ,'" + emp.email + @"' 
                ,'" + emp.sex + @"' 
                )
                ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added successfully");
        }


        [HttpPut]

        public JsonResult Put(Employee emp)
        {
            string query = @"
                update Employee set
                 full_name = '" + emp.full_name + @"' 
                 ,employee_type = '" + emp.employee_type + @"'                 
                 ,src_picture = '" + emp.src_picture + @"'         
                 ,phone = '" + emp.phone + @"' 
                  ,start_date_work ='" + emp.start_date_work + @"' 
                  ,days_in_month = '" + emp.days_in_month + @"' 
                  ,current_month_salary ='" + emp.current_month_salary + @"' 
                    ,email ='" + emp.email + @"'
                    ,sex ='" + emp.sex + @"'
                   where id = " + emp.id + @" 
                    ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Update successfully");
        }

        [HttpDelete("{id}")]

        public JsonResult Delete(int id)
        {
            string query = @"
                delete from Employee
                where id = " + id + @"
                ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("deleted successfully");
        }


        [Route("SaveFile")]
        [HttpPost]

        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {

                return new JsonResult("anonymous.png");
            }
        }

    }
}
