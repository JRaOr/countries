import { useEffect } from "react";
import Header from "./Header";

export default function Layout({children, title} : any){
    return(
        <div className="w-[100%]  h-[100%]">
            <Header title={title}/>
            <div className="w-[100%] h-[92vh] flex justify-center bg-[#fafafa] dark:bg-[#212e37] dark:text-white  overflow-y-scroll hide-scroll">
                <div className="py-10 content md:px-5 sm:px-5 px-8 lg:px-[0]">
                    {children}
                </div>
            </div>
        </div>
    )
}