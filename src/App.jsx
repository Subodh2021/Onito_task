import React from 'react'
import './app.css'
import { Routes,Route } from 'react-router-dom'
import InputTable from "./InputTable";
import Admintable from './Admintable';

const App = () => {
  
  return (
    <div class="flex-container">
      <Routes>
        <Route index element={<InputTable />}></Route>
        <Route path="/admin" element={<Admintable />}></Route>
        <Route path="*" element={<InputTable />}></Route>
      </Routes> 
    
  </div>
  )
}

export default App


// const dataa=useSelector((state)=>state.todo.todoList)
// const  {register,formState:{errors},handleSubmit,reset,watch,getValues}=useForm({mode:'onTouched'});
// const password =[1,2,3,4,5];
// const newobj= {name:"subodh",surname:"Patil",num:"12345"}
// // password=watch("password","1233");
// const Submit=()=>{
// console.log(password.slice(2))
// }
// function getRndInteger(min, max) {
//      console.log(Math.floor(Math.random() * (max - min + 1) ) + min)
//   }
// <form onSubmit={handleSubmit(Submit)}>
//            <h2>Name</h2>
//               <input
//               placeholder='name'
//               {...register("name",{required:true})}/>
//               <p>{errors.name?.type === "required"  && "please enter name" }</p>
//               <h2>Email</h2>
//               <input 
//                placeholder='email'
//               {...register("email",
//               {required:true,
//                pattern:/^[a-zA-Z0-9]+\@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,3}$/i})}
//               />
//               <p>{errors.email?.type === "required" && "email cannot be empty"}</p>
//               <p>{errors.email?.type === "pattern" && "pattern is wrong"}</p>
//               <h2>Password</h2>
//               <input 
//                 placeholder=' password'
//                 {...register("password",
//                 {required:"true",
//                pattern:/^[a-zA-Z0-9]+\@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,3}$/i})}
                
//               />
//               <p>{errors.password?.type === "reuired" && "password is missing" }</p>
//               <h2>Confirm Password</h2>
//               <input 
//                 placeholder='confirm password'
//                 {...register("cpassword",
//                 {required:"true",
//                 validate:(value)=>value === getValues("password")})}
//               />
//               <p>{errors.cpassword?.type === "validate" && "password does not match" }</p>
//               <input type='submit'/>
//        </form>