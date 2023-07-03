import Layout from '../layout'
import useAdmin from '@/lib/useAdmin'
import Router from 'next/router'

export default function About() {
    const admin = useAdmin({
        redirectTo: '/login',
    })

    // Check auth
    if (!(admin.auth && admin.auth?.admin)) {
        return (
            <Layout title="Loading...">
                <p className="text-lg mb-3">
                    Checking authorization...
                </p>
            </Layout>
        )
    }
    
    return (
        <Layout title={
            "Admin Dashboard"
        }>
            <p className="text-lg mb-3">
                Hello, I hope your name is Extremq.
            </p>
            <button
                className="text-white border hover:bg-white hover:text-black font-bold py-2 px-4"
                onClick={() => {
                    Router.push('/admin/post');
                }}
            >
                Create Post
            </button>
        </Layout>
    )
}
