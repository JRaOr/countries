import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import Layout from "../../components/Layout";

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
    const router = useRouter()
    return(
        <Layout title={props.name}>

        </Layout>
    )
}