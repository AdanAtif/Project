'use client'

import Input from '@/app/components/Input/Input'
import Button from '@/app/components/button/Button'
import SocialButton from './SocialButton'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import { toast } from "react-hot-toast";

import Image from 'next/image'
import { useState, useCallback, useEffect } from 'react'

import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import { CldUploadButton } from 'next-cloudinary';
import axios from 'axios'

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = 'LOGIN' | 'REGISTER'

const Authform = () => {
    const session = useSession()
    const [variant, setVariant] = useState<Variant>('LOGIN')

    const [isloading, setIsloading] = useState(false)
    const [error, setError] = useState<string>("")

    const router = useRouter()

    const toggleVariant = useCallback(() => {
        if (variant == 'LOGIN') {
            setVariant('REGISTER')
        } else {
            setVariant('LOGIN')
        }
    }, [variant])

    useEffect(( )=>{
        if (session?.status == 'authenticated') {
            console.log("data", session?.data?.user);
            
        }
    },[session?.status]);

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            image: '',
        },
    })

    // Image handler
    const handleupload = (result: any) => {
        setValue('image', result?.info?.secure_url, {
            shouldValidate: true
        })
    }
    const image = watch('image')



    const onSubmit: SubmitHandler<FieldValues> = (data) => {

        // Register
        if (variant === 'REGISTER') {
            setIsloading(true);
            axios.post('/api/register', data)
                .then((res) => {
                    if (res.data.status == 'Failed') {
                        setError(res.data.message)
                    } else if (res.data.status == 'Success') {
                        signIn('credentials', data)
                    } else {
                        setError("Something went wrong")
                    }
                })
                .catch(() => toast.error('Something went wrong!'))
                .finally(() => setIsloading(false))
        }


        // LOGIN
        if (variant === 'LOGIN') {
            signIn('credentials', {
                ...data,
                redirect: false
            })
                .then((callback) => {
                    if (callback?.error) {

                        toast.error(callback.error)
                    }
                    if (callback?.ok && !callback?.error) {
                        toast.success("Logged in!")
                        // router.push("/users")
                    }
                })
                .finally(() => setIsloading(false))
        }
    };


    const socialAction = (action: string) => {
        setIsloading(true)
        signIn(action,{redirect:false})
        .then((callback:any)=>{
           if (callback?.error) {
            toast.error('Invalid Credentials')
           }
           if (callback?.ok && !callback?.error) {
            
            toast.success('Logged In!')
           }
        })

    }

    return (
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='bg-white px-4 py-8 sm:rounded-lg sm:px-10'>
                <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                    {variant == "REGISTER" && (
                        <Input label='Name' register={register} id="name" type='text' errors={errors} disabled={isloading} />
                    )}
                    <Input label='Email address' register={register} id="email" type='email' errors={errors} disabled={isloading} />
                    <Input label='Password' register={register} id="password" type='password' errors={errors} disabled={isloading} />
                    {variant == "REGISTER" && (
                        <div className='flex flex-col items-center justify-center'>
                            <label className='black text-sm font-medium leading text-gray-900 '>Photo</label>
                            <div className='mt-2 flex items-center gap-x-3'>
                                <CldUploadButton
                                    options={{ maxFiles: 1 }}
                                    onUpload={handleupload}
                                    uploadPreset="o0xrxsjr">
                                    <Image
                                        width="48"
                                        height="48"
                                        className='rounded-full'
                                        src={image || '/images/placeholder.jpg'}
                                        alt="Avatar"
                                    />
                                </CldUploadButton>
                            </div>
                        </div>)}
                    <div>
                        <Button disabled={isloading} fullWidth type='submit'>
                            {variant == 'LOGIN' ? 'Sign in' : "Register"}
                        </Button>
                    </div>
                    <p className='text-center text-red-600 text-sm'>{error}</p>
                </form>
                <div className='mt-6'>
                    <div className='relative '>
                        <div className='absolute inset-0 flex items-center'>
                            <div className='w-full border-t border-gray-300' />
                        </div>
                        <div className='relative flex justify-center text-sm'>
                            <span className='bg-white px-2 text-gray-500'>
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <div className='mt-6 flex gap-2 '>
                        <SocialButton icon={BsGithub} onClick={() => socialAction('github')} />
                        <SocialButton icon={BsGoogle} onClick={() => socialAction('google')} />
                    </div>
                </div>
                <div className='flex gap-2 justify-center text-sm mt-2 px-2 text-gray-500'>
                    <div>
                        {variant == 'LOGIN' ? 'New to Messenger' : 'Already have an account'}
                    </div>
                    <div onClick={toggleVariant} className='underline cursor-pointer'>
                        {variant == 'LOGIN' ? 'Create an account' : 'Login'}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Authform
