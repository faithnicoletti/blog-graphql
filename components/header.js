import { ImInstagram, ImGithub, ImLinkedin } from "react-icons/im";
import Link from 'next/link';

export default function header() {
    return (
       <header className="bg-gray-50">
        <div className="xl:container xl:mx-auto flex flex-col items-center sm:flex-row sm:justify-between text-center py-2">
            <div className="md:flex-none w-96 order-2 sm:order-1 flex justify-center">
                <input type="text" className="input-text" placeholder="Search..."/>
            </div>
            <div className="shrink w-80 sm:order-2">
                <Link href={'/'} className="font-bold uppercase text-3XL">Faith's Blog
                </Link>
            </div>
            <div className="w-96 order-3 flex justify-center">
            <div className="flex gap-6 py-2">
                <Link href={"/"}><ImGithub color="#888888"/>
                </Link>
                <Link href={"/"}><ImInstagram color="#888888"/>
                </Link>
                <Link href={"/"}><ImLinkedin color="#888888"/>
                </Link>
              </div>
            </div>
          </div>
       </header>
    )
}