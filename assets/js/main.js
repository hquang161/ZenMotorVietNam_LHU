// Initialize Swiper
const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
        delay: 5000,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// Populate filters
function populateFilters() {
    const brandFilter = document.getElementById('brand-filter');
    const categoryFilter = document.getElementById('category-filter');
    
    const brands = [...new Set(products.map(product => product.brand))];
    const categories = [...new Set(products.map(product => product.category))];
    
    brands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        brandFilter.appendChild(option);
    });
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Số sản phẩm hiển thị ban đầu
const PRODUCTS_PER_PAGE = 8;
let currentlyShownProducts = PRODUCTS_PER_PAGE;

// Create product card
function createProductCard(product) {
    const productImage = product.image || `https://via.placeholder.com/300x200/4CAF50/ffffff?text=${encodeURIComponent(product.name)}`;
    return `
        <div class="product-card">
            <a href="product-detail.html?id=${product.id}">
                <img src="${productImage}" alt="${product.name}">
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


// Display featured products
function displayFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    const featuredProducts = products.slice(0, 4); // Display first 4 products as featured
    
    featuredProducts.forEach(product => {
        featuredContainer.innerHTML += createProductCard(product);
    });
}

// Display all products
function displayProducts(filteredProducts = products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    
    // Chỉ hiển thị số lượng sản phẩm định trước
    const productsToShow = filteredProducts.slice(0, currentlyShownProducts);
    
    productsToShow.forEach(product => {
        productList.innerHTML += createProductCard(product);
    });

    // Hiển thị hoặc ẩn nút "Xem thêm" dựa trên số lượng sản phẩm
    const loadMoreContainer = document.getElementById('load-more-container');
    if (filteredProducts.length > currentlyShownProducts) {
        loadMoreContainer.style.display = 'block';
    } else {
        loadMoreContainer.style.display = 'none';
    }
}

// Hàm xử lý sự kiện nút "Xem thêm"
function loadMore() {
    currentlyShownProducts += PRODUCTS_PER_PAGE;
    const filteredProducts = getFilteredProducts();
    displayProducts(filteredProducts);
}

// Hàm lấy sản phẩm đã lọc
function getFilteredProducts() {
    const brandFilter = document.getElementById('brand-filter');
    const categoryFilter = document.getElementById('category-filter');
    
    let filteredProducts = products;
    
    if (brandFilter.value) {
        filteredProducts = filteredProducts.filter(product => product.brand === brandFilter.value);
    }
    
    if (categoryFilter.value) {
        filteredProducts = filteredProducts.filter(product => product.category === categoryFilter.value);
    }
    
    return filteredProducts;
}

// Filter products
function filterProducts() {
    currentlyShownProducts = PRODUCTS_PER_PAGE; // Reset số sản phẩm hiển thị khi lọc
    const filteredProducts = getFilteredProducts();
    displayProducts(filteredProducts);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    populateFilters();
    displayFeaturedProducts();
    displayProducts();
    
    // Add event listeners to filters
    document.getElementById('brand-filter').addEventListener('change', filterProducts);
    document.getElementById('category-filter').addEventListener('change', filterProducts);
    
    // Add event listener to load more button
    document.getElementById('load-more-btn').addEventListener('click', loadMore);
});
