/* Gallery page only – dynamic GitHub API + lightbox */

const OWNER = 'mrelliot-creator';   // ← Your GitHub username (already filled in)
const REPO = 'tebbutt-paintworks';  // ← Your repo name (already filled in)

let currentImages = [];
let currentIndex = 0;

async function loadGallery() {
    const grid = document.getElementById('gallery-grid');
    const fallback = document.getElementById('gallery-fallback');
    
    if (!grid) return; // Not on gallery page

    try {
        const apiUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/assets/gallery`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) throw new Error('GitHub API error');
        
        const files = await response.json();
        
        // Filter only image files
        const imageFiles = files.filter(file => 
            file.type === 'file' && /\.(jpe?g|png|webp)$/i.test(file.name)
        );
        
        if (imageFiles.length === 0) {
            fallback.classList.remove('hidden');
            return;
        }
        
        grid.innerHTML = '';
        currentImages = imageFiles;
        
        imageFiles.forEach((file, index) => {
            const rawUrl = `https://raw.githubusercontent.com/${OWNER}/${REPO}/main/assets/gallery/${file.name}`;
            const caption = formatCaption(file.name);
            
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `
                <img src="${rawUrl}" alt="${caption}" loading="lazy">
                <p class="caption">${caption}</p>
            `;
            item.addEventListener('click', () => openLightbox(index));
            grid.appendChild(item);
        });
        
        fallback.classList.add('hidden');
        
    } catch (err) {
        console.error(err);
        fallback.classList.remove('hidden');
    }
}

function formatCaption(filename) {
    return filename
        .replace(/\.(jpe?g|png|webp)$/i, '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());
}

function openLightbox(index) {
    currentIndex = index;
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const captionEl = document.getElementById('lightbox-caption');
    
    const file = currentImages[currentIndex];
    const rawUrl = `https://raw.githubusercontent.com/${OWNER}/${REPO}/main/assets/gallery/${file.name}`;
    
    img.src = rawUrl;
    captionEl.textContent = formatCaption(file.name);
    lightbox.style.display = 'flex';
    
    document.addEventListener('keydown', handleLightboxKey);
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.removeEventListener('keydown', handleLightboxKey);
}

function showPrev() {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateLightboxImage();
}

function showNext() {
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const file = currentImages[currentIndex];
    const rawUrl = `https://raw.githubusercontent.com/${OWNER}/${REPO}/main/assets/gallery/${file.name}`;
    document.getElementById('lightbox-img').src = rawUrl;
    document.getElementById('lightbox-caption').textContent = formatCaption(file.name);
}

function handleLightboxKey(e) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
}

// Initialize when gallery page loads
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('gallery-grid')) {
        loadGallery();
        
        // Lightbox buttons
        const lightbox = document.getElementById('lightbox');
        const closeBtn = document.getElementById('close-lightbox');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        if (prevBtn) prevBtn.addEventListener('click', showPrev);
        if (nextBtn) nextBtn.addEventListener('click', showNext);
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }
});
