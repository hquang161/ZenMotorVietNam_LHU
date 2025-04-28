// Số sản phẩm hiển thị ban đầu
const PRODUCTS_PER_PAGE = 8;
let currentlyShownProducts = PRODUCTS_PER_PAGE;
let filteredProducts = [...products];

// Khởi tạo trang
document.addEventListener('DOMContentLoaded', () => {
    populateFilters();
    displayProducts();
    setupEventListeners();
});

// Thiết lập các event listeners
function setupEventListeners() {
    document.getElementById('search-input').addEventListener('input', handleSearch);
    document.getElementById('search-btn').addEventListener('click', handleSearch);
    document.getElementById('brand-filter').addEventListener('change', handleFilters);
    document.getElementById('category-filter').addEventListener('change', handleFilters);
    document.getElementById('price-filter').addEventListener('change', handleFilters);
    document.getElementById('sort-select').addEventListener('change', handleSort);
    document.getElementById('filter-reset').addEventListener('click', resetFilters);
    document.getElementById('load-more-btn').addEventListener('click', loadMore);
}

// Điền dữ liệu vào các bộ lọc
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

// Xử lý tìm kiếm
function handleSearch() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    resetDisplay();
}

// Xử lý bộ lọc
function handleFilters() {
    const brandValue = document.getElementById('brand-filter').value;
    const categoryValue = document.getElementById('category-filter').value;
    const priceValue = document.getElementById('price-filter').value;

    filteredProducts = products.filter(product => {
        const matchBrand = !brandValue || product.brand === brandValue;
        const matchCategory = !categoryValue || product.category === categoryValue;
        
        let matchPrice = true;
        if (priceValue) {
            const price = parseInt(product.price.replace(/[^\d]/g, '')) / 1000000; // Chuyển đổi sang triệu
            switch(priceValue) {
                case '0-20':
                    matchPrice = price < 20;
                    break;
                case '20-50':
                    matchPrice = price >= 20 && price <= 50;
                    break;
                case '50+':
                    matchPrice = price > 50;
                    break;
            }
        }
        
        return matchBrand && matchCategory && matchPrice;
    });
    
    resetDisplay();
}

// Xử lý sắp xếp
function handleSort() {
    const sortValue = document.getElementById('sort-select').value;
    
    switch(sortValue) {
        case 'name-asc':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'price-asc':
            filteredProducts.sort((a, b) => {
                const priceA = parseInt(a.price.replace(/[^\d]/g, ''));
                const priceB = parseInt(b.price.replace(/[^\d]/g, ''));
                return priceA - priceB;
            });
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => {
                const priceA = parseInt(a.price.replace(/[^\d]/g, ''));
                const priceB = parseInt(b.price.replace(/[^\d]/g, ''));
                return priceB - priceA;
            });
            break;
    }
    
    displayProducts();
}

// Reset bộ lọc
function resetFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('brand-filter').value = '';
    document.getElementById('category-filter').value = '';
    document.getElementById('price-filter').value = '';
    document.getElementById('sort-select').value = 'name-asc';
    
    filteredProducts = [...products];
    resetDisplay();
}

// Reset hiển thị
function resetDisplay() {
    currentlyShownProducts = PRODUCTS_PER_PAGE;
    displayProducts();
}

// Hiển thị sản phẩm
function displayProducts() {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';
    
    const productsToShow = filteredProducts.slice(0, currentlyShownProducts);
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.innerHTML += productCard;
    });

    // Hiển thị/ẩn nút "Xem thêm"
    const loadMoreContainer = document.getElementById('load-more-container');
    if (filteredProducts.length > currentlyShownProducts) {
        loadMoreContainer.style.display = 'block';
    } else {
        loadMoreContainer.style.display = 'none';
    }
}

// Tạo card sản phẩm
function createProductCard(product) {
    const productName = encodeURIComponent(product.name);
    const placeholderImage = `https://via.placeholder.com/300x200/4CAF50/ffffff?text=${productName}`;
    return `
        <div class="product-card">
            <a href="product-detail.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null;this.src='${placeholderImage}';">
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

// Xem thêm sản phẩm
function loadMore() {
    currentlyShownProducts += PRODUCTS_PER_PAGE;
    displayProducts();
}
