import Link from 'next/link'

export default function Post({ title, image, timestamp, id }) {
    return (
        <Link href={"/post/" + id}>
            <div className="border-white border cursor-pointer text-white hover:bg-white hover:text-black">
                <div className="py-4 px-3">
                    <img className="w-full aspect-square object-cover object-center mb-2" src={image.data} alt="avatar" />
                    <h1 className="text-2xl font-semibold overflowing-text truncate">{title}</h1>
                    <p className="text-sm">
                        {new Date(timestamp).toLocaleDateString("en-US", {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                </div>
            </div>
        </Link>
    )
}