"use client"
import { scrapeAndStoreProduct } from '@/lib/actions';
import React, { FormEvent, useState } from 'react'



const Searchbar = () => {

  const [searchPrompt, setsearchPrompt] = useState("");
  const [isLoading, setisLoading] = useState(false)

  const isValidAmazonProductUrl=(url:string)=>{
    try {
      const parsedurl=new URL(url);
      const hostname=parsedurl.hostname;
      if(hostname.includes("amazon.com") ||
      hostname.includes("amazon.") ||
    hostname.endsWith("amazon") 
    ){
      return true;
    }
      
    } catch (error) {
      console.error(error);
    }
    return false;
    
  }

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValidLink=isValidAmazonProductUrl(searchPrompt);
    if(! isValidLink){
      alert("Please enter a valid Amazon product link");
      return;
    }

    try {
      setisLoading(prev=>true)

      // scrape the product page
      const product=await scrapeAndStoreProduct(searchPrompt);
   
      
    } catch (error) {
      console.error(error);
      
    }finally{
    setisLoading(false)}
  }

  return (
   <form onSubmit={handleSubmit} className='flex gap-4 mt-12 flex-wrap'>
    <input type="text" placeholder='Enter product link' value={searchPrompt} onChange={(e)=>{setsearchPrompt(e.target.value)}}
    className='   flex-1 min-w-[200px] p-3 border border-gray-300 rounded-lg shadow-xs text-base text-gray-500 focus:outline-none' />

    <button type='submit' className='bg-secondary text-white px-4 py-1.5 rounded-lg disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 shadow-sm hover:opacity-90 text-base'
    disabled={searchPrompt===""}
    >
      {isLoading?"Searching...":"Search"}</button>

   </form>
  )
}

export default Searchbar