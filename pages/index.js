import Layout from './layout'
import { useState, useEffect } from 'react'
import PostEmbed from '@/app/components/PostEmbed'

export default function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    // Have lastDateFrom and lastDateTo as variables
    // They must be timestamps
    let lastDateFrom = new Date(new Date().setMonth(new Date().getMonth() - 1)).getTime()
    let lastDateTo = new Date().getTime()

    // Fetch posts from last month
    useEffect(() => {
        setLoading(true)

        fetch("/api/posts"
            + "?from=" + lastDateFrom
            + "&to=" + lastDateTo
        )
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    setPosts(data.posts)
                    console.log(data.posts)
                    setLoading(false)
                }
            })
    }, [])

    return (
        <Layout title={"Latest Posts"}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    posts.sort((a, b) => {
                        return new Date(b.timestamp) - new Date(a.timestamp)
                    }).map(post => (
                        <div key={post._id} className="mb-4">
                            <PostEmbed
                                title={post.title}
                                image={post.images}
                                timestamp={post.timestamp}
                                id={post._id}
                            />
                        </div>
                    ))
                }
            </div>

            {/* Load more button */}
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => {
                        // Fetch posts from one month before lastDateFrom
                        // and one month before lastDateTo
                        // Only add posts that are not already in posts
                        lastDateFrom = new Date(new Date(lastDateFrom).setMonth(new Date(lastDateFrom).getMonth() - 1)).getTime()
                        lastDateTo = new Date(new Date(lastDateTo).setMonth(new Date(lastDateTo).getMonth() - 1)).getTime()
                        setLoading(true)

                        fetch("/api/posts"
                            + "?from=" + lastDateFrom
                            + "&to=" + lastDateTo
                        )
                            .then(res => res.json())
                            .then(data => {
                                if (data.ok) {
                                    setPosts([...posts, ...data.posts.filter((post) => {
                                        return !posts.includes(post)
                                    })])
                                    setLoading(false)
                                }
                            })
                    }}
                    className="bg-black hover:bg-white hover:text-black border disabled:cursor-not-allowed border-white text-white px-3 py-2 text-sm font-medium"
                    disabled={loading}    
                >
                    {loading ? "Loading..." : "Load more"}
                </button>
            </div>
        </Layout>
    )
}