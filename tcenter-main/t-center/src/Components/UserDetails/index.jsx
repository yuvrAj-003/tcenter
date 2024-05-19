import React from 'react'

function UserDetails({name, email, role}) {
  return (
    <div className="top ">
        <div className=" bg-yellow-400 py-5 rounded-xl shadow-md">
            {/* image  */}
            <div className="flex justify-center">
                <img src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" alt="" />
            </div>
            {/* text  */}
            <div className="">
                <h1 className=" text-center text-lg"><span className=" font-bold">Name :</span> {name} </h1>
                <h1 className=" text-center text-lg"><span className=" font-bold">Email :</span> {email} </h1>
                <h1 className=" text-center text-lg"><span className=" font-bold">Role :</span> {role} </h1>
            </div>
        </div>
    </div>
  )
}

export default UserDetails;