export default function ImageSelector({ images, setImages }) {
    return (
        <div>
            <label
                className="block text-white text-sm font-bold mb-3"
            >
                Images (.webp):
            </label>
            <label
                htmlFor="image"
                className="hover:cursor-pointer bg-white hover:bg-blue-100 text-black py-2 px-3 rounded font-bold"
            >
                +
            </label>
            <div className="mt-4">
                {
                    // Display images in a thumbnail grid
                    <div className="grid grid-cols-3 gap-3">
                        {
                            images.map((image) => {
                                return (
                                    <img
                                        key={image.name}
                                        src={URL.createObjectURL(image)}
                                        alt={image.name}
                                        className="w-full aspect-square object-cover border-2 rounded-md hover:cursor-pointer hover:border-red-500"
                                        onClick={() => {
                                            // Remove image from array
                                            setImages(images.filter((img) => {
                                                return img !== image
                                            }))
                                        }}
                                    />
                                )
                            })
                        }
                    </div>
                }
            </div>
            <input
                className="hidden"
                type="file"
                name="image"
                id="image"
                accept=".webp"
                multiple
                onChange={(e) => {
                    // Only add images that are not already in the array
                    const newImages = [...images]
                    for (let i = 0; i < e.target.files.length; i++) {
                        const file = e.target.files[i]
                        
                        // Compare file names
                        let duplicate = false
                        for (let j = 0; j < newImages.length; j++) {
                            if (newImages[j].name === file.name) {
                                duplicate = true
                                break
                            }
                        }

                        if (!duplicate) {
                            newImages.push(file)
                        }
                    }
                    
                    setImages(newImages)
                }}
            />
        </div>
    )
}