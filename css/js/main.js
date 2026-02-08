{
\rtf1\ansi\ansicpg932\cocoartf2822
   \cocoatextscaling0\cocoaplatform0{ \fonttbl\f0\fnil\fcharset0 HelveticaNeue; \f1\fnil\fcharset0 Monaco; }
   { \colortbl; \red255\green255\blue255; \red24\green30\blue42; \red246\green249\blue251; }
   { \*\expandedcolortbl;; \cssrgb\c12157\c16078\c21569; \cssrgb\c97255\c98039\c98824; }
   \paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
   \deftab720
   \pard\pardeftab720\partightenfactor0

   \f0\fs28 \cf2 \cb3 \expnd0\expndtw0\kerning0
   \outl0\strokewidth0 \strokec2  1	// ==========================================\
   2	// \uc0\u12464 \u12525 \u12540 \u12496 \u12523 \u22793 \u25968 \
   3	// ==========================================\
   4	let allProducts = []; \
   5	let filteredProducts = []; \
   6	let currentCategory = 'all'; \
   7	let currentSort = 'default'; \
   8	let searchQuery = ''; \
   9	\
   10	// ==========================================\
   11	// \uc0\u12459 \u12540 \u12488 \u31649 \u29702 \
   12	// ==========================================\
   13	class Cart \{
   \
      14	    constructor() \{
      \
         15	        this.items = this.loadCart(); \
         16	        this.updateCartCount(); \
         17	    \
      } \
      18	\
      19	    loadCart() \{
      \
         20	        const cartData = localStorage.getItem('shoppingCart'); \
         21	        return cartData ? JSON.parse(cartData) : []; \
         22	    \
      } \
      23	\
      24	    saveCart() \{
      \
         25	        localStorage.setItem('shoppingCart', JSON.stringify(this.items)); \
         26	        this.updateCartCount(); \
         27	    \
      } \
      28	\
      29	    addItem(product, quantity = 1) \{
      \
         30	        const existingItem = this.items.find(item => item.id === product.id); \
         31	        \
         32	        if (existingItem) \{
         \
            33	            existingItem.quantity += quantity; \
            34	        \
         } else \{
         \
            35	            this.items.push(\{
            \
               36	                ...product, \
               37	                quantity: quantity\
               38	            \
            }); \
            39	        \
         } \
         40	        \
         41	        this.saveCart(); \
         42	        showToast(`$\{product.name\}\uc0\u12434 \u12459 \u12540 \u12488 \u12395 \u36861 \u21152 \u12375 \u12414 \u12375 \u12383 `); \
         43	    \
      } \
      44	\
      45	    updateCartCount() \{
      \
         46	        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0); \
         47	        const cartCountElements = document.querySelectorAll('#cartCount, .cart-count-mobile'); \
         48	        cartCountElements.forEach(element => \{
         \
            49	            element.textContent = totalItems; \
            50	        \
         }); \
         51	    \
      } \
      52	\
      53	    getItemCount() \{
      \
         54	        return this.items.reduce((sum, item) => sum + item.quantity, 0); \
         55	    \
      } \
      56	\
   } \
   57	\
   58	const cart = new Cart(); \
   59	\
   60	// ==========================================\
   61	// \uc0\u21830 \u21697 \u12487 \u12540 \u12479 \u12398 \u21462 \u24471 \
   62	// ==========================================\
   63	async function fetchProducts() {
      try {
         showLoading(true);

         // サンプル商品データ（Netlify対応）
         const sampleProducts = [
            {
               id: '1',
               name: 'ワイヤレスイヤホン Pro',
               description: '高音質で快適な装着感のワイヤレスイヤホン。ノイズキャンセリング機能搭載。',
               price: 12800,
               category: 'エレクトロニクス',
               image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400',
               stock: 25,
               rating: 4.5
            },
            {
               id: '2',
               name: 'スマートウォッチ X1',
               description: '健康管理機能搭載のスマートウォッチ。心拍数・歩数計測可能。',
               price: 24800,
               category: 'エレクトロニクス',
               image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
               stock: 15,
               rating: 4.8
            },
            {
               id: '3',
               name: 'ノートパソコン ProBook',
               description: '高性能CPUと大容量SSD搭載のノートパソコン。',
               price: 89800,
               category: 'エレクトロニクス',
               image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
               stock: 8,
               rating: 4.7
            },
            {
               id: '4',
               name: 'ワイヤレスマウス',
               description: '静音設計で快適な操作感のワイヤレスマウス。',
               price: 2980,
               category: 'エレクトロニクス',
               image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400',
               stock: 50,
               rating: 4.3
            },
            {
               id: '5',
               name: 'メンズTシャツ',
               description: '綿100%の快適な着心地のTシャツ。',
               price: 3500,
               category: 'ファッション',
               image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
               stock: 100,
               rating: 4.2
            },
            {
               id: '6',
               name: 'レディースワンピース',
               description: 'エレガントなデザインのワンピース。',
               price: 8900,
               category: 'ファッション',
               image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
               stock: 30,
               rating: 4.6
            },
            {
               id: '7',
               name: 'デニムジーンズ',
               description: 'ストレッチ素材で動きやすいデニム。',
               price: 6800,
               category: 'ファッション',
               image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
               stock: 45,
               rating: 4.4
            },
            {
               id: '8',
               name: 'コーヒーメーカー',
               description: '本格的なコーヒーが楽しめる全自動コーヒーメーカー。',
               price: 15800,
               category: 'ホーム&キッチン',
               image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400',
               stock: 20,
               rating: 4.5
            },
            {
               id: '9',
               name: 'フライパンセット',
               description: 'IH対応のフッ素加工フライパン3点セット。',
               price: 7800,
               category: 'ホーム&キッチン',
               image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400',
               stock: 35,
               rating: 4.3
            },
            {
               id: '10',
               name: '掃除機ロボット',
               description: '自動充電機能付きロボット掃除機。',
               price: 32800,
               category: 'ホーム&キッチン',
               image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400',
               stock: 12,
               rating: 4.6
            },
            {
               id: '11',
               name: 'ヨガマット',
               description: '滑り止め付きの高品質ヨガマット。',
               price: 3980,
               category: 'スポーツ',
               image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400',
               stock: 60,
               rating: 4.4
            },
            {
               id: '12',
               name: 'ランニングシューズ',
               description: 'クッション性抜群のランニングシューズ。',
               price: 9800,
               category: 'スポーツ',
               image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
               stock: 40,
               rating: 4.7
            },
            {
               id: '13',
               name: 'ダンベルセット',
               description: '可変式ダンベル。5kg〜20kgまで調整可能。',
               price: 12800,
               category: 'スポーツ',
               image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
               stock: 25,
               rating: 4.5
            },
            {
               id: '14',
               name: 'ビジネス書ベストセラー',
               description: '話題のビジネス書。',
               price: 1800,
               category: '本&メディア',
               image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
               stock: 80,
               rating: 4.6
            },
            {
               id: '15',
               name: '小説「夏の物語」',
               description: '感動の青春小説。',
               price: 1500,
               category: '本&メディア',
               image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
               stock: 100,
               rating: 4.3
            },
            {
               id: '16',
               name: 'Bluetoothスピーカー',
               description: '防水機能付きポータブルスピーカー。',
               price: 5980,
               category: 'エレクトロニクス',
               image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
               stock: 45,
               rating: 4.4
            },
            {
               id: '17',
               name: 'スニーカー',
               description: 'カジュアルで歩きやすいスニーカー。',
               price: 7800,
               category: 'ファッション',
               image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400',
               stock: 55,
               rating: 4.5
            },
            {
               id: '18',
               name: '電気ケトル',
               description: '1L容量の電気ケトル。沸騰が早い。',
               price: 3800,
               category: 'ホーム&キッチン',
               image: 'https://images.unsplash.com/photo-1563788835355-b2c8e9e65e93?w=400',
               stock: 70,
               rating: 4.2
            },
            {
               id: '19',
               name: 'テニスラケット',
               description: '初心者から中級者向けテニスラケット。',
               price: 14800,
               category: 'スポーツ',
               image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400',
               stock: 18,
               rating: 4.6
            },
            {
               id: '20',
               name: '料理レシピ本',
               description: '初心者でも作れる簡単レシピ集。',
               price: 1980,
               category: '本&メディア',
               image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400',
               stock: 90,
               rating: 4.5
            }
         ];

         allProducts = sampleProducts;
         filteredProducts = allProducts;
         renderProducts();
      } catch (error) {
         console.error('商品の取得に失敗しました:', error);
         showNoProducts();
      } finally {
         showLoading(false);
      }
   }

   84	\
   85	// ==========================================\
   86	// \uc0\u21830 \u21697 \u12398 \u34920 \u31034 \
   87	// ==========================================\
   88	function renderProducts() \{
   \
      89	    const productsGrid = document.getElementById('productsGrid'); \
      90	    const noProductsDiv = document.getElementById('noProducts'); \
      91	    \
      92	    if (!filteredProducts || filteredProducts.length === 0) \{
      \
         93	        productsGrid.innerHTML = ''; \
         94	        noProductsDiv.style.display = 'block'; \
         95	        return; \
         96	    \
      } \
      97	    \
      98	    noProductsDiv.style.display = 'none'; \
      99	    \
      100	    productsGrid.innerHTML = filteredProducts.map(product => `\
   101	        <div class="product-card" onclick="goToProduct('$\{product.id\}')">\
   102	            <img src="$\{product.image || 'https://via.placeholder.com/300x300?text=No+Image'\}" \
   103	                 alt="$\{product.name\}" \
   104	                 class="product-image"\
   105	                 onerror="this.src='https://via.placeholder.com/300x300?text=No+Image'">\
   106	            <div class="product-body">\
   107	                <span class="product-category-badge">$\{product.category || '\uc0\u12381 \u12398 \u20182 '\}</span>\
   108	                <h3 class="product-name">$\{product.name\}</h3>\
   109	                <div class="product-rating">\
   110	                    $\{generateStars(product.rating || 0)\}\
   111	                    <span>($\{product.rating || 0\})</span>\
   112	                </div>\
   113	                <div class="product-price">\'a5$\{formatPrice(product.price)\}</div>\
   114	                <div class="product-stock $\{product.stock <= 0 ? 'out-of-stock' : ''\}">\
   115	                    $\{product.stock > 0 ? `\uc0\u22312 \u24235 \u12354 \u12426($\{ product.stock\ }\u20491)` : '\u22312 \u24235 \u20999 \u12428 '\}\
   116	                </div>\
   117	                <button class="btn btn-primary btn-add-to-cart" \
   118	                        onclick="addToCartFromList(event, '$\{product.id\}')"\
   119	                        $\{product.stock <= 0 ? 'disabled' : ''\}>\
   120	                    <i class="fas fa-shopping-cart"></i>\
   121	                    \uc0\u12459 \u12540 \u12488 \u12395 \u36861 \u21152 \
   122	                </button>\
   123	            </div>\
   124	        </div>\
   125	    `).join(''); \
      126	\
   } \
   127	\
   128	// ==========================================\
   129	// \uc0\u26143 \u35413 \u20385 \u12398 \u29983 \u25104 \
   130	// ==========================================\
   131	function generateStars(rating) \{
   \
      132	    const fullStars = Math.floor(rating); \
      133	    const hasHalfStar = rating % 1 >= 0.5; \
      134	    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); \
      135	    \
      136	    let stars = ''; \
      137	    for (let i = 0; i < fullStars; i++) \{
      \
         138	        stars += '<i class="fas fa-star"></i>'; \
         139	    \
      } \
      140	    if (hasHalfStar) \{
      \
         141	        stars += '<i class="fas fa-star-half-alt"></i>'; \
         142	    \
      } \
      143	    for (let i = 0; i < emptyStars; i++) \{
      \
         144	        stars += '<i class="far fa-star"></i>'; \
         145	    \
      } \
      146	    \
      147	    return stars; \
      148	\
   } \
   149	\
   150	// ==========================================\
   151	// \uc0\u20385 \u26684 \u12398 \u12501 \u12457 \u12540 \u12510 \u12483 \u12488 \
   152	// ==========================================\
   153	function formatPrice(price) \{
   \
      154	    return price.toString().replace(/\\B(?=(\\d\{3\})+(?!\\d))/g, ','); \
      155	\
   } \
   156	\
   157	// ==========================================\
   158	// \uc0\u21830 \u21697 \u35443 \u32048 \u12506 \u12540 \u12472 \u12408 \u36983 \u31227 \
   159	// ==========================================\
   160	function goToProduct(productId) \{
   \
      161	    window.location.href = `product.html?id=$\{productId\}`; \
      162	\
   } \
   163	\
   164	// ==========================================\
   165	// \uc0\u12459 \u12540 \u12488 \u12395 \u36861 \u21152 \u65288 \u19968 \u35239 \u12363 \u12425 \u65289 \
   166	// ==========================================\
   167	function addToCartFromList(event, productId) \{
   \
      168	    event.stopPropagation(); \
      169	    \
      170	    const product = allProducts.find(p => p.id === productId); \
      171	    if (product && product.stock > 0) \{
      \
         172	        cart.addItem(product, 1); \
         173	    \
      } \
      174	\
   } \
   175	\
   176	// ==========================================\
   177	// \uc0\u12459 \u12486 \u12468 \u12522 \u12540 \u12501 \u12451 \u12523 \u12479 \u12540 \
   178	// ==========================================\
   179	function setupCategoryFilters() \{
   \
      180	    const categoryButtons = document.querySelectorAll('.category-btn'); \
      181	    \
      182	    categoryButtons.forEach(button => \{
      \
         183	        button.addEventListener('click', () => \{
         \
            184	            // \uc0\u12377 \u12409 \u12390 \u12398 \u12508 \u12479 \u12531 \u12363 \u12425 active\u12463 \u12521 \u12473 \u12434 \u21066 \u38500 \
   185	            categoryButtons.forEach(btn => btn.classList.remove('active')); \
            186	            \
            187	            // \uc0\u12463 \u12522 \u12483 \u12463 \u12373 \u12428 \u12383 \u12508 \u12479 \u12531 \u12395 active\u12463 \u12521 \u12473 \u12434 \u36861 \u21152 \
   188	            button.classList.add('active'); \
            189	            \
            190	            // \uc0\u12459 \u12486 \u12468 \u12522 \u12540 \u12434 \u35373 \u23450 \
   191	            currentCategory = button.dataset.category; \
            192	            \
            193	            // \uc0\u12501 \u12451 \u12523 \u12479 \u12540 \u12434 \u36969 \u29992 \
   194	            applyFilters(); \
            195	        \
         }); \
         196	    \
      }); \
      197	\
   } \
   198	\
   199	// ==========================================\
   200	// \uc0\u26908 \u32034 \u27231 \u33021 \
   201	// ==========================================\
   202	function setupSearch() \{
   \
      203	    const searchInput = document.getElementById('searchInput'); \
      204	    const searchBtn = document.querySelector('.search-btn'); \
      205	    \
      206	    const performSearch = () => \{ \
         207	        searchQuery = searchInput.value.toLowerCase().trim(); \
      208	        applyFilters(); \
      209	    \
   }; \
   210	    \
   211	    searchBtn.addEventListener('click', performSearch); \
   212	    \
   213	    searchInput.addEventListener('keypress', (e) => \{
   \
      214	        if(e.key === 'Enter') \{
   \
      215	            performSearch(); \
      216	        \
   } \
   217	    \
}); \
218	    \
219	    // \uc0\u12522 \u12450 \u12523 \u12479 \u12452 \u12512 \u26908 \u32034 \u65288 \u12458 \u12503 \u12471 \u12519 \u12531 \u65289 \
220	    searchInput.addEventListener('input', () => \{
\
   221	        searchQuery = searchInput.value.toLowerCase().trim(); \
   222	        if(searchQuery.length === 0 || searchQuery.length >= 2) \{
\
   223	            applyFilters(); \
   224	        \
} \
225	    \}); \
226	\}\
227	\
228	// ==========================================\
229	// \uc0\u20006 \u12403 \u26367 \u12360 \u27231 \u33021 \
230	// ==========================================\
231	function setupSort() \{
\
   232	    const sortSelect = document.getElementById('sortSelect'); \
   233	    \
   234	    sortSelect.addEventListener('change', () => \{
   \
      235	        currentSort = sortSelect.value; \
      236	        applyFilters(); \
      237	    \
   }); \
   238	\
} \
239	\
240	// ==========================================\
241	// \uc0\u12501 \u12451 \u12523 \u12479 \u12540 \u12398 \u36969 \u29992 \
242	// ==========================================\
243	function applyFilters() \{
\
   244	    // \uc0\u12459 \u12486 \u12468 \u12522 \u12540 \u12501 \u12451 \u12523 \u12479 \u12540 \
   245	    if (currentCategory === 'all') \{
   \
      246	        filteredProducts = [...allProducts]; \
      247	    \
   } else \{
   \
      248	        filteredProducts = allProducts.filter(p => p.category === currentCategory); \
      249	    \
   } \
   250	    \
   251	    // \uc0\u26908 \u32034 \u12501 \u12451 \u12523 \u12479 \u12540 \
   252	    if (searchQuery) \{
   \
      253	        filteredProducts = filteredProducts.filter(p => \
         254	            p.name.toLowerCase().includes(searchQuery) ||\
         255(p.description && p.description.toLowerCase().includes(searchQuery)) ||\
         256(p.category && p.category.toLowerCase().includes(searchQuery)) \
         257); \
      258	    \
   } \
   259	    \
   260	    // \uc0\u20006 \u12403 \u26367 \u12360 \
   261	    switch (currentSort) \{
   \
      262	        case 'price-low': \
      263	            filteredProducts.sort((a, b) => a.price - b.price); \
      264	            break; \
      265	        case 'price-high': \
      266	            filteredProducts.sort((a, b) => b.price - a.price); \
      267	            break; \
      268	        case 'name': \
      269	            filteredProducts.sort((a, b) => a.name.localeCompare(b.name, 'ja')); \
      270	            break; \
      271	        case 'rating': \
      272	            filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0)); \
      273	            break; \
      274	        default: \
      275	            // \uc0\u12487 \u12501 \u12457 \u12523 \u12488 \u38918 \u24207 \u65288 ID\u12398 \u38918 \u65289 \
      276	            break; \
      277	    \
   } \
   278	    \
   279	    renderProducts(); \
   280	\
} \
281	\
282	// ==========================================\
283	// \uc0\u12525 \u12540 \u12487 \u12451 \u12531 \u12464 \u34920 \u31034 \
284	// ==========================================\
285	function showLoading(show) \{
\
   286	    const loading = document.getElementById('loading'); \
   287	    const productsGrid = document.getElementById('productsGrid'); \
   288	    \
   289	    if (show) \{
   \
      290	        loading.style.display = 'block'; \
      291	        productsGrid.style.display = 'none'; \
      292	    \
   } else \{
   \
      293	        loading.style.display = 'none'; \
      294	        productsGrid.style.display = 'grid'; \
      295	    \
   } \
   296	\
} \
297	\
298	// ==========================================\
299	// \uc0\u21830 \u21697 \u12364 \u35211 \u12388 \u12363 \u12425 \u12394 \u12356 \u34920 \u31034 \
300	// ==========================================\
301	function showNoProducts() \{
\
   302	    const productsGrid = document.getElementById('productsGrid'); \
   303	    const noProductsDiv = document.getElementById('noProducts'); \
   304	    const loading = document.getElementById('loading'); \
   305	    \
   306	    loading.style.display = 'none'; \
   307	    productsGrid.style.display = 'none'; \
   308	    noProductsDiv.style.display = 'block'; \
   309	\
} \
310	\
311	// ==========================================\
312	// \uc0\u12488 \u12540 \u12473 \u12488 \u36890 \u30693 \
313	// ==========================================\
314	function showToast(message) \{
\
   315	    const toast = document.getElementById('toast'); \
   316	    const toastMessage = document.getElementById('toastMessage'); \
   317	    \
   318	    toastMessage.textContent = message; \
   319	    toast.classList.add('show'); \
   320	    \
   321	    setTimeout(() => \{
   \
      322	        toast.classList.remove('show'); \
      323	    \
   }, 3000); \
   324	\
} \
325	\
326	// ==========================================\
327	// \uc0\u12514 \u12496 \u12452 \u12523 \u12513 \u12491 \u12517 \u12540 \
328	// ==========================================\
329	function setupMobileMenu() \{
\
   330	    const mobileMenuBtn = document.getElementById('mobileMenuBtn'); \
   331	    const mobileMenu = document.getElementById('mobileMenu'); \
   332	    const mobileMenuClose = document.getElementById('mobileMenuClose'); \
   333	    \
   334	    mobileMenuBtn?.addEventListener('click', () => \{
   \
      335	        mobileMenu.classList.add('active'); \
      336	    \
   }); \
   337	    \
   338	    mobileMenuClose?.addEventListener('click', () => \{
   \
      339	        mobileMenu.classList.remove('active'); \
      340	    \
   }); \
   341	    \
   342	    // \uc0\u12513 \u12491 \u12517 \u12540 \u22806 \u12463 \u12522 \u12483 \u12463 \u12391 \u38281 \u12376 \u12427 \
   343	    mobileMenu?.addEventListener('click', (e) => \{
   \
      344	        if(e.target === mobileMenu) \{
   \
      345	            mobileMenu.classList.remove('active'); \
      346	        \
   } \
   347	    \
}); \
348	\}\
349	\
350	// ==========================================\
351	// \uc0\u12488 \u12483 \u12503 \u12408 \u25147 \u12427 \u12508 \u12479 \u12531 \
352	// ==========================================\
353	function setupScrollTop() \{
\
   354	    const scrollTopBtn = document.getElementById('scrollTop'); \
   355	    \
   356	    window.addEventListener('scroll', () => \{
   \
      357	        if(window.scrollY > 300) \{
   \
      358	            scrollTopBtn.classList.add('active'); \
      359	        \
   } else \{
   \
      360	            scrollTopBtn.classList.remove('active'); \
      361	        \
   } \
   362	    \
}); \
363	    \
364	    scrollTopBtn?.addEventListener('click', () => \{
\
   365	        window.scrollTo(\{
   \
      366	            top: 0, \
      367	            behavior: 'smooth'\
      368	        \
   }); \
   369	    \
}); \
370	\}\
371	\
372	// ==========================================\
373	// \uc0\u12501 \u12483 \u12479 \u12540 \u12398 \u12459 \u12486 \u12468 \u12522 \u12540 \u12522 \u12531 \u12463 \
374	// ==========================================\
375	function setupFooterLinks() \{
\
   376	    const footerCategoryLinks = document.querySelectorAll('.footer a[data-category]'); \
   377	    \
   378	    footerCategoryLinks.forEach(link => \{
   \
      379	        link.addEventListener('click', (e) => \{
      \
         380	            e.preventDefault(); \
         381	            const category = link.dataset.category; \
         382	            \
         383	            // \uc0\u12488 \u12483 \u12503 \u12506 \u12540 \u12472 \u12398 \u22580 \u21512 \
   384	            if(window.location.pathname.includes('index.html') || window.location.pathname === '/') \{
   \
      385	                // \uc0\u12459 \u12486 \u12468 \u12522 \u12540 \u12508 \u12479 \u12531 \u12434 \u25506 \u12375 \u12390 \u12463 \u12522 \u12483 \u12463 \
   386	                const categoryBtn = document.querySelector(`.category-btn[data-category="$\{category\}"]`); \
      387	                if(categoryBtn) \{
   \
      388	                    categoryBtn.click(); \
      389	                    // \uc0\u21830 \u21697 \u12475 \u12463 \u12471 \u12519 \u12531 \u12395 \u12473 \u12463 \u12525 \u12540 \u12523 \
   390	                    document.getElementById('products')?.scrollIntoView(\{ behavior: 'smooth' \ }); \
      391	                \
   }\
      392	            \} else \{
\
   393	                // \uc0\u20182 \u12398 \u12506 \u12540 \u12472 \u12363 \u12425 \u12488 \u12483 \u12503 \u12506 \u12540 \u12472 \u12408 \u36983 \u31227 \
   394	                window.location.href = `index.html?category=$\{category\}`; \
   395	            \
} \
396	        \}); \
397	    \}); \
398	\}\
399	\
400	// ==========================================\
401	// URL\uc0\u12497 \u12521 \u12513 \u12540 \u12479 \u12363 \u12425 \u12459 \u12486 \u12468 \u12522 \u12540 \u12434 \u21462 \u24471 \
402	// ==========================================\
403	function getCategoryFromURL() \{
\
   404	    const urlParams = new URLSearchParams(window.location.search); \
   405	    const category = urlParams.get('category'); \
   406	    \
   407	    if (category) \{
   \
      408	        currentCategory = category; \
      409	        \
      410	        // \uc0\u12459 \u12486 \u12468 \u12522 \u12540 \u12508 \u12479 \u12531 \u12434 \u26356 \u26032 \
      411	        const categoryButtons = document.querySelectorAll('.category-btn'); \
      412	        categoryButtons.forEach(btn => \{
      \
         413	            btn.classList.remove('active'); \
         414	            if(btn.dataset.category === category) \{
      \
         415	                btn.classList.add('active'); \
         416	            \
      } \
      417	        \
   }); \
   418	    \
} \
419	\}\
420	\
421	// ==========================================\
422	// \uc0\u21021 \u26399 \u21270 \
423	// ==========================================\
424	document.addEventListener('DOMContentLoaded', () => \{
\
   425	    // URL\uc0\u12497 \u12521 \u12513 \u12540 \u12479 \u12363 \u12425 \u12459 \u12486 \u12468 \u12522 \u12540 \u12434 \u21462 \u24471 \
   426	    getCategoryFromURL(); \
   427	    \
   428	    // \uc0\u21830 \u21697 \u12487 \u12540 \u12479 \u12398 \u21462 \u24471 \
   429	    fetchProducts(); \
   430	    \
   431	    // \uc0\u12452 \u12505 \u12531 \u12488 \u12522 \u12473 \u12490 \u12540 \u12398 \u35373 \u23450 \
   432	    setupCategoryFilters(); \
   433	    setupSearch(); \
   434	    setupSort(); \
   435	    setupMobileMenu(); \
   436	    setupScrollTop(); \
   437	    setupFooterLinks(); \
   438	    \
   439	    console.log('ShopHub EC\uc0\u12469 \u12452 \u12488 \u21021 \u26399 \u21270 \u23436 \u20102 '); \
   440	\
}); \
441
\f1 \
}