"use client"

import Link from 'next/link'
import React from 'react'

function DropDownMenu() {
  return (
    <div>
      <div className='absolute flex flex-col gap-3 top-16 right-4 bg-white p-4 rounded shadow'>
        <Link href="/visualizacao" className='text-black whitespace-nowrap'>Visualizar prestadores</Link>
        <Link href="/" className='text-black whitespace-nowrap'>Cadastrar prestador</Link>
        <Link href="/import" className='text-black whitespace-nowrap'>Importar prestador</Link>
      </div>
    </div>
  )
};

export default DropDownMenu;
