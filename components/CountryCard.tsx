import Image from 'next/image'
import { useRouter } from 'next/router'
export default function Card(props: any){
    const router = useRouter()
    const { name, population, region, capital, flags} = props 
    return(
        <div onClick={()=>{
            router.push(`/country/${name.official.replace(/ /ig, '_')}`)
        }} className="pb-5 self-center justify-self-center cursor-pointer hover:scale-105 transition-all ease-in-out duration-200 bg-white shadow-md dark:bg-[#2b3743] card">
            <Image height={170} width={255} src={flags.png}/>
            <div className='flex flex-col justify-between h-[180px] py-5 text-[14px]'>
                <p className='font-bold px-5 max-h-[48px] overflow-hidden'>
                    {name.official}
                </p>
                <div>
                    <p className='px-5'>
                        <span className='font-semibold'>Population: </span> {population}
                    </p>
                    <p className='px-5'>
                        <span className='font-semibold'>Region: </span> {region}
                    </p>
                    <p className='px-5'>
                        <span className='font-semibold'>Capital: </span> {capital}
                    </p>
                </div>
            </div>
        </div>
    )
}