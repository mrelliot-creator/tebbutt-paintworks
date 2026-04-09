/* PREMIUM GALLERY – FAST, RELIABLE, NO API */

const galleryImages = [
    "assets/gallery/img1.jpg",
    "assets/gallery/img2.jpg",
    "assets/gallery/img3.jpg",
    "assets/gallery/img4.jpg"
    // 👉 ADD YOUR IMAGES HERE
];

let currentIndex = 0;

function loadGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;

    grid.innerHTML = '';

    galleryImages.forEach((src, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';

        item.innerHTML = `
            <img src="${src}" alt="Project image" loading="lazy">
        `;

        item.addEventListener('click', () => openLightbox(index));
        grid.appendChild(item);
    });
}

function openLightbox(index) {
    currentIndex = index;

    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');

    img.src = galleryImages[currentIndex];
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

function showPrev() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    updateImage();
}

function showNext() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateImage();
}

function updateImage() {
    document.getElementById('lightbox-img').src = galleryImages[currentIndex];
}

document.addEventListener('DOMContentLoaded', () => {
    loadGallery();

    document.getElementById('close-lightbox')?.addEventListener('click', closeLightbox);
    document.getElementById('prev-btn')?.addEventListener('click', showPrev);
    document.getElementById('next-btn')?.addEventListener('click', showNext);
});
