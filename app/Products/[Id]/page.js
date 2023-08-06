'use client'

import LoginModel from "@/app/components/Model/LoginModel";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";




export default function Home({ params }) {

    const id = params.Id;
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [confrimOpen, setConfrimOpen] = useState(false);
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const session=useSession()
    const [email, setemail] = useState('')

    useEffect(() => {
        fetchProducts()
    }, [])

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value)
        
    };
    const fetchProducts = () => {
        setIsLoading(true);

        axios
            .get(`/api/store?id=${id}`)
            .then((res) => {
                if (res.data.status === 'Success') {
                    const data = res.data.Products
                    console.log("data", data);
                    setProduct(data)
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => setIsLoading(false));
    }

    const Cart = () => {
        console.log("{ product, quantity}",{ product, quantity,email});
     
            axios.post('/api/store', { ...product, quantity,email})
            .then((res) => {
                if (res.data.status === 'Success') {
                  toast.success("Added to Cart")
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => setIsLoading(false));
        
  
    }
    return (
   <>
             <LoginModel isOpen={confrimOpen}
                onClose={() => setConfrimOpen(false)} />
                    <>
                    <div className="h-100 bg-cover bg-center flex flex-col md:flex-row items-center justify-center pt-8">
                    <div className="md:w-1/2 pl-4">
                    <div className="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0 items-center justify-center " key={product.id}>
                            <img
                                src={product.image}
                                alt="Product Image"
                                width={1000}
                                height={800}
                                layout="responsive"
                                className="rounded-md shadow-lg border-2 text-gray-600 dark:bg-slate-900"
                            />
                        </div>
                    </div>
                    <div className="md:w-1/2">
                    <div className="w-full md:w-1/2 pl-4">
                            <br />
                            <h2 className="text-2xl md:text-2xl font-bold text-red-500 mb-2 dark:text-blue-700">Name</h2>
                            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 dark:text-white">{product.name}</h1>
                            <p className="text-lg md:text-3xl font-semibold text-gray-900 mb-4 dark:text-blue-700">${product.price}</p>
                            <p className="text-lg text-gray-600 mb-4 dark:text-slate-400">Color: <span className="font-semibold text-gray-900 dark:text-white">{product.Color}</span></p>
                            <p className="text-lg text-gray-600 mb-4 dark:text-slate-400">Size: <span className="font-semibold text-gray-900 dark:text-white">{product.Size}</span></p>
                            <p className="text-lg text-gray-600 mb-4 dark:text-slate-400">category: <span className="font-semibold text-gray-900 dark:text-white">{product.Category}</span></p>
                            <p className="text-lg text-gray-600 mb-4 dark:text-slate-400">Stock: <span className="font-semibold text-gray-900 dark:text-white">{product.stock}</span></p>
                            <div className="mb-4 w-1/5 ">
                                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2" htmlFor="quantity">
                                    Quantity
                                </label>

                                <input
                                    className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none dark:bg-slate-900 dark:text-white focus:shadow-outline"
                                    id="quantity"
                                    type="number"
                                    min="1"
                                    max="10"
                                  value={quantity}
                                  onChange={handleQuantityChange}
                                />
                            </div>
                            <p className="text-md  text-gray-700 mb-4 dark:text-slate-400">mlmlkllm.</p>

                            <div>
                                <button className="relative overflow-hidden px-4 py-2 text-lg font-medium uppercase tracking-wide dark:text-blue-700 text-red-500 transition-all duration-500 ease-in-out bg-transparent border-2 border-red-500 dark:border-blue-700 rounded-full focus:outline-none"  onClick={() => {
                            if (session?.status == 'unauthenticated') {
                                setConfrimOpen(true)
                            } else if(session?.status == 'authenticated') {
                                setemail(session?.data?.user?.email)
                                Cart()
                            }
                        }}>
                                    <span className="absolute inset-0 transition-all duration-500 ease-in-out dark:text-blue-700 bg-red-500 rounded-full opacity-50 hover:opacity-100" style={{ transform: "translate(-50%, -50%) rotate(45deg)", top: "50%", left: "50%", width: "0", height: "300%" }}></span>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>              
                        </>
        </>
    )
}
