import { useState } from 'react'
import TagSelector from './TagSelector'
import ImageSelector from './ImageSelector'

export default function PostForm() {
    // Post has:
    // - Image
    // - Title
    // - Caption
    // - Tags
    // - Date

    const [title, setTitle] = useState("")
    const [caption, setCaption] = useState("")
    const [selectedTags, setSelectedTags] = useState([]) // Array of strings
    const [images, setImages] = useState([])
    const [date, setDate] = useState(new Date())
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Check if submitting
        if (submitting) return

        // Convert date to timestamp
        const timestamp = new Date(date).getTime()

        // Images are webp
        const imagesBase64 = await Promise.all(images.map(async image => {
            return {
                name: image.name,
                data: await toBase64(image)
            }
        }))

        // Create request body
        const body = {
            title: title,
            caption: caption,
            tags: selectedTags,
            timestamp: timestamp,
            images: imagesBase64
        }

        // Set submitting to true
        setSubmitting(true)

        // Send request
        try {
            const res = await fetch("/api/new-post", {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (!res.ok) {
                throw new Error("Couldn't create post.")
            } else {
                const data = await res.json()
                setError(null)
                console.log(data)
            }
        }
        catch (error) {
            setError(error.message)
        }

        // Set submitting to false
        setSubmitting(false)
    }

    // Helper function to convert a File object to Base64
    const toBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    return (
        <div>
            <form className="w-full mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="title"
                        className="block text-white text-sm font-bold mb-2"
                    >
                        Title:
                    </label>
                    <input
                        className="w-full px-3 py-2 text-black border-2 rounded-md"
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Incredible title here..."
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label
                        className="block text-white text-sm font-bold mb-2"
                    >
                        Caption:
                    </label>
                    <textarea
                        className="w-full px-3 py-2 text-black border-2 rounded-md"
                        name="caption"
                        rows={3}
                        placeholder="Your caption here..."
                        onChange={(e) => setCaption(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <TagSelector
                        name="tags"
                        setSelectedTags={setSelectedTags}
                        selectedTags={selectedTags}
                    />
                </div>

                <div className="mb-4">
                    <label
                        className="block text-white text-sm font-bold mb-2"
                    >
                        Date:
                    </label>
                    <input
                        className="w-full px-3 py-2 border-2 text-gray-400 rounded-md"
                        type="date"
                        name="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                <div className="mb-2">
                    <ImageSelector
                        images={images}
                        setImages={setImages}
                    />
                </div>

                <div>
                    <input
                        type="submit"
                        value={submitting ? "Submitting..." : "Submit"}
                        disabled={submitting}
                        className="w-full cursor-pointer bg-peri hover:bg-peri-dark disabled:bg-peri-darker text-black font-bold py-2 px-4 rounded"
                    />
                </div>

                {
                    error &&
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                }
            </form>
        </div>
    )
}