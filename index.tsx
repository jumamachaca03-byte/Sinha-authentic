// Sinha Authentic - Noir Luxury Business Logic
const WA_NUMBER = "258842321241";

// Database de Produtos
const products = [
    { 
        id: "1", name: "Vestido Fluidez Seda", category: "vestidos", price: 12890.00, 
        image: "https://images.unsplash.com/photo-1539109136881-3be0610cac48?q=80&w=1887", 
        tag: "Limitada", desc: "Produzido em seda pura com corte minimalista.",
        sizes: ["P", "M", "G"], colors: ["Noir", "Champagne", "Pérola"]
    },
    { 
        id: "2", name: "Conjunto Minimal Linho", category: "blusas", price: 8450.00, 
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920", 
        tag: "Best Seller", desc: "Conforto térmico e sofisticação urbana em linho rústico.",
        sizes: ["P", "M", "G"], colors: ["Areia", "Preto", "Branco"]
    },
    { 
        id: "3", name: "Blazer Estruturado Royale", category: "blusas", price: 14200.00, 
        image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1886", 
        tag: "Atelier", desc: "Ombreiras marcadas e alfaiataria impecável.",
        sizes: ["P", "M", "G", "GG"], colors: ["Azul Marinho", "Preto"]
    },
    { 
        id: "8", name: "Sobretudo Cashmere Noir", category: "casacos", price: 21500.00, 
        image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1887", 
        tag: "Exclusivo", desc: "Luxo e aquecimento com toque de seda.",
        sizes: ["M", "G"], colors: ["Preto", "Camelo"]
    },
    { 
        id: "9", name: "Trench Coat Urban", category: "casacos", price: 17800.00, 
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936", 
        tag: "Essencial", desc: "Corte clássico reimaginado para a mulher moderna.",
        sizes: ["P", "M", "G"], colors: ["Nude", "Verde Militar"]
    },
    { 
        id: "4", name: "Mule Minimal Noir", category: "calcados", price: 5900.00, 
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1780", 
        tag: "Essencial", desc: "Couro legítimo com acabamento fosco.",
        sizes: ["35", "36", "37", "38", "39", "40"], colors: ["Noir"]
    },
    { 
        id: "7", name: "Bota Cristal Off-White", category: "calcados", price: 3890.00, 
        image: "https://images.unsplash.com/photo-1603189343302-e603f7add05a?q=80&w=1974", 
        tag: "Lançamento", desc: "Design vanguardista com salto arquitetônico.",
        sizes: ["35", "36", "37", "38", "39", "40"], colors: ["Off-White"]
    },
    { 
        id: "5", name: "Calça Pantalona Areia", category: "calcas", price: 7200.00, 
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1887", 
        tag: "Sofisticado", desc: "Cintura alta e caimento perfeito.",
        sizes: ["36", "38", "40", "42"], colors: ["Areia", "Terra"]
    },
    { 
        id: "6", name: "Clutch Couro Artesanal", category: "acessorios", price: 11000.00, 
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069", 
        tag: "Handmade", desc: "Feita à mão por artesãos locais.",
        sizes: ["Único"], colors: ["Cognac", "Ebony"]
    }
];

// Estado da Aplicação
let currentCategory = 'todos';
let currentSort = 'featured'; 
let searchQuery = '';
let wishlist: string[] = JSON.parse(localStorage.getItem('sinha_wishlist') || '[]');

// Estado do Modal
let selectedProduct: any = null;
let selectedSize: string = '';
let selectedColor: string = '';

// Seletores DOM
const productGrid = document.getElementById('product-grid');
const emptyState = document.getElementById('empty-state');
const categoryLinks = document.querySelectorAll('.category-link');
const sortButtons = document.querySelectorAll('.sort-btn');
const categoryTitle = document.getElementById('current-category-name');
const mobileMenu = document.getElementById('mobile-menu');
const menuToggle = document.getElementById('menu-toggle');
const menuIcon = document.getElementById('menu-icon');
const mobileFilterBtns = document.querySelectorAll('.mobile-filter-btn');

// Modal Seletores
const productModalContainer = document.getElementById('product-modal-container');
const productModalContent = document.getElementById('product-modal-content');
const productModalClose = document.getElementById('product-modal-close');
const modalImage = document.getElementById('modal-product-image') as HTMLImageElement;
const modalName = document.getElementById('modal-product-name');
const modalPrice = document.getElementById('modal-product-price');
const modalTag = document.getElementById('modal-product-tag');
const sizeOptions = document.getElementById('size-options');
const colorOptions = document.getElementById('color-options');
const modalOrderBtn = document.getElementById('modal-order-btn') as HTMLButtonElement;
const modalWishlistBtn = document.getElementById('modal-wishlist-btn') as HTMLButtonElement;

// Wishlist Seletores
const wishlistDrawer = document.getElementById('wishlist-drawer');
const wishlistOverlay = document.getElementById('wishlist-overlay');
const wishlistItems = document.getElementById('wishlist-items');
const wishlistCountDesktop = document.getElementById('wishlist-count-desktop');
const wishlistCountMobile = document.getElementById('wishlist-count-mobile');
const wishlistToggleDesktop = document.getElementById('wishlist-toggle-desktop');
const wishlistToggleMobile = document.getElementById('wishlist-toggle-mobile');
const wishlistClose = document.getElementById('wishlist-close');
const wishlistClear = document.getElementById('wishlist-clear');

// Seletores de Pesquisa
const searchInputDesktop = document.getElementById('search-input-desktop') as HTMLInputElement;
const searchInputMobile = document.getElementById('search-input-mobile') as HTMLInputElement;
const suggestionsDesktop = document.getElementById('suggestions-desktop');
const suggestionsMobile = document.getElementById('suggestions-mobile');
const searchTermDisplay = document.getElementById('search-term-display');

// Lógica de Modal
function openProductModal(id: string) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    selectedProduct = product;
    selectedSize = '';
    selectedColor = '';

    // Preencher dados
    if (modalImage) modalImage.src = product.image;
    if (modalName) modalName.innerText = product.name;
    if (modalPrice) modalPrice.innerText = product.price.toLocaleString('pt-MZ', { minimumFractionDigits: 2 }) + ' MT';
    if (modalTag) modalTag.innerText = product.tag;

    // Gerar Opções de Tamanho
    if (sizeOptions) {
        sizeOptions.innerHTML = (product.sizes || []).map(size => `
            <button onclick="window.selectSize('${size}')" data-size="${size}" class="option-btn px-4 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 bg-transparent">
                ${size}
            </button>
        `).join('');
    }

    // Gerar Opções de Cor
    if (colorOptions) {
        colorOptions.innerHTML = (product.colors || []).map(color => `
            <button onclick="window.selectColor('${color}')" data-color="${color}" class="option-btn px-4 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 bg-transparent">
                ${color}
            </button>
        `).join('');
    }

    // Atualizar Botão Wishlist no Modal
    updateModalWishlistBtn();

    // Mostrar Modal
    if (productModalContainer) {
        productModalContainer.classList.remove('hidden');
        setTimeout(() => {
            productModalContainer.classList.add('opacity-100');
            productModalContent?.classList.remove('scale-95');
            productModalContent?.classList.add('scale-100');
        }, 10);
    }
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    if (productModalContainer) {
        productModalContainer.classList.remove('opacity-100');
        productModalContent?.classList.remove('scale-100');
        productModalContent?.classList.add('scale-95');
        setTimeout(() => {
            productModalContainer.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    }
}

function selectSize(size: string) {
    selectedSize = size;
    document.querySelectorAll('#size-options .option-btn').forEach(btn => {
        btn.classList.toggle('selected', (btn as HTMLElement).dataset.size === size);
    });
}

function selectColor(color: string) {
    selectedColor = color;
    document.querySelectorAll('#color-options .option-btn').forEach(btn => {
        btn.classList.toggle('selected', (btn as HTMLElement).dataset.color === color);
    });
}

function updateModalWishlistBtn() {
    if (!modalWishlistBtn || !selectedProduct) return;
    const isWishlisted = wishlist.includes(selectedProduct.id);
    modalWishlistBtn.innerText = isWishlisted ? 'Remover do Carrinho' : 'Adicionar ao Carrinho';
}

function confirmOrder() {
    if (!selectedProduct) return;

    // Verificar seleções
    if (selectedProduct.sizes.length > 0 && !selectedSize) {
        alert('Por favor, selecione um tamanho.');
        return;
    }
    if (selectedProduct.colors.length > 0 && !selectedColor) {
        alert('Por favor, selecione uma cor.');
        return;
    }

    const message = `Olá Sinha Authentic! Gostaria de encomendar:\n\n*Peça:* ${selectedProduct.name}\n${selectedSize ? `*Tamanho:* ${selectedSize}\n` : ''}${selectedColor ? `*Cor:* ${selectedColor}\n` : ''}*Preço:* ${selectedProduct.price.toLocaleString('pt-MZ', { minimumFractionDigits: 2 })} MT\n\nPodem me informar a disponibilidade e prazo de entrega?`;
    
    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
}

// Global Access para o onclick do HTML injetado
(window as any).openProductModal = openProductModal;
(window as any).selectSize = selectSize;
(window as any).selectColor = selectColor;
(window as any).confirmOrder = confirmOrder;

// Função de Wishlist logic
function toggleWishlist(id: string) {
    const index = wishlist.indexOf(id);
    if (index === -1) {
        wishlist.push(id);
    } else {
        wishlist.splice(index, 1);
    }
    localStorage.setItem('sinha_wishlist', JSON.stringify(wishlist));
    updateWishlistUI();
    updateModalWishlistBtn();
    render(); 
}

function updateWishlistUI() {
    const count = wishlist.length;
    [wishlistCountDesktop, wishlistCountMobile].forEach(el => {
        if (el) {
            el.innerText = count.toString();
            el.classList.toggle('hidden', count === 0);
        }
    });

    if (wishlistItems) {
        if (wishlist.length === 0) {
            wishlistItems.innerHTML = `
                <div class="flex flex-col items-center justify-center h-64 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-zinc-800 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p class="font-serif italic text-zinc-600 text-sm tracking-widest">Seu carrinho está vazio.</p>
                </div>
            `;
        } else {
            const savedProducts = products.filter(p => wishlist.includes(p.id));
            wishlistItems.innerHTML = savedProducts.map(p => `
                <div class="flex items-center space-x-6 border-b border-zinc-900 pb-6 group/wish-item cursor-pointer hover:bg-zinc-950/50 transition-colors duration-300" onclick="window.openProductModal('${p.id}')">
                    <img src="${p.image}" class="w-16 h-20 object-cover rounded-sm border border-zinc-800 group-hover/wish-item:border-sinha transition-colors">
                    <div class="flex-1">
                        <div class="flex justify-between items-start">
                            <h3 class="text-[9px] font-black uppercase tracking-widest text-white group-hover/wish-item:text-sinha transition-colors">${p.name}</h3>
                            <button onclick="event.stopPropagation(); window.removeWishlistItem('${p.id}')" class="text-zinc-600 hover:text-red-500 transition-colors p-1 -mr-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <p class="text-sinha text-[9px] font-serif italic mt-1">${p.price.toLocaleString('pt-MZ', { minimumFractionDigits: 2 })} MT</p>
                        <span class="inline-block mt-3 text-[7px] uppercase tracking-widest font-black border-b border-sinha pb-0.5 text-zinc-500">Clique para Encomendar</span>
                    </div>
                </div>
            `).join('');
        }
    }
}

(window as any).toggleWishlist = toggleWishlist;
(window as any).removeWishlistItem = toggleWishlist;

function toggleWishlistDrawer(open: boolean) {
    if (wishlistDrawer && wishlistOverlay) {
        if (open) {
            wishlistDrawer.classList.add('active');
            wishlistOverlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        } else {
            wishlistDrawer.classList.remove('active');
            wishlistOverlay.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }
}

function render() {
    if (!productGrid) return;

    let filtered = currentCategory === 'todos' 
        ? [...products] 
        : products.filter(p => p.category === currentCategory);

    if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(q) || 
            p.category.toLowerCase().includes(q)
        );
        
        if (searchTermDisplay) {
            searchTermDisplay.classList.remove('hidden');
            searchTermDisplay.querySelector('span')!.innerText = searchQuery;
        }
    } else {
        searchTermDisplay?.classList.add('hidden');
    }

    if (currentSort === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
    }

    productGrid.innerHTML = '';
    
    if (filtered.length === 0) {
        emptyState?.classList.remove('hidden');
    } else {
        emptyState?.classList.add('hidden');
        filtered.forEach(product => {
            const isWishlisted = wishlist.includes(product.id);
            const card = document.createElement('div');
            card.className = 'group bg-black p-6 md:p-10 transition-all duration-500 hover:bg-zinc-950 border-r border-b border-zinc-800 product-fade';
            card.innerHTML = `
                <div class="relative aspect-[4/5] mb-8 overflow-hidden bg-zinc-900 border border-zinc-800 cursor-pointer" onclick="window.openProductModal('${product.id}')">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover transition duration-700">
                    
                    <button onclick="event.stopPropagation(); window.toggleWishlist('${product.id}')" class="absolute top-4 right-4 p-2.5 bg-black/80 backdrop-blur rounded-full opacity-100 transition-all duration-300 shadow-xl z-10 text-white">
                         <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="${isWishlisted ? 'currentColor' : 'none'}" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </button>

                    <div class="absolute bottom-4 left-4 bg-sinha text-black px-2 py-0.5 text-[7px] tracking-[0.2em] uppercase font-black">${product.tag}</div>
                </div>
                
                <div class="space-y-1">
                    <h3 class="text-[11px] md:text-[13px] tracking-[0.2em] font-black uppercase text-white group-hover:text-sinha transition cursor-pointer" onclick="window.openProductModal('${product.id}')">${product.name}</h3>
                    <p class="text-sinha text-sm font-serif italic">${product.price.toLocaleString('pt-MZ', { minimumFractionDigits: 2 })} MT</p>
                    
                    <div class="pt-1.5">
                        <button onclick="window.openProductModal('${product.id}')" class="block w-full bg-sinha text-black py-4 text-[9px] tracking-[0.4em] font-black uppercase hover:bg-white text-center transition-colors duration-300">Encomendar</button>
                    </div>
                </div>
            `;
            productGrid.appendChild(card);
        });
    }
}

function setCategory(cat: string) {
    currentCategory = cat;
    searchQuery = ''; 
    if (searchInputDesktop) searchInputDesktop.value = '';
    if (searchInputMobile) searchInputMobile.value = '';
    
    categoryLinks.forEach(link => {
        const btn = link as HTMLElement;
        if (btn.dataset.cat === cat) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    if (mobileMenu?.classList.contains('active')) {
        toggleMenu();
    }

    if (categoryTitle) {
        categoryTitle.innerText = cat === 'todos' ? 'Peças em Destaque' : cat;
    }
    
    render();
    document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' });
}

function setSort(sort: string) {
    currentSort = sort;
    sortButtons.forEach(btn => {
        const b = btn as HTMLElement;
        if (b.dataset.sort === sort) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });
    render();
}

function toggleMenu() {
    if (!mobileMenu || !menuIcon) return;
    const isOpen = mobileMenu.classList.toggle('active');
    menuIcon.innerHTML = isOpen 
        ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />'
        : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M4 6h16M4 12h16m-7 6h7" />';
    document.body.style.overflow = isOpen ? 'hidden' : '';
}

function showSuggestions(query: string, container: HTMLElement | null) {
    if (!container) return;
    if (query.length < 2) {
        container.classList.add('hidden');
        return;
    }

    const q = query.toLowerCase();
    const matches = products.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q)
    ).slice(0, 5);

    if (matches.length > 0) {
        container.classList.remove('hidden');
        container.innerHTML = matches.map(p => `
            <div class="search-suggestion-item flex items-center p-4 cursor-pointer transition bg-black" data-name="${p.name}">
                <img src="${p.image}" class="w-10 h-12 object-cover mr-4 border border-zinc-800">
                <div class="flex flex-col">
                    <span class="text-[9px] font-black uppercase tracking-widest text-white">${p.name}</span>
                    <span class="text-[7px] text-zinc-600 uppercase tracking-widest mt-1">${p.category}</span>
                </div>
            </div>
        `).join('');

        container.querySelectorAll('.search-suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const name = (item as HTMLElement).dataset.name || '';
                searchQuery = name;
                if (searchInputDesktop) searchInputDesktop.value = name;
                if (searchInputMobile) searchInputMobile.value = name;
                container.classList.add('hidden');
                render();
                document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' });
            });
        });
    } else {
        container.classList.add('hidden');
    }
}

searchInputDesktop?.addEventListener('input', (e) => showSuggestions((e.target as HTMLInputElement).value, suggestionsDesktop));
searchInputMobile?.addEventListener('input', (e) => showSuggestions((e.target as HTMLInputElement).value, suggestionsMobile));

document.addEventListener('click', (e) => {
    if (!suggestionsDesktop?.contains(e.target as Node) && e.target !== searchInputDesktop) suggestionsDesktop?.classList.add('hidden');
    if (!suggestionsMobile?.contains(e.target as Node) && e.target !== searchInputMobile) suggestionsMobile?.classList.add('hidden');
    if (e.target === productModalContainer) closeProductModal();
});

[searchInputDesktop, searchInputMobile].forEach(input => {
    input?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchQuery = (e.target as HTMLInputElement).value;
            suggestionsDesktop?.classList.add('hidden');
            suggestionsMobile?.classList.add('hidden');
            render();
            document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

categoryLinks.forEach(link => link.addEventListener('click', () => setCategory((link as HTMLElement).dataset.cat || 'todos')));
sortButtons.forEach(btn => btn.addEventListener('click', () => setSort((btn as HTMLElement).dataset.sort || 'featured')));
mobileFilterBtns.forEach(btn => btn.addEventListener('click', () => setCategory((btn as HTMLElement).dataset.filter || 'todos')));
menuToggle?.addEventListener('click', toggleMenu);

[wishlistToggleDesktop, wishlistToggleMobile].forEach(btn => btn?.addEventListener('click', () => toggleWishlistDrawer(true)));
wishlistClose?.addEventListener('click', () => toggleWishlistDrawer(false));
wishlistOverlay?.addEventListener('click', () => toggleWishlistDrawer(false));
wishlistClear?.addEventListener('click', () => {
    if (confirm('Limpar seu carrinho de interesse?')) {
        wishlist = [];
        localStorage.setItem('sinha_wishlist', JSON.stringify(wishlist));
        updateWishlistUI();
        render();
    }
});

// Modal Event Listeners
productModalClose?.addEventListener('click', closeProductModal);
modalOrderBtn?.addEventListener('click', confirmOrder);
modalWishlistBtn?.addEventListener('click', () => {
    if (selectedProduct) toggleWishlist(selectedProduct.id);
});

window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    window.scrollY > 50 ? nav?.classList.add('border-zinc-700') : nav?.classList.remove('border-zinc-700');
});

console.log('Sinha Authentic: Noir Boutique Active (Mozambique).');
updateWishlistUI();
render();