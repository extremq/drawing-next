import { useState, useEffect } from "react";
import TagSuggestions from "./TagSuggestions";
import SelectedTags from "./SelectedTags";

export default function TagSelector({ setSelectedTags, selectedTags }) {
    const [tags, setTags] = useState([]) // Array of objects {name, count}
    const [currentTag, setCurrentTag] = useState("") // Current tag
    const [error, setError] = useState(null) // Error message

    // Fetch tags
    useEffect(() => {
        const fetchTags = async () => {
            try {
                const res = await fetch("/api/tags");
                if (!res.ok) {
                    throw new Error("Couldn't fetch tag suggestions.");
                } else {
                    const data = await res.json();
                    setTags(data.tags);
                }
            } catch (error) {
                setError(error.message);
            }
        }

        fetchTags();
    }, [])


    const setAndCleanCurrentTag = (tag) => {
        // Initial tag
        let initialTag = tag

        // Lowercase
        tag = tag.toLowerCase()

        // Remove whitespace
        tag = tag.replace(/\s/g, '')

        // Remove everything except letters, numbers and dashes
        tag = tag.replace(/[^a-z0-9-]/g, '')

        if (initialTag !== tag) {
            setError("Tags can only contain lowercase letters, numbers and dashes")
        } else {
            setError(null)
        }

        setCurrentTag(tag)
    }

    const removeDuplicatesAndSetSelectedTags = (tags) => {
        const uniqueTags = [...new Set(tags)]

        // Show error if tags are duplicated
        if (uniqueTags.length !== tags.length) {
            setError("Tags must be unique")
        } else {
            setError(null)
        }
        
        setSelectedTags(uniqueTags)
    }

    return (
        <div>
            <label
                className="block text-white text-sm font-bold mb-2"
            >
                Tags:
            </label>
            <div className="mb-4">
                <div className="flex">
                    <input
                        className={`flex-grow px-3 py-2 mr-1 text-black border-2 rounded-md ${error ? "border-red-500" : ""}`}
                        type="text"
                        name="tag"
                        id="tag"
                        placeholder="Add a tag..."
                        value={currentTag}
                        onChange={(e) => setAndCleanCurrentTag(e.target.value)}
                    />
                    <button
                        className="bg-peri hover:bg-peri-dark text-black font-bold py-2 px-4 rounded-md"
                        onClick={(e) => {
                            e.preventDefault()
                            if (currentTag.length > 0) {
                                removeDuplicatesAndSetSelectedTags([...selectedTags, currentTag])
                                setCurrentTag("")
                            }
                        }}
                    >
                        +
                    </button>
                </div>
                <p className="text-red-500 text-sm mt-1">{error}</p>
            </div>
            <TagSuggestions
                tags={tags}
                selectedTags={selectedTags}
                currentTag={currentTag}
                setCurrentTag={setAndCleanCurrentTag}
                setSelectedTags={removeDuplicatesAndSetSelectedTags}
            />
            <SelectedTags
                selectedTags={selectedTags}
                setSelectedTags={removeDuplicatesAndSetSelectedTags}
            />
        </div>
    )
} 