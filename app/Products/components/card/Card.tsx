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

const Card = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<any[]>([]);
    const [error, setError] = useState('');
const router= useRouter();
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        setIsLoading(true);
        axios
            .post('/api/products', {})
            .then((res) => {
                if (res.data.status === 'Success') {
                    setProducts(res.data.Products);
                    console.log('data', res.data.Products);
                } else {
                    setError('something went wrong');
                }
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => setIsLoading(false));
    }
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900" >Customers also purchased</h2>
                <div className='flex flex-col'>
                    <div className="mt-2 flex">
                        <input
                            placeholder='Search'
                            type="text"
                            className="pl-1 form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2  focus:ring-inset focus:ring-sky-600 sm:textt-sm sm:leading-6"
                        />
                    </div>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="clothing">clothing</SelectItem>
                            <SelectItem value="shoes">shoes</SelectItem>
                            <SelectItem value="accessories">accessories</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product.id} className="group relative flex flex-col" onClick={()=> router.push(`/Products/${product.id}`)}>
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    src={product.image}
                                    alt="products"
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <span aria-hidden="true" className="absolute inset-0" />
                                        {product.name}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{product.Color}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

                </div>
            </div>
        </div>
    )
}

export default Card
