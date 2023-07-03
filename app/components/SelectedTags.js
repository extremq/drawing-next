export default function SelectedTags({ selectedTags, setSelectedTags }) {
    return (
        <div className="mb-2">
            <p className="text-white text-sm font-bold mb-2">
                Selected Tags:
            </p>
            {
                selectedTags.length > 0 ?
                    <div className="flex flex-wrap mb-4">
                        {
                            selectedTags.map((tag) => {
                                return (
                                    <button
                                        key={tag}
                                        className="text-white border py-2 px-2 hover:text-black mr-1 mb-1 hover:cursor-pointer hover:bg-red-500 hover:border-red-500"
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
                    :
                    <p className="text-gray-400  text-sm mb-2 italic">
                        No tags selected
                    </p>
            }
        </div>
    )
}