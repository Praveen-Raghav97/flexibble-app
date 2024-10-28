
import { NavLinks } from '@/constant'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import AuthProvider from './AuthProvider'
import Button from './Button'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { getCurrentUser } from '@/lib/Session'
import ProfileMenu from './ProfileMenu'



const Navbar = async () => {
  const session  = await getCurrentUser()
   // console.log(session)
  
  

  return (
    <nav className='flexBetween navbar'>
    <div className='flex-1 flexStart gap-10'>
      <Link href='/'>
        <Image
          src='/logo.svg'
          width={116}
          height={43}
          alt='logo'
        />
      </Link>
      <ul className='xl:flex hidden text-small gap-7'>
        {NavLinks.map((link) => (
          <Link href={link.href} key={link.text}>
            {link.text}
          </Link>
        ))}
      </ul>
    </div>

    <div className='flexCenter gap-4'>
      {session ? (
        <>
        <ProfileMenu session={session}/>
      
          <Link href="/create-project">
           <Button title='Share Work'/>
          </Link>
        </>
      ) : (
       <AuthProvider/>
      )}
    </div>
  </nav>
  )
}

export default Navbar
