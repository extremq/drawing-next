import Layout from '../layout'
import useAdmin from '@/lib/useAdmin'

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
        <Layout title={"Create Post"}>
        </Layout>
    )
}
