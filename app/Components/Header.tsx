import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <>
      <div className='flex flex-col bg-slate-950 h-screen w-72 pl-8 pt-10 text-white gap-28'>
        <h3>Hello</h3>
        <div className='flex flex-col gap-2'>
          <button className='h-10 w-56 bg-red-600 rounded'>
            <Link href="/">Visualizar prestadores</Link>
          </button>
          <button className='h-10 w-56 bg-red-600 rounded'>
            <Link href="/">Cadastrar prestador</Link>
          </button>
        </div>
      </div>
    </>
  )
}

export default Header
