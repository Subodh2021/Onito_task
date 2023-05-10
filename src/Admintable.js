import React, { useEffect, useState } from 'react'
import "./Admintable.css"
import axios from 'axios';

const Admintable = () => {
  useEffect(() => {
    Funct3();
  }, [])

  const [dataa, setDataa] = useState([]);
  const [rows, setRows] = useState(25);
  const row = [25,10,15,5,4,3,2,1];

  const Funct = (data) => {

    return  data.map((ele) => {
      return (<option>{ele} rows</option>)
    })
  }

  function listEmployees(search_keyword){
    
    let api_url=`http://localhost:4000/users`;
    if (search_keyword) {
      api_url = api_url+"?keyword="+search_keyword
      console.log(search_keyword)
    }
    return axios.get(api_url);
  
}

  const Funct2 = () => {
    return dataa.slice(0,rows)?.map((ele) => {
      return (
        <tr>
          <td>{ele?.patientId}</td>
          <td>{ele?.fullName}</td>
          <td>{ele?.age}/{ele?.gender?.[0]}</td>
          <td>{ele?.emergency}</td>
          <td>{ele?.address + " " + ele?.pincode + " " + ele?.city + " " + ele?.state + " " + ele?.country}</td>
          <td>{ele?.govtId}</td>
          <td><i>{ele?.guardian +"  "}{ }</i>{ele?.guardianName}</td>
          <td>{ele?.country}</td>
        </tr>)
    })
  }



  const Funct3 = async (search_keyword) => {
    await listEmployees(search_keyword)
      .then((res) => setDataa(res.data))
      .catch((err) => console.log(err, "error"))
  }

  return (
    <div class="flex-container pt-3 pl-3 mt-3 ">
      <div>Show <select class="ml-2 mr-1 mb-2 " onChange={(e) => { setRows(parseInt(e.target.value)); console.log(isNaN(e.target.value), "----") }}> {Funct(row)}</select>Entries <button class="mr-2 buttone">Excel</button><button class="buttone">Print</button> <a class="float-end">Search :<input class="ml-1"  onChange={(e) => Funct3(e.target.value)} /></a> </div>
      <table class="table table-striped tablee text-center">
        <thread >
          <tr class="border-2 thrr" >
            <th class="col-sm-1" >Patient Id</th>
            <th class="col-sm-1">Name</th>
            <th class="col-sm-1">Age/Sex</th>
            <th class="col-sm-1">Mobile</th>
            <th class="col-sm-3">Address</th>
            <th class="col-sm-1">Govt. Id</th>
            <th class="col-sm-1">Gaurdian Details</th>
            <th class="col-sm-1">Nationality</th>
          </tr>
          <tbody>
            {console.log(isNaN(rows), "----")}
            {Funct2()}
          </tbody>
        </thread>
        <tbody>

        </tbody>
      </table>
    </div>
  )
}

export default Admintable