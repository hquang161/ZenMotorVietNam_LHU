document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);

    if (!product) {
        window.location.href = 'products.html';
        return;
    }

    document.title = `${product.name} - ZenMotorVietNam`;
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('main-product-image').src = product.image;
    document.getElementById('detail-product-name').textContent = product.name;
    document.getElementById('detail-brand').textContent = product.brand;
    document.getElementById('detail-category').textContent = product.category;
    document.getElementById('detail-price').textContent = product.price;
    document.getElementById('detail-battery').textContent = product.battery;
    document.getElementById('detail-range').textContent = product.range;
    document.getElementById('detail-description').textContent = product.description;

    const thumbnailList = document.getElementById('thumbnail-list');
    product.images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image;
        imgElement.classList.add('thumbnail');
        imgElement.addEventListener('click', () => {
            document.getElementById('main-product-image').src = image;
        });
        thumbnailList.appendChild(imgElement);
    });
});

// Hàm tạo card sản phẩm (giống như trong main.js)
function createProductCard(product) {
    const productName = encodeURIComponent(product.name);
    const placeholderImage = `https://via.placeholder.com/300x200/4CAF50/ffffff?text=${productName}`;
    
    return `
        <div class="product-card">
            <a href="product-detail.html?id=${product.id}">
                <img src="${placeholderImage}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-price">${product.price}</p>
                    <p class="product-specs">
                        <span><i class="fas fa-battery-full"></i> ${product.battery}</span>
                        <span><i class="fas fa-road"></i> ${product.range}</span>
                    </p>
                    <p class="product-brand"><i class="fas fa-industry"></i> ${product.brand}</p>
                    <p class="product-category"><i class="fas fa-tag"></i> ${product.category}</p>
                </div>
            </a>
        </div>
    `;
}
// hàm sản phẩm con
document.addEventListener("DOMContentLoaded", function () {
    const mainImage = document.getElementById("main-product-image");
    const thumbnails = document.querySelectorAll(".thumbnail");

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener("click", function () {
            mainImage.src = this.src;
        });
    });
});