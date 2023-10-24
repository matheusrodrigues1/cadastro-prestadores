"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import Icone from '../images/loop.svg';
import DropDownMenu from './Dropdownmenu';
import { Menu } from 'feather-icons-react';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div className='flex justify-between items-center bg-slate-950 p-3 h-24 w-full text-white'>
        <Image src={Icone} alt='icon' className='h-24 w-24'/>
        <div className='flex items-center gap-1 relative mr-3'>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className='p-1 mr-3 border-solid border-white border-2 whitespace-nowrap bg-transparent rounded-xl'
          >
            <Menu size={30} />
          </button>
          {menuOpen && <DropDownMenu />}
        </div>
      </div>
    </>
  )
}

export default Header
