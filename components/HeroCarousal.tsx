"use client"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image";
const HeroCarousal = () => {


  const heroImages=[
    {imgUrl:"/assets/images/hero-1.svg",alt:"smartwatch"},
    {imgUrl:"/assets/images/hero-2.svg",alt:"bag"},
    {imgUrl:"/assets/images/hero-3.svg",alt:"lamp"},
    {imgUrl:"/assets/images/hero-4.svg",alt:"air fryer"},
    {imgUrl:"/assets/images/hero-5.svg",alt:"chair"},
  ]
  return (
    <div className="max-w-[560px] h-[700px] relative sm:px-10 py-5 sm:pt-20 pb-5 w-full bg-[#F2F4F7] mx-auto rounded-[30px]">
      <Carousel 
      autoPlay
      infiniteLoop
      interval={2000}
      showArrows={false}
      showThumbs={false}
      showStatus={false}

      >
        {heroImages.map((image)=>(
          <Image 
          src={image.imgUrl}
          alt={image.alt}
          width={404}
          height={404}
          key={image.alt}
          className="object-contain"
          />
        ))}
      </Carousel>
    </div>
  )
}

export default HeroCarousal