import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Image from 'next/image'
import { AiOutlineArrowLeft }  from 'react-icons/ai'
import { useEffect, useState } from "react";
export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const country = context.query.country[0] as string;
    const data = await axios.get(`https://restcountries.com/v2/name/${country.replace(/-/ig, '%20')}`)
    return{
        props: {
            ...data.data[0],
        }
    }
}

export default function Country(props: any){
    console.log(props)
    const { flag,
            name,
            nativeName,
            population,
            region,
            subregion,
            capital,
            topLevelDomain,
            currencies,
            languages, 
            borders
        } = props
    const router = useRouter()
    const [frontier, setFrontier] = useState([])
    const _renderTag = (label : string, data: string) => (
        <p>
            <span className="font-semibold">{label}</span>: <span className="font-extralight">{data}</span>
        </p>
    )

    const getLanguages = (languages: any) => {
        let temp = ''
        languages.forEach((element : any) => {
            temp = temp + element.name + ','
        });
        return temp.substring(0, temp.length - 1);
    }

    const getCurrencies = (currencies: any) => {
        let temp = ''
        currencies.forEach((element : any) => {
            temp = temp + element.name + ','
        });
        return temp.substring(0, temp.length - 1);
    }
    async function _renderBorder(borders: any) {
        let temp = [] as any;
        for(let i = 0; i < borders.length; i++){
            const response =  await axios.get(`https://restcountries.com/v2/alpha/${borders[i]}`)
            temp.push(response.data.name)
        }
        setFrontier(temp)
    }
    useEffect(()=>{
        if(borders.length > 0){
            _renderBorder(borders)
        }
    }, [borders])
    return(
        <Layout title={props.name}>
            <div className="w-[100%] flex items-center justify-items-start">
                <button onClick={()=>{
                    router.push('/')
                }} className="h-10 w-[120px] flex items-center justify-center gap-5 dark:bg-[#2b3743] dark:text-white shadow-md hover:shadow-xl hover:gap-10 transition-all ease-in-out duration-300 active:scale-105">
                    <AiOutlineArrowLeft/> <span>Back</span>
                </button>
            </div>
            <div className="py-10 flex flex-col lg:flex-row justify-between ">
                <div>
                    <Image src={flag} width={500} height={300}/>
                </div>
                <div className=" max-w-[500px]">
                    <p className="font-bold text-2xl mt-5">
                        {name}
                    </p>
                    <div className="flex flex-col lg:flex-row justify-between my-5 gap-5">
                        <section>
                            {_renderTag('Native name', nativeName)}
                            {_renderTag('Population', population)}
                            {_renderTag('Region', region)}
                            {_renderTag('Sub Region', subregion)}
                            {_renderTag('Capital', capital)}
                        </section>
                        <section>
                            {_renderTag('Top Level Domain', topLevelDomain[0])}
                            {_renderTag('Currencies', getCurrencies(currencies))}
                            {_renderTag('Languages',  getLanguages(languages))}
                        </section>
                    </div>
                    {frontier.length > 0 &&
                    <section className="mt-5">
                        <p className="font-bold">Border Countries:</p>
                        <div className=" flex flex-wrap gap-5 mt-5">
                            {frontier.map((country, index)=>(
                                <button onClick={()=>{
                                    router.push(`/country/${country}`)
                                }} className="shadow-xl px-5 py-2 bg-white border-[1px] items-center flex justify-center active:scale-105 transition-all ease-in-out duration-200 dark:border-0 dark:bg-[#2b3743]">
                                    <p className=" font-light">{country}</p>
                                </button>
                            ))}  
                        </div>
                    </section>}
                </div>
            </div>
        </Layout>
    )
}