const gallery = document.querySelector(".gallery");
const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

/* IMAGE DATA */
const images = [
    { src: "assets/images/nature1.avif", category: "nature" },
    { src: "assets/images/nature2.avif", category: "nature" },
    { src: "assets/images/nature3.avif", category: "nature" },
    { src: "assets/images/nature4.avif", category: "nature" },
    { src: "assets/images/nature5.avif", category: "nature" },
    { src: "assets/images/nature6.avif", category: "nature" },
    { src: "assets/images/city1.avif", category: "city" },
    { src: "assets/images/city2.avif", category: "city" },
    { src: "assets/images/city3.avif", category: "city" },
    { src: "assets/images/city4.avif", category: "city" },
    { src: "assets/images/city5.avif", category: "city" },
    { src: "assets/images/city6.avif", category: "city" },
    { src: "assets/images/object1.avif", category: "objects" },
    { src: "assets/images/object2.avif", category: "objects" },
    { src: "assets/images/object3.avif", category: "objects" },
    { src: "assets/images/object4.avif", category: "objects" },
    { src: "assets/images/object5.avif", category: "objects" },
    { src: "assets/images/object6.avif", category: "objects" },
    { src: "assets/images/abstract1.avif", category: "abstract" },
    { src: "assets/images/abstract2.avif", category: "abstract" },
    { src: "assets/images/abstract3.avif", category: "abstract" },
    { src: "assets/images/abstract4.avif", category: "abstract" },
    { src: "assets/images/abstract5.avif", category: "abstract" },
    { src: "assets/images/abstract6.avif", category: "abstract" }
];


let currentIndex = 0;
let filteredImages = [];

/* SHUFFLE FUNCTION */
function shuffleArray(array) {
    return array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

/* LOAD GALLERY */
function loadGallery(imageArray) {
    gallery.innerHTML = "";
    imageArray.forEach((img, index) => {
        const div = document.createElement("div");
        div.classList.add("gallery-item");
        div.innerHTML = `<img src="${img.src}" alt="gallery image">`;

        div.addEventListener("click", () => {
            openLightbox(index, imageArray);
        });

        gallery.appendChild(div);
    });
}

/* FILTERS */
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;

        filteredImages = filter === "all"
            ? shuffleArray([...images])
            : images.filter(img => img.category === filter);

        loadGallery(filteredImages);
    });
});

/* LIGHTBOX */
function openLightbox(index, imageArray) {
    currentIndex = index;
    filteredImages = imageArray;
    lightbox.style.display = "flex";
    updateLightbox();
}

function updateLightbox() {
    lightboxImg.src = filteredImages[currentIndex].src;
}

function closeLightbox() {
    lightbox.style.display = "none";
}

function showNext() {
    currentIndex = (currentIndex + 1) % filteredImages.length;
    updateLightbox();
}

function showPrev() {
    currentIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    updateLightbox();
}

/* EVENTS */
closeBtn.addEventListener("click", closeLightbox);
nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);

window.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
});

/* KEYBOARD SUPPORT */
document.addEventListener("keydown", e => {
    if (lightbox.style.display === "flex") {
        if (e.key === "ArrowRight") showNext();
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "Escape") closeLightbox();
    }
});


/* INITIAL LOAD (SHUFFLED) */
filteredImages = shuffleArray([...images]);
loadGallery(filteredImages);


