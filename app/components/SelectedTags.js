export default function SelectedTags({ selectedTags, setSelectedTags }) {
    return (
        <>
            {
                selectedTags.length > 0 &&
                <>
                    <p className="text-white text-sm font-bold mb-2">
                        Selected Tags:
                    </p>
                    <div className="flex flex-wrap mb-4">
                        {
                            selectedTags.map((tag) => {
                                return (
                                    <button
                                        key={tag}
                                        className="bg-white text-black py-2 px-2 rounded-md mr-1 mb-1 hover:cursor-pointer hover:bg-red-500"
                                        onClick={() => {
                                            setSelectedTags(selectedTags.filter((selectedTag) => {
                                                return selectedTag !== tag
                                            }))
                                        }}
                                    >
                                        {tag}
                                    </button>
                                )
                            })
                        }
                    </div>
                </>
            }
        </>
    )
}