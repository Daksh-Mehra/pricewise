import React from 'react'
import Image from 'next/image'
import Searchbar from '@/components/Searchbar'
import HeroCarousal from '@/components/HeroCarousal'
import { getAllProducts } from '@/lib/actions'
import ProductCard from '@/components/ProductCard'

const Home =async () => {

  const allProducts=await getAllProducts();
  // console.log("to be showned:  ",allProducts);
  return (
    <>
      <section className='px-6 md:px-20 py-16'>
        <div className='flex max-xl:flex-col gap-16'>
          <div className='flex flex-col justify-center'>
            <p className="flex gap-2 font-medium text-sm text-primary">
              Smart Shopping Starts Here:
              <Image 
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>
            <h1 className='font-bold mt-4  text-6xl leading-[72px] tracking-[-1.2px] text-gray-900'>Unlesh the Power of <span className='text-primary'>PriceWise</span>
            </h1>

            <p className="mt-6">
              Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.
            </p>

            <Searchbar/>

          </div>
          <HeroCarousal/>

        </div>
      </section>


      <section className='flex flex-col gap-10 px-6 md:px-20 py-24'>
        <h2 className='text-secondary font-semibold text-3xl'>Trending</h2>

        <div className='flex flex-wrap gap-x-10 gap-y-16'>
          {allProducts?.map((product)=>(
            <ProductCard key={product._id} product={product}/>
          ))}
        </div>

      </section>
    </>
  )
}

export default Home