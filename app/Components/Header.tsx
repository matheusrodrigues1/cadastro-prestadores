import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Icone from '../images/loop.svg';

function Header() {
  return (
    <>
      <div className='flex flex-col items-center pt-2 bg-slate-950 h-screen w-80 text-white gap-28'>
        <Image src={Icone} alt='icon' className='h-40 w-40'/>
        <div className='flex flex-col gap-4'>
          <button className='h-10 w-56 bg-red-600 rounded-xl'>
            <Link href="/">Visualizar prestadores</Link>
          </button>
          <button className='h-10 w-56 bg-red-600 rounded-xl'>
            <Link href="/">Cadastrar prestador</Link>
          </button>
          <button className='h-10 w-56 bg-red-600 rounded-xl'>
            <Link href="/import">Importar prestador</Link>
          </button>
        </div>
      </div>
    </>
  )
}

export default Header
