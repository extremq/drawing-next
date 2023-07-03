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
        <div className="mb-2">
                <p className="text-white text-sm font-bold mb-2">
                    Tag suggestions:
                </p>
                {
                    matchingTags.length > 0 ?
                    <div className="flex flex-wrap">
                        {
                            matchingTags.map((tag) => {
                                return (
                                    <button
                                        key={tag.name}
                                        className="text-white border py-2 px-2 hover:text-black mr-1 mb-1 hover:cursor-pointer hover:bg-white"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setSelectedTags([...selectedTags, tag.name])
                                            setCurrentTag("")
                                        }}
                                    >
                                        {tag.name} <span className="py-1 px-1 font-bold">{tag.count}</span>
                                    </button>
                                )
                            })
                        }
                    </div> :
                    <p className="text-gray-400  text-sm mb-2 italic">
                        No tag suggestions
                    </p>
                }
        </div>
    )

}
