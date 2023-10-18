import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Icone from '../images/loop.svg';

function Header() {
  return (
    <>
      <div className='flex flex-col border-transparent items-center bg-slate-950 h-screen w-80 text-white gap-28 lg:gap-14 md:gap-10'>
        <Image src={Icone} alt='icon' className='h-36 w-36 lg:h-24 lg:w-24 md:h-24'/>
        <div className='flex flex-col gap-4 lg:gap-2 md:gap-1'>
          <button className='p-2 whitespace-nowrap  bg-red-600 rounded-xl'>
            <Link href="/visualizacao">Visualizar prestadores</Link>
          </button>
          <button className='p-2 whitespace-nowrap bg-red-600 rounded-xl'>
            <Link href="/">Cadastrar prestador</Link>
          </button>
          <button className='p-2 whitespace-nowrap bg-red-600 rounded-xl'>
            <Link href="/import">Importar prestador</Link>
          </button>
        </div>
      </div>
    </>
  )
}

export default Header
