'use client'
import clsx from 'clsx'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/componentshadcn/ui/select"



import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Button from '@/app/components/button/Button'
import LoginModel from '@/app/components/Model/LoginModel'
import { useSession } from 'next-auth/react'
import OrderModel from '@/app/components/Model/OrderModel'

const Card = () => {
    const session = useSession()
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<any[]>([]);
    const [confrimOpen, setConfrimOpen] = useState(false);
    const [OrderOpen, setOrderOpen] = useState(false);
    const [datas, setdatas] = useState({})
    const [error, setError] = useState('');
    const router = useRouter();
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        setIsLoading(true);
        axios
            .get('/api/Cart')
            .then((res) => {
                if (res.data.status === 'Success') {
                    setProducts(res.data.carts);
                    console.log('data', res.data.carts);
                } else {
                    setError('something went wrong');
                }
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => setIsLoading(false));
    }
 
    return (
        <>
            <LoginModel isOpen={confrimOpen}
                onClose={() => setConfrimOpen(false)} />
            <OrderModel isOpen={OrderOpen}
                onClose={() => setOrderOpen(false)}
                data={datas} />
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900" >Cart</h2>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products.map((product) => (
                            <div key={product.id} className="flex flex-col" >
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                                    <img
                                        src={product.image}
                                        alt="products"
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <span aria-hidden="true" />
                                            {product.name}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">quantity:{product.quantity}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{product.price}</p>

                                </div>
                                <Button fullWidth disabled={false} onClick={() => {
                               
                                    if (session?.status == 'unauthenticated') {
                                        setConfrimOpen(true)
                                    } else if (session?.status == 'authenticated') {
                                        setdatas(product)
                                        setOrderOpen(true)
                                    }
                                }}>Buy Now</Button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card
