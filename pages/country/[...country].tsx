import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Header from "../../components/Header";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const country = context.query.country[0] as string;
    const data = await axios.get(`https://restcountries.com/v2/name/${country.replace(/-/ig, '%20')}`)
    return{
        props: {
            ...data.data[0],
        }
    }
}

export default function Country(props){
    console.log(props)
    const router = useRouter()
    return(
        <>
            <Header title={props.name}/>
            <button onClick={()=>{
                router.push('/')
            }}>
                return
            </button>
            <h1>
                Hello
            </h1>
        </>
    )
}