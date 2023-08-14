import { ImInstagram, ImGithub, ImLinkedin } from "react-icons/im";
import Link from 'next/link';


export default function header() {
    return (
       <header className="bg-gray-800">
        <div className="xl:container xl:mx-auto flex justify-between items-center sm:justify-between text-center py-4">
            <div className="md:flex-none w-96 order-2 sm:order-1 flex justify-center shrink w-80 sm:order-2">
                <Link href={'/'} className="font-bold uppercase text-3XL hover:underline cursor-pointer text-white">Faith's Blog
                </Link>
            </div>
            <div className="w-96 order-3 flex justify-center">
            <div className="flex gap-3 py-2">
                <Link href={"https://github.com/faithnicoletti/"}><ImGithub color="#F5F5F5"/>
                </Link>
                <Link href={"https://www.instagram.com/keep_the_faithh/"}><ImInstagram color="#F5F5F5"/>
                </Link>
                <Link href={"https://www.linkedin.com/in/faith-nicoletti-a52408233/"}><ImLinkedin color="#F5F5F5"/>
                </Link>
              </div>
            </div>
          </div>
       </header>
    )
}