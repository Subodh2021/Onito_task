import axios from 'axios'
import "./InputTable.css"
import {useForm} from "react-hook-form"
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup"
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';

const schema = yup
  .object().shape({
    fullName: yup.string().required("Name is required").matches(/^[a-zA-Z]/,"Enter your valid name(alphabets)"),
    age:yup.string().required("this field is required ").test('len','please enter valid age or date', (val)=> (val.toString().length <= 2 && !isNaN(val) && val >0 ) || moment(val,'DD/MM/YYYY',true).isValid()),
    gender:yup.string().required("Please Choose the gender"),
    mobile:yup.string().test('len','please enter valid mobile number(10 digit and start with 9,8,7 )',(val)=> (val.length == 0 || val.length == 10 && val?.[0]> 6 )),
    gender:yup.string().required("Please Choose the gender"),
    govtId:yup.string(),
    emergency:yup.string().test('len','please enter valid mobile number',(val)=> (val.length == 0 ||val.length == 10 && val?.[0]> 6 )),
     govtIdNumber:yup.string().when("govtId", (val)=>{
      if(val == "Aadhar Card")
      {
        return yup.string().required("Aadhar card is required").length(12,"length should be 12 of Aadhar Card ").matches(/^[0-9]/,"patern Does not match")
      }
      else if(val == "Pan Card")
      {
        return yup.string().required(" Pan Card is required").length(10,"length should be 10 of Pan Card").matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}/,"Patern Does not match(ABCDE1234Z)")
      } 
      else 
      {
        return yup.string()
      }                           
 } ),
 pincode:yup.string().test('len','please enter valid pincode',(val)=> (val.length == 0 || val.length == 6 )),
      guardian:yup.string(),
      guardianName:yup.string().when("guardian",(val)=>{
        if(val != ""){
          return yup.string().required("Guardian Name is required")
        }
        else return yup.string()
      })
        })
        .required();




const InputTable = () => {
  
const navigate = useNavigate();
const {register,handleSubmit,formState:{errors},reset}=useForm({resolver:yupResolver(schema)});

const gender=["","Male","Female","Others"];
const idType=["","Aadhar Card","Pan Card"];
const gaurdian=["","Father","Mother"];
const religion=["","Hindu","Sikh","Christian","Muslim"];
const maritalStatus=["","Single","Married","Divorced"];
const bloodGroup=["","O+","A+","B+","AB+","O-","A-","B-","AB-"];
const state =["","AP","UP","MP"];
const city = ["","Ayodhya","Indore","Kanpur","Bhopal"] 




  const Funct=(data)=>{
    return (<option  disabled>hello</option> && data.map((ele)=>{
    return(<option value={ele}>{ele}</option>)
  }))
 }

  const Submit=(data)=>{
    if(data.age.length > 2)
    {
       data.age = moment().diff(data.age,'years');
    }
  axios.post('http://localhost:4000/users/register',data)
 .then((res)=>{alert(res.data.message);reset()})
 .catch((err)=>console.log(err))
  

  }
  return (
    <div>
      <div class="flex-container p-4 border-5">
         <h1>Task</h1>
         <form onSubmit={handleSubmit(Submit)} >
            <table class="table" >
               <tbody class="">
                  <th colSpan={2}  class="text-decoration-underline fs-5">Personal Detail</th>
                      <tr class="text-start ">
                        <td class="col-md-5 ">Name<span className='ast'>*</span><input class="col-sm-10 ml-4" placeholder='Enter Name' {...register("fullName")}/>{errors.fullName && (<span className="error pl-5 ml-4 ">{errors.fullName?.message}</span>)}</td>
                        <td class="col-sm-1 pr-0">Date of Birth or Age<span className='ast'>*</span></td>
                        <td class="col-md-3  text-center"><input class="col-sm-11 ml-1" placeholder='DD/MM/YYYY or Age in Years' {...register("age")}/>{errors.age && <div className='error ml-3  text-start'>{errors.age?.message} </div>}</td>
                        <td class="col-md-3  ">Sex<span className='ast'>*</span><select class="col-sm-9 ml-4" placeholder='Enter Sex' {...register("gender")}>{Funct(gender)}</select>{errors.gender && <div className='error ml-5 pl-2'>{errors.gender?.message} </div>}</td>
                      </tr>
                      <tr>
                        <td>Mobile <input class="col-8 ml-4" {...register("mobile")} placeholder='Enter Mobile'/>{errors?.mobile && <div class='error ml-5 pl-4 '>{errors.mobile?.message} </div>}</td>
                        <td class="pr-0">Govt. issued Id</td>
                        <td colSpan={2}><select class="col-sm-3 ml-3" placeholder='Id Type' {...register("govtId")}>{Funct(idType)}</select><input class="col-sm-8 ml-3" placeholder='Enter Govt. Id' {...register("govtIdNumber")}/>{errors.govtIdNumber && <div class='error ml-3'>{errors.govtIdNumber?.message} </div>}</td>
                      </tr>
                        <th colSpan={2}  class="text-decoration-underline fs-5" >Personal Detail</th>
                      <tr>
                        <td>Gaurdians Details<select class="col-sm-3 ml-4 " placeholder='Enter Label' {...register("guardian")}>{Funct(gaurdian)}</select><input class="col-sm-5 ml-3 " placeholder='Enter Gaurdian Name' {...register("guardianName")}/>{errors?.guardianName && <div className='error ml-3  text-end mr-5 pr-4'>{errors.guardianName?.message} </div>}</td>
                        <td colSpan={3} >Email <input class="col-sm-4 ml-1 mr-2"  placeholder='Enter Email' {...register("email")}/>Emergency Contact No. <input class="col-sm-4" placeholder='Enter Emergency No.' {...register("emergency")}/>{errors?.emergency && <div className='error ml-3  text-end mr-5 pr-4'>{errors.emergency?.message} </div>}</td>
                      </tr>
                        <th colSpan={2}  class="text-decoration-underline fs-5">Address Details</th>
                      <tr>
                        <td>Address <input class="col-sm-10 ml-3" placeholder='Enter Address' {...register("address")}/></td>
                        <td colSpan={3} >State <select class="col-sm-4 ml-4 mr-4" placeholder='Enter State' {...register("state")}>{Funct(state)}</select> City <select class="col-sm-5 ml-4 " placeholder='Enter City/Town/Village' {...register("city")} >{Funct(city)}</select></td>
                    </tr>
                    <tr>
                        <td>Country <input class="col-sm-8 ml-3" type="search" {...register("country")}/></td>
                        <td colSpan={2} >Pincode<input class="col-sm-6 ml-4" placeholder='Enter Pincode' {...register("pincode")}/>{errors?.pincode && <div class='error ml-5 pl-5 '>{errors.pincode?.message}</div>}</td>
                    </tr>
                        <th colSpan={2}  class="text-decoration-underline fs-5">Other Details</th>
                    <tr>
                        <td colSpan={6}>Occupation<input class="col-2 ml-2 mr-2" placeholder='Enter Occupation' {...register("occupation")}/><a>Religion</a><select class="col-2 mr-2 ml-4" placeholder='Enter Religion' {...register("religion")}>{Funct(religion)}</select><a>Marital Status</a><select class="col-2 mr-2 ml-4" placeholder='Enter Marital Status' {...register("maritalStatus")}>{Funct(maritalStatus)}</select><a>Blood Group</a><select class="col-1 mr-3 ml-3" placeholder='Group' {...register("bloodGroup")}>{Funct(bloodGroup)}</select></td>
                    </tr>
                    <tr>
                        <td>Nationality<input type='search' class="col-5 ml-2" {...register("nationality")}/></td>
                    </tr>
                      <tr>
                        <td colSpan={6} class="text-end"><button onClick={()=>navigate('/admin')} class="btn butto btn-success text-center ml-2  mr-3 pr-3 float-end ">Admin Table</button><button type='button' onClick={()=>reset()} class="btn butto btn-outline-danger mr-3 pr-5 pb-3 pl-5">Cancel<div className='buttontext '>(ESC)</div></button><button type='submit' class="btn butto btn-success mr-3 pr-5 pb-3 pl-5">Submit<div className='buttontext'>(⌘ S)</div></button></td>
                      </tr>
          </tbody>
      </table>
      </form>
      
      </div>
    </div>
  )
}

export default InputTable;


