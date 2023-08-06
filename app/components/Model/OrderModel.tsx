'use client'
import Button from "../button/Button"
import Model from "./Model";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { PiAddressBookDuotone } from 'react-icons/pi'
import { signOut } from 'next-auth/react'
import Input from "../Input/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";

interface OrderModelProps {
    isOpen?: boolean;
    onClose: () => void;
    data:any
}
const OrderModel: React.FC<OrderModelProps> = ({ isOpen, onClose,data }) => {

const [isLoading,setIsLoading]=useState(false)
const [address,setAdresss]= useState("")

    const Buy = () => {
        
        axios.post('/api/Cart', { ...data,address })
            .then((res) => {
                if (res.data.status === 'Success') {
                    toast.success("Order has been placed")
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => setIsLoading(false));
   
    }

    const router = useRouter();
    return (
        <Model
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-13 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <PiAddressBookDuotone  className='h-6 w-6 text-blue-600' />
                </div>
                <div className=" mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                       Shiping Adreess 
                    </Dialog.Title>
                    <div className="mt-2">
                    <input
                            placeholder='Shipping Adress'
                            type="text"
                            value={address}
                            onChange={(e)=>setAdresss(e.target.value)}
                            className="pl-1 form-input block w-[100%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2  focus:ring-inset focus:ring-sky-600 sm:textt-sm sm:leading-6"
                        />
                    </div>
                </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <Button onClick={Buy} >
                   Order
                </Button>
                <Button secondary onClick={onClose}>
                    Cancel
                </Button>
            </div>
        </Model>
    )
}

export default OrderModel