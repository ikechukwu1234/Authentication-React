import { yupResolver } from "@hookform/resolvers/yup";
import React,{useState} from "react";
import {useForm} from "react-hook-form"
import *as yup from "yup"

const ValidationSchema = yup.object().shape({
    fullName: yup.string().required("fullName is required"),
    email: yup.string().email().required("email is required"),
    profileImage: yup.mixed().required("image is required"),
    password: yup.string().required().max(15).min(6).trim(),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "password didn't match")

})

const Register: React.FC = () => {
    type FormData = yup.InferType<typeof ValidationSchema>

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<FormData>({
        resolver: yupResolver(ValidationSchema),
    });

    const  createUser = handleSubmit(async(data:FormData)=>{
        console.log(data);
         reset()
    })

    const [previewImageUrl, setPreviewImageUrl] = useState<string | undefined >(undefined)

    const OnImagePreview = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files![0];
        const url = URL.createObjectURL(file);

        setPreviewImageUrl(url);
    }
  return (
    <div>
      <h1 className="mb-5">Create an Account</h1>

      <form onSubmit={createUser}>
        <img
        src={previewImageUrl}
        className="h-[70px] w-[70px] rounded-[50%] bg-salte-300 mb-5" />
        <div className=" flex-col hidden">
          <span>Profile Image</span>
          <input
          {...register("profileImage")}
            id="pix"
            type="file"
            className="h-[40px] p-3  w-[350px] mb-5"
            placeholder="enter your email"
            onChange={OnImagePreview}
          />
        </div>
        <br />
        <br />
        <label htmlFor="pix" className="p-[10px] rounded-md bg-blue-600">Upload Image</label>
        <p className="text-red-500">{errors?.profileImage?.message}</p>
         <div className="flex flex-col"> 
            <span>FullName</span>
            <input 
            {...register("fullName")}
            className='h-[40px] w-[270px] p-3 mb-5'
            placeholder="enter fullname"
            />
             <p className="text-red-500">{errors?.fullName?.message}</p>
                            
        </div>
        <div>
            <span>Email</span>
            <input
            {...register("email")}
            className="h-[40px] w-[350px] p-3 mb-5"
            placeholder="enter your email"
            />
             <p className="text-red-500">{errors?.email?.message}</p>
        </div>
        <div>
            <span>Password</span>
            <input
            {...register("password")}
            className="h-[40px] w-[350px] p-3 mb-5"
            placeholder="enter your password"
            />
             <p className="text-red-500">{errors?.password?.message}</p>
        </div>
        <div>
            <span>Confirm Password</span>
            <input
            {...register("confirmPassword")}
            className="h-[40px] w-[350px] p-3 mb-5"
            placeholder="confirm password"
            />
             <p className="text-red-500">{errors?.confirmPassword?.message}</p>
        </div>
        <p>
           Already have an Account <span>Login</span>
        </p>
        <button>Sumbit</button>
      </form>
    </div>
  );
};

export default Register;
