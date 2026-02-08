{\rtf1\ansi\ansicpg932\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 HelveticaNeue;\f1\fnil\fcharset0 Monaco;}
{\colortbl;\red255\green255\blue255;\red24\green30\blue42;\red246\green249\blue251;}
{\*\expandedcolortbl;;\cssrgb\c12157\c16078\c21569;\cssrgb\c97255\c98039\c98824;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs28 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2  1	// ==========================================\
     2	// \uc0\u12464 \u12525 \u12540 \u12496 \u12523 \u22793 \u25968 \
     3	// ==========================================\
     4	let currentProduct = null;\
     5	let currentQuantity = 1;\
     6	\
     7	// ==========================================\
     8	// \uc0\u12459 \u12540 \u12488 \u31649 \u29702 \
     9	// ==========================================\
    10	class Cart \{\
    11	    constructor() \{\
    12	        this.items = this.loadCart();\
    13	        this.updateCartCount();\
    14	    \}\
    15	\
    16	    loadCart() \{\
    17	        const cartData = localStorage.getItem('shoppingCart');\
    18	        return cartData ? JSON.parse(cartData) : [];\
    19	    \}\
    20	\
    21	    saveCart() \{\
    22	        localStorage.setItem('shoppingCart', JSON.stringify(this.items));\
    23	        this.updateCartCount();\
    24	    \}\
    25	\
    26	    addItem(product, quantity = 1) \{\
    27	        const existingItem = this.items.find(item => item.id === product.id);\
    28	        \
    29	        if (existingItem) \{\
    30	            existingItem.quantity += quantity;\
    31	        \} else \{\
    32	            this.items.push(\{\
    33	                ...product,\
    34	                quantity: quantity\
    35	            \});\
    36	        \}\
    37	        \
    38	        this.saveCart();\
    39	        showToast(`$\{product.name\}\uc0\u12434 $\{quantity\}\u20491 \u12459 \u12540 \u12488 \u12395 \u36861 \u21152 \u12375 \u12414 \u12375 \u12383 `);\
    40	    \}\
    41	\
    42	    updateCartCount() \{\
    43	        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);\
    44	        const cartCountElements = document.querySelectorAll('#cartCount, .cart-count-mobile');\
    45	        cartCountElements.forEach(element => \{\
    46	            element.textContent = totalItems;\
    47	        \});\
    48	    \}\
    49	\}\
    50	\
    51	const cart = new Cart();\
    52	\
    53	// ==========================================\
    54	// URL\uc0\u12363 \u12425 \u21830 \u21697 ID\u12434 \u21462 \u24471 \
    55	// ==========================================\
    56	function getProductIdFromURL() \{\
    57	    const urlParams = new URLSearchParams(window.location.search);\
    58	    return urlParams.get('id');\
    59	\}\
    60	\
    61	// ==========================================\
    62	// \uc0\u21830 \u21697 \u35443 \u32048 \u12398 \u21462 \u24471 \
    63	// ==========================================\
    64	async function fetchProductDetail() \{\
    65	    const productId = getProductIdFromURL();\
    66	    \
    67	    if (!productId) \{\
    68	        showProductNotFound();\
    69	        return;\
    70	    \}\
    71	    \
    72	    try \{\
    73	        showLoading(true);\
    74	        \
    75	        const response = await fetch(`tables/products/$\{productId\}`);\
    76	        \
    77	        if (!response.ok) \{\
    78	            throw new Error('\uc0\u21830 \u21697 \u12364 \u35211 \u12388 \u12363 \u12426 \u12414 \u12379 \u12435 ');\
    79	        \}\
    80	        \
    81	        const product = await response.json();\
    82	        \
    83	        if (product) \{\
    84	            currentProduct = product;\
    85	            renderProductDetail(product);\
    86	            fetchRelatedProducts(product.category);\
    87	        \} else \{\
    88	            showProductNotFound();\
    89	        \}\
    90	    \} catch (error) \{\
    91	        console.error('\uc0\u21830 \u21697 \u35443 \u32048 \u12398 \u21462 \u24471 \u12395 \u22833 \u25943 :', error);\
    92	        showProductNotFound();\
    93	    \} finally \{\
    94	        showLoading(false);\
    95	    \}\
    96	\}\
    97	\
    98	// ==========================================\
    99	// \uc0\u21830 \u21697 \u35443 \u32048 \u12398 \u34920 \u31034 \
   100	// ==========================================\
   101	function renderProductDetail(product) \{\
   102	    const content = document.getElementById('productDetailContent');\
   103	    \
   104	    // \uc0\u12497 \u12531 \u12367 \u12378 \u12522 \u12473 \u12488 \
   105	    document.getElementById('breadcrumbCategory').textContent = product.category || '\uc0\u21830 \u21697 ';\
   106	    document.getElementById('breadcrumbProduct').textContent = product.name;\
   107	    \
   108	    // \uc0\u21830 \u21697 \u30011 \u20687 \
   109	    document.getElementById('mainImage').src = product.image || 'https://via.placeholder.com/600x600?text=No+Image';\
   110	    document.getElementById('mainImage').alt = product.name;\
   111	    document.getElementById('mainImage').onerror = function() \{\
   112	        this.src = 'https://via.placeholder.com/600x600?text=No+Image';\
   113	    \};\
   114	    \
   115	    // \uc0\u21830 \u21697 \u24773 \u22577 \
   116	    document.getElementById('productCategory').textContent = product.category || '\uc0\u12381 \u12398 \u20182 ';\
   117	    document.getElementById('productTitle').textContent = product.name;\
   118	    document.getElementById('productRating').innerHTML = `\
   119	        $\{generateStars(product.rating || 0)\}\
   120	        <span>$\{product.rating || 0\} / 5.0</span>\
   121	    `;\
   122	    document.getElementById('productPrice').textContent = `\'a5$\{formatPrice(product.price)\}`;\
   123	    \
   124	    const stockElement = document.getElementById('productStock');\
   125	    if (product.stock > 0) \{\
   126	        stockElement.innerHTML = `<i class="fas fa-check-circle"></i> \uc0\u22312 \u24235 \u12354 \u12426  ($\{product.stock\}\u20491 )`;\
   127	        stockElement.style.color = 'var(--secondary-color)';\
   128	    \} else \{\
   129	        stockElement.innerHTML = `<i class="fas fa-times-circle"></i> \uc0\u22312 \u24235 \u20999 \u12428 `;\
   130	        stockElement.style.color = 'var(--danger-color)';\
   131	    \}\
   132	    \
   133	    document.getElementById('productDescription').textContent = product.description || '\uc0\u21830 \u21697 \u35500 \u26126 \u12399 \u12354 \u12426 \u12414 \u12379 \u12435 \u12290 ';\
   134	    \
   135	    // \uc0\u25968 \u37327 \u12398 \u26368 \u22823 \u20516 \u12434 \u35373 \u23450 \
   136	    const quantityInput = document.getElementById('quantity');\
   137	    quantityInput.max = Math.min(product.stock, 99);\
   138	    \
   139	    // \uc0\u12459 \u12540 \u12488 \u12395 \u36861 \u21152 \u12508 \u12479 \u12531 \u12398 \u29366 \u24907 \
   140	    const addToCartBtn = document.getElementById('addToCartBtn');\
   141	    if (product.stock <= 0) \{\
   142	        addToCartBtn.disabled = true;\
   143	        addToCartBtn.innerHTML = '<i class="fas fa-times"></i> \uc0\u22312 \u24235 \u20999 \u12428 ';\
   144	    \} else \{\
   145	        addToCartBtn.disabled = false;\
   146	        addToCartBtn.innerHTML = '<i class="fas fa-shopping-cart"></i> \uc0\u12459 \u12540 \u12488 \u12395 \u36861 \u21152 ';\
   147	    \}\
   148	    \
   149	    // \uc0\u12467 \u12531 \u12486 \u12531 \u12484 \u12434 \u34920 \u31034 \
   150	    content.style.display = 'grid';\
   151	    \
   152	    // \uc0\u12506 \u12540 \u12472 \u12479 \u12452 \u12488 \u12523 \u12434 \u26356 \u26032 \
   153	    document.title = `$\{product.name\} - ShopHub`;\
   154	\}\
   155	\
   156	// ==========================================\
   157	// \uc0\u26143 \u35413 \u20385 \u12398 \u29983 \u25104 \
   158	// ==========================================\
   159	function generateStars(rating) \{\
   160	    const fullStars = Math.floor(rating);\
   161	    const hasHalfStar = rating % 1 >= 0.5;\
   162	    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);\
   163	    \
   164	    let stars = '';\
   165	    for (let i = 0; i < fullStars; i++) \{\
   166	        stars += '<i class="fas fa-star"></i>';\
   167	    \}\
   168	    if (hasHalfStar) \{\
   169	        stars += '<i class="fas fa-star-half-alt"></i>';\
   170	    \}\
   171	    for (let i = 0; i < emptyStars; i++) \{\
   172	        stars += '<i class="far fa-star"></i>';\
   173	    \}\
   174	    \
   175	    return stars;\
   176	\}\
   177	\
   178	// ==========================================\
   179	// \uc0\u20385 \u26684 \u12398 \u12501 \u12457 \u12540 \u12510 \u12483 \u12488 \
   180	// ==========================================\
   181	function formatPrice(price) \{\
   182	    return price.toString().replace(/\\B(?=(\\d\{3\})+(?!\\d))/g, ',');\
   183	\}\
   184	\
   185	// ==========================================\
   186	// \uc0\u38306 \u36899 \u21830 \u21697 \u12398 \u21462 \u24471 \
   187	// ==========================================\
   188	async function fetchRelatedProducts(category) \{\
   189	    try \{\
   190	        const response = await fetch(`tables/products?limit=100`);\
   191	        const data = await response.json();\
   192	        \
   193	        if (data && data.data) \{\
   194	            // \uc0\u21516 \u12376 \u12459 \u12486 \u12468 \u12522 \u12540 \u12391 \u29694 \u22312 \u12398 \u21830 \u21697 \u20197 \u22806 \u12434 \u12501 \u12451 \u12523 \u12479 \u12540 \
   195	            let relatedProducts = data.data.filter(p => \
   196	                p.category === category && p.id !== currentProduct.id\
   197	            );\
   198	            \
   199	            // \uc0\u26368 \u22823 4\u20214 \u12414 \u12391 \
   200	            relatedProducts = relatedProducts.slice(0, 4);\
   201	            \
   202	            if (relatedProducts.length > 0) \{\
   203	                renderRelatedProducts(relatedProducts);\
   204	            \}\
   205	        \}\
   206	    \} catch (error) \{\
   207	        console.error('\uc0\u38306 \u36899 \u21830 \u21697 \u12398 \u21462 \u24471 \u12395 \u22833 \u25943 :', error);\
   208	    \}\
   209	\}\
   210	\
   211	// ==========================================\
   212	// \uc0\u38306 \u36899 \u21830 \u21697 \u12398 \u34920 \u31034 \
   213	// ==========================================\
   214	function renderRelatedProducts(products) \{\
   215	    const relatedSection = document.getElementById('relatedProducts');\
   216	    const relatedGrid = document.getElementById('relatedProductsGrid');\
   217	    \
   218	    relatedGrid.innerHTML = products.map(product => `\
   219	        <div class="product-card" onclick="window.location.href='product.html?id=$\{product.id\}'">\
   220	            <img src="$\{product.image || 'https://via.placeholder.com/300x300?text=No+Image'\}" \
   221	                 alt="$\{product.name\}" \
   222	                 class="product-image"\
   223	                 onerror="this.src='https://via.placeholder.com/300x300?text=No+Image'">\
   224	            <div class="product-body">\
   225	                <span class="product-category-badge">$\{product.category || '\uc0\u12381 \u12398 \u20182 '\}</span>\
   226	                <h3 class="product-name">$\{product.name\}</h3>\
   227	                <div class="product-rating">\
   228	                    $\{generateStars(product.rating || 0)\}\
   229	                    <span>($\{product.rating || 0\})</span>\
   230	                </div>\
   231	                <div class="product-price">\'a5$\{formatPrice(product.price)\}</div>\
   232	                <div class="product-stock $\{product.stock <= 0 ? 'out-of-stock' : ''\}">\
   233	                    $\{product.stock > 0 ? `\uc0\u22312 \u24235 \u12354 \u12426  ($\{product.stock\}\u20491 )` : '\u22312 \u24235 \u20999 \u12428 '\}\
   234	                </div>\
   235	            </div>\
   236	        </div>\
   237	    `).join('');\
   238	    \
   239	    relatedSection.style.display = 'block';\
   240	\}\
   241	\
   242	// ==========================================\
   243	// \uc0\u25968 \u37327 \u12467 \u12531 \u12488 \u12525 \u12540 \u12523 \
   244	// ==========================================\
   245	function setupQuantityControls() \{\
   246	    const decreaseBtn = document.getElementById('decreaseQty');\
   247	    const increaseBtn = document.getElementById('increaseQty');\
   248	    const quantityInput = document.getElementById('quantity');\
   249	    \
   250	    decreaseBtn.addEventListener('click', () => \{\
   251	        let value = parseInt(quantityInput.value);\
   252	        if (value > 1) \{\
   253	            value--;\
   254	            quantityInput.value = value;\
   255	            currentQuantity = value;\
   256	        \}\
   257	    \});\
   258	    \
   259	    increaseBtn.addEventListener('click', () => \{\
   260	        let value = parseInt(quantityInput.value);\
   261	        const max = parseInt(quantityInput.max);\
   262	        if (value < max) \{\
   263	            value++;\
   264	            quantityInput.value = value;\
   265	            currentQuantity = value;\
   266	        \}\
   267	    \});\
   268	    \
   269	    quantityInput.addEventListener('change', () => \{\
   270	        let value = parseInt(quantityInput.value);\
   271	        const max = parseInt(quantityInput.max);\
   272	        \
   273	        if (value < 1) value = 1;\
   274	        if (value > max) value = max;\
   275	        \
   276	        quantityInput.value = value;\
   277	        currentQuantity = value;\
   278	    \});\
   279	\}\
   280	\
   281	// ==========================================\
   282	// \uc0\u12459 \u12540 \u12488 \u12395 \u36861 \u21152 \
   283	// ==========================================\
   284	function setupAddToCart() \{\
   285	    const addToCartBtn = document.getElementById('addToCartBtn');\
   286	    \
   287	    addToCartBtn.addEventListener('click', () => \{\
   288	        if (currentProduct && currentProduct.stock > 0) \{\
   289	            const quantity = parseInt(document.getElementById('quantity').value);\
   290	            cart.addItem(currentProduct, quantity);\
   291	            \
   292	            // \uc0\u25968 \u37327 \u12434 \u12522 \u12475 \u12483 \u12488 \
   293	            document.getElementById('quantity').value = 1;\
   294	            currentQuantity = 1;\
   295	        \}\
   296	    \});\
   297	\}\
   298	\
   299	// ==========================================\
   300	// \uc0\u26908 \u32034 \u27231 \u33021 \
   301	// ==========================================\
   302	function setupSearch() \{\
   303	    const searchInput = document.getElementById('searchInput');\
   304	    const searchBtn = document.querySelector('.search-btn');\
   305	    \
   306	    const performSearch = () => \{\
   307	        const query = searchInput.value.trim();\
   308	        if (query) \{\
   309	            window.location.href = `index.html?search=$\{encodeURIComponent(query)\}`;\
   310	        \}\
   311	    \};\
   312	    \
   313	    searchBtn?.addEventListener('click', performSearch);\
   314	    \
   315	    searchInput?.addEventListener('keypress', (e) => \{\
   316	        if (e.key === 'Enter') \{\
   317	            performSearch();\
   318	        \}\
   319	    \});\
   320	\}\
   321	\
   322	// ==========================================\
   323	// \uc0\u12525 \u12540 \u12487 \u12451 \u12531 \u12464 \u34920 \u31034 \
   324	// ==========================================\
   325	function showLoading(show) \{\
   326	    const loading = document.getElementById('loading');\
   327	    const content = document.getElementById('productDetailContent');\
   328	    \
   329	    if (show) \{\
   330	        loading.style.display = 'block';\
   331	        content.style.display = 'none';\
   332	    \} else \{\
   333	        loading.style.display = 'none';\
   334	    \}\
   335	\}\
   336	\
   337	// ==========================================\
   338	// \uc0\u21830 \u21697 \u12364 \u35211 \u12388 \u12363 \u12425 \u12394 \u12356 \u34920 \u31034 \
   339	// ==========================================\
   340	function showProductNotFound() \{\
   341	    const loading = document.getElementById('loading');\
   342	    const content = document.getElementById('productDetailContent');\
   343	    const notFound = document.getElementById('productNotFound');\
   344	    \
   345	    loading.style.display = 'none';\
   346	    content.style.display = 'none';\
   347	    notFound.style.display = 'block';\
   348	\}\
   349	\
   350	// ==========================================\
   351	// \uc0\u12488 \u12540 \u12473 \u12488 \u36890 \u30693 \
   352	// ==========================================\
   353	function showToast(message) \{\
   354	    const toast = document.getElementById('toast');\
   355	    const toastMessage = document.getElementById('toastMessage');\
   356	    \
   357	    if (!toast || !toastMessage) return;\
   358	    \
   359	    toastMessage.textContent = message;\
   360	    toast.classList.add('show');\
   361	    \
   362	    setTimeout(() => \{\
   363	        toast.classList.remove('show');\
   364	    \}, 3000);\
   365	\}\
   366	\
   367	// ==========================================\
   368	// \uc0\u12514 \u12496 \u12452 \u12523 \u12513 \u12491 \u12517 \u12540 \
   369	// ==========================================\
   370	function setupMobileMenu() \{\
   371	    const mobileMenuBtn = document.getElementById('mobileMenuBtn');\
   372	    const mobileMenu = document.getElementById('mobileMenu');\
   373	    const mobileMenuClose = document.getElementById('mobileMenuClose');\
   374	    \
   375	    mobileMenuBtn?.addEventListener('click', () => \{\
   376	        mobileMenu.classList.add('active');\
   377	    \});\
   378	    \
   379	    mobileMenuClose?.addEventListener('click', () => \{\
   380	        mobileMenu.classList.remove('active');\
   381	    \});\
   382	    \
   383	    mobileMenu?.addEventListener('click', (e) => \{\
   384	        if (e.target === mobileMenu) \{\
   385	            mobileMenu.classList.remove('active');\
   386	        \}\
   387	    \});\
   388	\}\
   389	\
   390	// ==========================================\
   391	// \uc0\u12488 \u12483 \u12503 \u12408 \u25147 \u12427 \u12508 \u12479 \u12531 \
   392	// ==========================================\
   393	function setupScrollTop() \{\
   394	    const scrollTopBtn = document.getElementById('scrollTop');\
   395	    \
   396	    window.addEventListener('scroll', () => \{\
   397	        if (window.scrollY > 300) \{\
   398	            scrollTopBtn?.classList.add('active');\
   399	        \} else \{\
   400	            scrollTopBtn?.classList.remove('active');\
   401	        \}\
   402	    \});\
   403	    \
   404	    scrollTopBtn?.addEventListener('click', () => \{\
   405	        window.scrollTo(\{\
   406	            top: 0,\
   407	            behavior: 'smooth'\
   408	        \});\
   409	    \});\
   410	\}\
   411	\
   412	// ==========================================\
   413	// \uc0\u21021 \u26399 \u21270 \
   414	// ==========================================\
   415	document.addEventListener('DOMContentLoaded', () => \{\
   416	    // \uc0\u21830 \u21697 \u35443 \u32048 \u12398 \u21462 \u24471 \
   417	    fetchProductDetail();\
   418	    \
   419	    // \uc0\u12452 \u12505 \u12531 \u12488 \u12522 \u12473 \u12490 \u12540 \u12398 \u35373 \u23450 \
   420	    setupQuantityControls();\
   421	    setupAddToCart();\
   422	    setupSearch();\
   423	    setupMobileMenu();\
   424	    setupScrollTop();\
   425	    \
   426	    console.log('\uc0\u21830 \u21697 \u35443 \u32048 \u12506 \u12540 \u12472 \u21021 \u26399 \u21270 \u23436 \u20102 ');\
   427	\});\
   428	
\f1 \
}