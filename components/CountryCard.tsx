import Image from 'next/image'
import { useRouter } from 'next/router'
export default function Card(props: any){
    const router = useRouter()
    const { name, population, region, capital, flags} = props 
    return(
        <div onClick={()=>{
            router.push(`/country/${name.official.replace(/ /ig, '-')}`)
        }} className="w-[250px] border-2 border-red-900 pb-5 cursor-pointer hover:scale-105 transition-all ease-in-out duration-200">
            <img src={flags.png}/>
            <p className='font-bold px-5 my-2 '>
                {name.official}
            </p>
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
    )
}