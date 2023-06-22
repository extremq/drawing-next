import Head from 'next/head'
import Link from 'next/link'
import Layout from 'app/layout'

export default function Home() {
    return (
        <Layout>
            <Head>
                <title>Login</title>
            </Head>

            <main>
                <h1 className="text-4xl font-bold text-center">
                    Login
                </h1>

                <form className="flex flex-col" onSubmit={
                    async (event) => {
                        event.preventDefault()
                        const token = event.target.token.value
                        const response = await fetch('/api/login', {
                            method: 'POST',
                            body: JSON.stringify({ token }),
                        })
                        const json = await response.json()
                    }
                }>
                    <label htmlFor="token">Username</label>
                    <input type="password" id="token" name="token" />
                    
                    <button type="submit">Submit token</button>
                </form>

                <Link href="/">
                    Home
                </Link>
            </main>
        </Layout>
    )
}