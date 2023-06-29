import { useEffect, useState } from "react"

export default function TagSuggestions({ tags, selectedTags, currentTag, setCurrentTag, setSelectedTags }) {
    const [matchingTags, setMatchingTags] = useState([])

    useEffect(() => {
        if (tags.length === 0) {
            return
        }

        // Search for tags that match currentTag
        const matchingTags = tags.filter((tag) => {
            return tag.name.toLowerCase().includes(currentTag.toLowerCase())
        })

        // Sort by count
        matchingTags.sort((a, b) => {
            return b.count - a.count
        })

        // Remove tags that are already selected
        const filteredMatchingTags = matchingTags.filter((tag) => {
            return !selectedTags.includes(tag.name)
        })

        // Limit to 20 if more than 20
        if (filteredMatchingTags.length > 20) {
            filteredMatchingTags.length = 20
        }

        // Set matching tags
        setMatchingTags(filteredMatchingTags)
    }, [currentTag, selectedTags, tags])

    return (
        <div>
            {
                matchingTags.length > 0 &&
                <>
                    <p className="text-white text-sm font-bold mb-2">
                        Tag suggestions:
                    </p>
                    <div className="flex flex-wrap">
                        {
                            matchingTags.map((tag) => {
                                return (
                                    <button
                                        key={tag.name}
                                        className="bg-white text-black py-2 px-2 rounded-md mr-1 mb-1 hover:cursor-pointer hover:bg-blue-100"
                                        onClick={() => {
                                            setSelectedTags([...selectedTags, tag.name])
                                            setCurrentTag("")
                                        }}
                                    >
                                        {tag.name} <span className="bg-peri py-1 px-1 rounded-md">{tag.count}</span>
                                    </button>
                                )
                            })
                        }
                    </div>
                </>
            }
        </div>
    )

}
