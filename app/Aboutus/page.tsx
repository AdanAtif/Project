import Image from 'next/image';


export default function Home() {
    return (
        <>
                <div className="h-100 bg-cover  bg-[url('/pics/c.jpg')] bg-center p-20 flex flex-col items-center justify-center rounded-b-lg" >
                    <h1 className="text-3xl font-bold mb-6 text-center text-cyan-500">About Our Chatbot</h1>
                    <p className="text-lg mb-6 w-full md:w-1/2 text-center text-stone-900 font-semibold">
                    Welcome to Our Megamarket, the ultimate destination for all your shopping needs! Our Megamarket is an expansive and innovative ecommerce platform designed to provide you with a seamless and enjoyable shopping experience. 
                    </p>
                </div>
                <div className="h-100 bg-cover bg-center flex flex-col md:flex-row items-center justify-center pt-8">
                    <div className="md:w-1/2 pl-4">
                        <h2 className="text-2xl font-bold mb-6  text-cyan-900 dark:text-cyan-300 ">How Does It Work?</h2>
                        <p className="text-sm mb-6 w-full md:w-4/5 text-cyan-50 font-semibold dark:text-cyan-700">
                        An ecommerce website operates as a digital marketplace, enabling users to browse, select, and purchase products or services online. The process begins with the customer visiting the website and exploring a wide range of products categorized into various sections. Upon finding the desired item, they can add it to their virtual shopping cart. Once the shopping is complete, the user proceeds to the checkout process, where they provide their shipping address, payment details, and any applicable discount codes

                        </p>
                        <h2 className="text-2xl font-bold mb-6  text-cyan-900 dark:text-cyan-300 ">What Can It Do?</h2>
                        <p className="text-sm mb-6 w-full md:w-4/5 text-cyan-50 font-semibold dark:text-cyan-700">
                        An ecommerce website offers a wide array of functionalities that empower both businesses and consumers in the digital marketplace. For businesses, it serves as a powerful platform to showcase and sell their products or services to a global audience, expanding their reach beyond physical limitations. It enables them to manage inventory, process transactions securely, and track sales data for better decision-making. Additionally, ecommerce websites can implement marketing tools like personalized recommendations and targeted promotions to enhance customer engagement and boost sales.               
                        </p>
                    </div>
                    <div className="md:w-1/2">
                        <Image src="/pics/e.jpg" alt="Logo" width={500} height={500} className="w-full rounded-md" />
                    </div>
                </div>
           
        </>
    );
};








