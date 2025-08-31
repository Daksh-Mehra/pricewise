import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {


    const navIcons = [
  { src: '/assets/icons/search.svg', alt: 'search' },
  { src: '/assets/icons/black-heart.svg', alt: 'heart' },
  { src: '/assets/icons/user.svg', alt: 'user' },
]
  return (
    <header className='w-full'>
        <nav className='flex justify-between items-center py-4 px-6 md:px-20'>
            <Link href='/' className='flex gap-1 items-center'>
                <Image src="/assets/icons/logo.svg" width={27} height={27} alt="logo" />
                <p className='font-bold font-space-grotesk text-xl text-secondary '>Price<span className='text-primary'>Wise</span></p>
            </Link>

            <div className='flex gap-5 items-center'>
                {navIcons.map(icon=>(
                    <Image key={icon.alt} alt={icon.alt} src={icon.src} width={27} height={27} />
                ))}

            </div>
        </nav>
    </header>
  )
}

export default Navbar