import Layout from '../layout'
import useAdmin from '@/lib/useAdmin'

export default function About() {
    useAdmin({
        redirectTo: '/login',
    })

    return (
        <Layout title={"Create Post"}>
        </Layout>
    )
}
