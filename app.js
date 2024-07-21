document.addEventListener('DOMContentLoaded', () => {
    const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";
    const inputElement = document.getElementById('searchInput');
    const photoGallery = document.getElementById('photoGallery');
    let input = "moon";

    const fetchPhotos = async (page) => {
        photoGallery.innerHTML = ""; // Clear the existing photos
        const searchQuery = input.trim() === "" ? "moon" : input;

        try {
            const url = `https://api.unsplash.com/search/photos?page=${page}&query=${searchQuery}&client_id=${accessKey}`;
            const response = await fetch(url);
            const data = await response.json();

            // Append new photos to the existing ones
            data.results.forEach(photo => {
                const img = document.createElement('img');
                img.src = photo.urls.small;
                img.alt = photo.alt_description;
                photoGallery.appendChild(img);
            });

            if (data.results.length === 0) {
                photoGallery.innerHTML = "<p>No photos found</p>";
            }

            console.log(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleInputChange = (e) => {
        input = e.target.value;
        fetchPhotos(1);
    };

    inputElement.addEventListener('input', handleInputChange);

    fetchPhotos(1);
    fetchPhotos(2);
    fetchPhotos(3);
    fetchPhotos(4);
});
