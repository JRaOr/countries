import Header from '../components/Header'
import { AiOutlineSearch } from 'react-icons/ai'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import { useEffect, useState } from 'react'
import CountryCard from '../components/CountryCard'
export const getServerSideProps: GetServerSideProps = async (context) => {
    const data = await axios.get('https://restcountries.com/v3.1/all')
    return{
        props: {
            data:  data.data,
        }
    }
}

const regions = {
    America: [''],
    Africa: [],
    Oceania: [],
    Europe: ['eu', ],
    Asia: []
}
export default function Home({data} : any){
    const [countries, setCountries] = useState(data)
    const [maxCountries, setMaxCountries] = useState(20)
    const [searcher, setSearcher] = useState('')
    const [displaycountries, setDisplayCountries] = useState([])
    const [region, setRegion] = useState('')

    useEffect(()=>{
        if(countries.length > 0){
            let temp = []
            countries.forEach((element: any) => {
                temp.push(element.name.official + element.name.common)
            });
            setDisplayCountries(countries)
        }
    },[countries])
    useEffect(()=>{
        let temp : any = [] ;
        if(searcher != '' && region === ''){
            console.log('primera opcion')
            countries.forEach((element : any, index : number) => {
                if(element.name.official.toLowerCase().includes(searcher)
                    || element.name.common.toLowerCase().includes(searcher)
                ){
                    temp.push(countries[index])
                }
            });
            setDisplayCountries(temp)
        }else if(searcher != '' && region != ''){
            console.log('segunda opcion')
            countries.forEach((element : any, index: number) => {
                if((element.name.official.toLowerCase().includes(searcher)
                    || element.name.common.toLowerCase().includes(searcher)) && element.region.toLowerCase().includes(region.toLowerCase())
                ){
                    temp.push(countries[index])
                }
            });
            setDisplayCountries(temp)
        }else if(searcher ==='' && region != ''){
            console.log('tercera opcion')
            countries.forEach((element : any, index : number) => {
                if(element.region.toLowerCase().includes(region.toLowerCase())){
                    temp.push(countries[index])
                }
            });
            setDisplayCountries(temp)
        }
        
    },[searcher, region])

    return(
        <>
            <Header title={''}/>
            <div className='w-[100vw] h-[92vh] overflow-scroll overflow-x-hidden px-20 py-10  dark:bg-[#212e37] dark:text-white'>
                {/* Tools */}
                <div className='w-[100%] flex items-center justify-between'>
                    <div className='flex h-10 bg-white px-5 items-center gap-5 shadow-md dark:bg-[#2b3743] dark:text-white'>
                        <AiOutlineSearch/>
                        <input value={searcher} onChange={(e)=>{
                            setSearcher(e.target.value)
                        }} className='outline-none  bg-transparent dark:text-white' placeholder='Search for a country...'/>
                    </div>

                    <select value={region} onChange={(e)=>{
                        setRegion(e.target.value)
                    }} className='h-10 border-[1px] bg-white border-blue-100 px-5 items-center gap-5 shadow-sm flex outline-none justify-center dark:bg-[#2b3743] dark:text-white dark:border-none'>
                        <option value=''>Select by Region</option>
                        <option value="Africa">Africa</option>
                        <option value="America">America</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                </div>
                {/* Countries container */}
                <div className='mt-10 grid grid-cols-5 gap-10'>
                    {displaycountries.map((country: any, index: number)=>(index < maxCountries && <CountryCard {...country} key={`card-${index}`}/>))}
                </div>
                {maxCountries < displaycountries.length &&
                <div className='flex items-center justify-center p-5'>
                    <button onClick={()=>{
                        setMaxCountries(maxCountries + 20)
                    }} className='border-2 border-blue-400 px-5 py-2 rounded-lg cursor-pointer hover:scale-105 transition-all ease-in-out duration-300'>
                        Show more
                    </button>
                </div>}
            </div>
        </>
    )
}