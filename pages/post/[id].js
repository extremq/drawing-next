import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Router from "next/router";

import Layout from '../layout'

export default function PageId() {
    const router = useRouter()

    const [post, setPost] = useState(null)

    // Fetch post
    useEffect(() => {
        if (!router.query.id) return
        fetch(`/api/post/${router.query.id}`)
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    setPost(data.post)
                }
                else {
                    Router.push("/404")
                }
            })
    }, [router.query.id])

    return (
        <Layout title={post?.title || "Post"}>
            {post ?
                <div>
                    <p className="text-sm mb-3">{
                        new Date(post.timestamp).toLocaleDateString("en-US", {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })
                    }</p>
                    <p className="text-lg mb-3">{post.caption}</p>
                    <div className="">
                        {
                            post.images.map(image => (
                                <img key={image.name} src={image.data} className="w-full mb-4" />
                            ))
                        }
                    </div>
                    <div className="flex flex-wrap mb-3">
                        {
                            post.tags.map(tag => (
                                <span key={tag} className="mr-2 border border-white px-2 py-1 hover:bg-white hover:text-black cursor-pointer">{tag}</span>
                            ))
                        }
                    </div>
                </div>
                :
                <p className="text-lg mb-3">
                    Loading...
                </p>
            }
        </Layout>
    )
}