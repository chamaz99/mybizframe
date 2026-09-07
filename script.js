// Navigation Bar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNavbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Gallery Filter Button Active Toggle
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
    });
});

//image filter
document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Remove active class from all buttons & add to clicked button
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            const selectedFilter = this.getAttribute("data-filter");

            galleryItems.forEach(item => {
                const category = item.getAttribute("data-category");

                if (selectedFilter === "all" || category === selectedFilter) {
                    item.style.display = "block";
                    setTimeout(() => {
                        item.style.opacity = "1";
                        item.style.transform = "scale(1)";
                    }, 50);
                } else {
                    item.style.opacity = "0";
                    item.style.transform = "scale(0.8)";
                    setTimeout(() => {
                        item.style.display = "none";
                    }, 300);
                }
            });
        });
    });
});

// 2. IMAGE LIGHTBOX PREVIEW FUNCTION
function openPreview(imageSrc, titleText) {
    document.getElementById('previewImage').src = imageSrc;
    document.getElementById('previewTitle').innerText = titleText;
    
    var previewModal = new bootstrap.Modal(document.getElementById('imagePreviewModal'));
    previewModal.show();
}

// Selected Frame Global Variables
let selectedFrameData = {
    name: "",
    size: "",
    price: 0
};

// 1. Select Frame and Scroll to Order Form
function selectFrame(name, size, price) {
    selectedFrameData.name = name;
    selectedFrameData.size = size;
    selectedFrameData.price = price;

    document.getElementById('summaryName').innerText = name;
    document.getElementById('summarySize').innerText = size;
    document.getElementById('summaryPrice').innerText = "LKR " + price.toLocaleString();

    calculateTotal();

    // Smooth Scroll to Order Section
    document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
}

// 2. Calculate Total Amount
function calculateTotal() {
    let qty = parseInt(document.getElementById('orderQty').value) || 1;
    let total = selectedFrameData.price * qty;
    document.getElementById('summaryTotal').innerText = "LKR " + total.toLocaleString();
}

// 3. Send Order Details to WhatsApp
function sendWhatsAppOrder(event) {
    event.preventDefault();

    if (!selectedFrameData.name) {
        alert("Please select a frame from the table first!");
        return;
    }

    const myWhatsAppNumber = "94771234567"; // <-- මෙතනට ඔබේ WhatsApp නම්බර් එක දාන්න

    const custName = document.getElementById('custName').value;
    const custAddress = document.getElementById('custAddress').value;
    const qty = document.getElementById('orderQty').value;
    const totalAmount = selectedFrameData.price * qty;

    // Format WhatsApp Message
    const message = `*NEW FRAME ORDER - CHAMAZ CREATION*%0A%0A` +
        `*Customer Name:* ${custName}%0A` +
        `*Address:* ${custAddress}%0A%0A` +
        `*--- ORDER DETAILS ---*%0A` +
        `*Frame:* ${selectedFrameData.name}%0A` +
        `*Size:* ${selectedFrameData.size}%0A` +
        `*Unit Price:* LKR ${selectedFrameData.price}%0A` +
        `*Quantity:* ${qty}%0A` +
        `*Total Price:* LKR ${totalAmount.toLocaleString()}%0A%0A` +
        `Please confirm my order!`;

    const whatsappURL = `https://wa.me/${myWhatsAppNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
}