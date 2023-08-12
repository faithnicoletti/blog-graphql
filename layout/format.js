import Header from '../components/header';

import Head from "next/head";

export default function format({children}) {
    return(
        <>
        <Head>
            <title>Blog</title>
        </Head>

        <Header></Header>
        <main>{children}</main>
        </>
    )
}