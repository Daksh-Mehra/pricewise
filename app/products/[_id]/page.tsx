import React from 'react'
import { getProductById, getSimilarProducts } from '@/lib/actions'
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { formatNumber } from '@/lib/utils';
import PriceInfoCard from '@/components/PriceInfoCard';
import ProductCard from '@/components/ProductCard';
import Modal from '@/components/Modal';

type PageProps = { params: { _id: string } };

const ProductDetails = async ({ params }: PageProps) => {
  // console.log("ProductDetails: ", params._id);

  const product:Product=await getProductById(params._id);
  if(!product){
    redirect('/');
  }

  const similarProducts = await getSimilarProducts(params._id);

  return (
    <div className='lex flex-col gap-16 flex-wrap px-6 md:px-20 py-24'>
      <div className='flex gap-28 xl:flex-row flex-col '>
        <div className='flex-grow xl:max-w-[50%] max-w-full py-16 border border-[#CDDBFF] rounded-[17px]'>
          <Image 
          src={product.image} 
          alt={product.title}
          width={500} 
          height={400} 
          className='mx-auto'/>

        </div>

        <div className='flex flex-col flex-1'>
          <div className='flex justify-between items-start gap-5 flex-wrap pb-6'>
            <div className='flex flex-col gap-3'>
              <p className='text-[28px] font-semibold text-secondary'>{product.title}</p>
            </div>
            <Link href={product.url}
              target='_blank'
              className='text-base text-black opacity-50'
            >
              Visit Product

            </Link>
          </div>
          <div className='flex items-center gap-3'>
            <div className='flex items-center gap-2 px-3 py-2 bg-[#FFF0F0] rounded-10'>
              <Image 
                src='/assets/icons/red-heart.svg'
                alt='heart icon'
                width={20}
                height={20}
                />
                <p className='text-base font-semibold text-primary'>{product.reviewsCount}</p>
            </div>

            <div className=' p-2 bg-white-200 rounded-10'>
              <Image 
                src='/assets/icons/bookmark.svg'
                alt='star icon'
                width={20}
                height={20}
              />
            </div>
            <div className=' p-2 bg-white-200 rounded-10'>
              <Image 
                src='/assets/icons/share.svg'
                alt='share icon'
                width={20}
                height={20}
              />
          </div>
        </div>
      <div className='flex items-center flex-wrap gap-10 py-6 border-y border-y-[#E4E4E4]'>
        <div className='flex flex-col gap-2'>
          <p className='text-[34px] font-bold text-secondary'>{product.currency}{formatNumber(product.currentprice)}</p>
          <p className='text-[21px] opacity-50 line-through font-bold text-black'>{product.currency}{formatNumber(product.originalPrice)}</p>
        </div>

        <div className='flex flex-col gap-4'>
          <div className='flex  gap-3'>
            <div className=' flex items-center gap-2 px-3 py-2 bg-[#FBF3EA] rounded-[27px]'>
              <Image 
              src='/assets/icons/star.svg'
              alt='star icon'
              width={16}
              height={16}
              />
              <p className='text-sm font-semibold text-primary'>{product.stars}</p>
            </div>

            <div className='flex items-center gap-2 px-3 py-2 bg-white-200 rounded-[27px]'>
              <Image
              src={'/assets/icons/comment.svg'}
              alt='comment icon'
              width={16}
              height={16}
              />
              <p className='text-sm text-secondary font-semibold'>{product.reviewsCount} Reviews</p>
            </div>
          </div>
          
          <p className='text-sm text-black opacity-50'>
            <span className='font-semibold text-primary'>93% </span> of buyers have recommended this.
          </p>

        </div>

      </div>
      <div className='my-7 flex flex-col gap-4'>
        <div className='flex flex-wrap gap-5'>
           <PriceInfoCard 
                title="Current Price"
                iconSrc="/assets/icons/price-tag.svg"
                value={`${product.currency} ${formatNumber(product.currentprice)}`}
              />
              <PriceInfoCard 
                title="Average Price"
                iconSrc="/assets/icons/chart.svg"
                value={`${product.currency} ${formatNumber(product.averagePrice)}`}
              />
              <PriceInfoCard 
                title="Highest Price"
                iconSrc="/assets/icons/arrow-up.svg"
                value={`${product.currency} ${formatNumber(product.highestPrice)}`}
              />
              <PriceInfoCard 
                title="Lowest Price"
                iconSrc="/assets/icons/arrow-down.svg"
                value={`${product.currency} ${formatNumber(product.lowestPrice)}`}
              />
        </div>

      </div>

      <Modal  productId={product._id!.toString()}/>
    </div>
    </div>

    <div className='flex flex-col mt-4 gap-16'>
      <div className='flex flex-col gap-5'>
        <h3 className='text-xl font-semibold text-secondary'>Product Description</h3>

        <div className='flex flex-col gap-4 text-base text-black opacity-70 '>
          {product?.description.length > 350
    ? product.description.slice(0, 350) + '...'
    : product.description}
        </div>
      </div>

      <button className='py-4 px-4 bg-secondary hover:bg-opacity-70 rounded-[30px] text-white text-lg font-semibold w-fit flex items-center gap-3 justify-center min-w-[200px] mx-auto'>
        <Image
          src='/assets/icons/bag.svg'
          alt='check'
          width={22}
          height={22}
        />

        <Link href='/' className='text-base text-white'>Buy Now</Link>
      </button>

    </div>


    {similarProducts && similarProducts?.length > 0 && (
      <div className='flex flex-col gap-2 w-full py-14'>
        <h3 className='text-xl font-semibold text-secondary'>Similar Products</h3>

        <div className='flex flex-wrap gap-10 mt-7 w-full'>
          {similarProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    )}

    </div>
  )
}

export default ProductDetails;