import Layout from '../layout'
import useAdmin from '../api/_useAdmin'
import Router from 'next/router'

export default function About() {
    useAdmin({
        redirectTo: '/login',
    })

    return (
        <Layout title={"Admin Dashboard"}>
            <p className="text-lg mb-3">
                Hello, I hope your name is Extremq.
            </p>
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500"
                onClick={() => {
                    Router.push('/admin/post');
                }}
            >
                Create Post
            </button>
        </Layout>
    )
}
