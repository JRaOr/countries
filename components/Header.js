import Head from 'next/head'
import { useEffect } from 'react'
import { BsMoonFill } from 'react-icons/bs'
export default function Header({title}){
    useEffect(()=>{
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    },[])

    function changeTheme(){
        console.log(localStorage.theme)
        if(localStorage.theme === 'dark'){
            document.documentElement.classList.remove('dark')
            localStorage.theme = 'light'
        }else{
            localStorage.theme = 'dark'
            document.documentElement.classList.add('dark')
        }
    }
    return(
        <div className='w-100 h-[8vh] bg-gray-100 shadow-md sticky top-0 dark:bg-[#2b3743] dark:text-white'>
            <Head>
                <title>Where in the World?{(title ? ` | ${title}`:'')}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='flex items-center h-[100%] w-[100%] justify-between px-20'>
                <p className=' font-bold text-2xl'>
                    Where in the World?
                </p>
                <div onClick={()=>{
                    changeTheme()
                }} className='flex items-center gap-2 cursor-pointer'>
                    <BsMoonFill/>
                    <p>Dark mode</p>
                </div>
            </div>
        </div>
    )
}