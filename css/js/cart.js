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
     4	const SHIPPING_COST = 500;\
     5	const FREE_SHIPPING_THRESHOLD = 5000;\
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
    26	    updateCartCount() \{\
    27	        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);\
    28	        const cartCountElements = document.querySelectorAll('#cartCount, .cart-count-mobile');\
    29	        cartCountElements.forEach(element => \{\
    30	            element.textContent = totalItems;\
    31	        \});\
    32	    \}\
    33	\
    34	    updateQuantity(productId, quantity) \{\
    35	        const item = this.items.find(item => item.id === productId);\
    36	        if (item) \{\
    37	            item.quantity = Math.max(1, Math.min(quantity, item.stock || 99));\
    38	            this.saveCart();\
    39	            this.render();\
    40	        \}\
    41	    \}\
    42	\
    43	    removeItem(productId) \{\
    44	        this.items = this.items.filter(item => item.id !== productId);\
    45	        this.saveCart();\
    46	        this.render();\
    47	    \}\
    48	\
    49	    clearCart() \{\
    50	        this.items = [];\
    51	        this.saveCart();\
    52	        this.render();\
    53	    \}\
    54	\
    55	    getSubtotal() \{\
    56	        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);\
    57	    \}\
    58	\
    59	    getShipping() \{\
    60	        const subtotal = this.getSubtotal();\
    61	        return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;\
    62	    \}\
    63	\
    64	    getTotal() \{\
    65	        return this.getSubtotal() + this.getShipping();\
    66	    \}\
    67	\
    68	    render() \{\
    69	        if (this.items.length === 0) \{\
    70	            this.showEmptyCart();\
    71	        \} else \{\
    72	            this.showCartContent();\
    73	        \}\
    74	    \}\
    75	\
    76	    showEmptyCart() \{\
    77	        document.getElementById('emptyCart').style.display = 'block';\
    78	        document.getElementById('cartContent').style.display = 'none';\
    79	        document.getElementById('recommendedProducts').style.display = 'block';\
    80	    \}\
    81	\
    82	    showCartContent() \{\
    83	        document.getElementById('emptyCart').style.display = 'none';\
    84	        document.getElementById('cartContent').style.display = 'block';\
    85	        document.getElementById('recommendedProducts').style.display = 'block';\
    86	        \
    87	        this.renderCartItems();\
    88	        this.renderSummary();\
    89	    \}\
    90	\
    91	    renderCartItems() \{\
    92	        const cartItemsList = document.getElementById('cartItemsList');\
    93	        const cartItemsCount = document.getElementById('cartItemsCount');\
    94	        \
    95	        cartItemsCount.textContent = this.items.length;\
    96	        \
    97	        cartItemsList.innerHTML = this.items.map(item => `\
    98	            <div class="cart-item" data-id="$\{item.id\}">\
    99	                <img src="$\{item.image || 'https://via.placeholder.com/120x120?text=No+Image'\}" \
   100	                     alt="$\{item.name\}" \
   101	                     class="cart-item-image"\
   102	                     onerror="this.src='https://via.placeholder.com/120x120?text=No+Image'">\
   103	                <div class="cart-item-details">\
   104	                    <h3 class="cart-item-name">$\{item.name\}</h3>\
   105	                    <div class="cart-item-category">$\{item.category || '\uc0\u12381 \u12398 \u20182 '\}</div>\
   106	                    <div class="cart-item-controls">\
   107	                        <div class="cart-item-quantity">\
   108	                            <button class="quantity-btn" onclick="cart.updateQuantity('$\{item.id\}', $\{item.quantity - 1\})">\
   109	                                <i class="fas fa-minus"></i>\
   110	                            </button>\
   111	                            <input type="number" \
   112	                                   value="$\{item.quantity\}" \
   113	                                   min="1" \
   114	                                   max="$\{item.stock || 99\}"\
   115	                                   onchange="cart.updateQuantity('$\{item.id\}', parseInt(this.value))"\
   116	                                   style="width: 60px; text-align: center; padding: 0.5rem; border: 1px solid var(--border-color); border-radius: 4px;">\
   117	                            <button class="quantity-btn" onclick="cart.updateQuantity('$\{item.id\}', $\{item.quantity + 1\})">\
   118	                                <i class="fas fa-plus"></i>\
   119	                            </button>\
   120	                        </div>\
   121	                        <div class="cart-item-price">\'a5$\{formatPrice(item.price * item.quantity)\}</div>\
   122	                        <button class="btn-remove-item" onclick="cart.confirmRemoveItem('$\{item.id\}', '$\{item.name\}')">\
   123	                            <i class="fas fa-trash"></i>\
   124	                            \uc0\u21066 \u38500 \
   125	                        </button>\
   126	                    </div>\
   127	                </div>\
   128	            </div>\
   129	        `).join('');\
   130	    \}\
   131	\
   132	    renderSummary() \{\
   133	        const subtotal = this.getSubtotal();\
   134	        const shipping = this.getShipping();\
   135	        const total = this.getTotal();\
   136	        \
   137	        document.getElementById('subtotal').textContent = `\'a5$\{formatPrice(subtotal)\}`;\
   138	        document.getElementById('shipping').textContent = shipping === 0 ? '\uc0\u28961 \u26009 ' : `\'a5$\{formatPrice(shipping)\}`;\
   139	        document.getElementById('total').textContent = `\'a5$\{formatPrice(total)\}`;\
   140	    \}\
   141	\
   142	    confirmRemoveItem(productId, productName) \{\
   143	        showModal(\
   144	            `\uc0\u12300 $\{productName\}\u12301 \u12434 \u12459 \u12540 \u12488 \u12363 \u12425 \u21066 \u38500 \u12375 \u12414 \u12377 \u12363 \u65311 `,\
   145	            () => this.removeItem(productId)\
   146	        );\
   147	    \}\
   148	\
   149	    confirmClearCart() \{\
   150	        if (this.items.length === 0) return;\
   151	        \
   152	        showModal(\
   153	            '\uc0\u12459 \u12540 \u12488 \u20869 \u12398 \u12377 \u12409 \u12390 \u12398 \u21830 \u21697 \u12434 \u21066 \u38500 \u12375 \u12414 \u12377 \u12363 \u65311 ',\
   154	            () => \{\
   155	                this.clearCart();\
   156	                showToast('\uc0\u12459 \u12540 \u12488 \u12434 \u31354 \u12395 \u12375 \u12414 \u12375 \u12383 ');\
   157	            \}\
   158	        );\
   159	    \}\
   160	\}\
   161	\
   162	const cart = new Cart();\
   163	\
   164	// ==========================================\
   165	// \uc0\u20385 \u26684 \u12398 \u12501 \u12457 \u12540 \u12510 \u12483 \u12488 \
   166	// ==========================================\
   167	function formatPrice(price) \{\
   168	    return price.toString().replace(/\\B(?=(\\d\{3\})+(?!\\d))/g, ',');\
   169	\}\
   170	\
   171	// ==========================================\
   172	// \uc0\u12362 \u12377 \u12377 \u12417 \u21830 \u21697 \u12398 \u21462 \u24471 \
   173	// ==========================================\
   174	async function fetchRecommendedProducts() \{\
   175	    try \{\
   176	        const response = await fetch('tables/products?limit=100');\
   177	        const data = await response.json();\
   178	        \
   179	        if (data && data.data) \{\
   180	            // \uc0\u12521 \u12531 \u12480 \u12512 \u12395 4\u20214 \u12434 \u21462 \u24471 \
   181	            const shuffled = data.data.sort(() => 0.5 - Math.random());\
   182	            const recommended = shuffled.slice(0, 4);\
   183	            renderRecommendedProducts(recommended);\
   184	        \}\
   185	    \} catch (error) \{\
   186	        console.error('\uc0\u12362 \u12377 \u12377 \u12417 \u21830 \u21697 \u12398 \u21462 \u24471 \u12395 \u22833 \u25943 :', error);\
   187	    \}\
   188	\}\
   189	\
   190	// ==========================================\
   191	// \uc0\u12362 \u12377 \u12377 \u12417 \u21830 \u21697 \u12398 \u34920 \u31034 \
   192	// ==========================================\
   193	function renderRecommendedProducts(products) \{\
   194	    const recommendedGrid = document.getElementById('recommendedProductsGrid');\
   195	    \
   196	    recommendedGrid.innerHTML = products.map(product => `\
   197	        <div class="product-card" onclick="window.location.href='product.html?id=$\{product.id\}'">\
   198	            <img src="$\{product.image || 'https://via.placeholder.com/300x300?text=No+Image'\}" \
   199	                 alt="$\{product.name\}" \
   200	                 class="product-image"\
   201	                 onerror="this.src='https://via.placeholder.com/300x300?text=No+Image'">\
   202	            <div class="product-body">\
   203	                <span class="product-category-badge">$\{product.category || '\uc0\u12381 \u12398 \u20182 '\}</span>\
   204	                <h3 class="product-name">$\{product.name\}</h3>\
   205	                <div class="product-rating">\
   206	                    $\{generateStars(product.rating || 0)\}\
   207	                    <span>($\{product.rating || 0\})</span>\
   208	                </div>\
   209	                <div class="product-price">\'a5$\{formatPrice(product.price)\}</div>\
   210	                <div class="product-stock $\{product.stock <= 0 ? 'out-of-stock' : ''\}">\
   211	                    $\{product.stock > 0 ? `\uc0\u22312 \u24235 \u12354 \u12426  ($\{product.stock\}\u20491 )` : '\u22312 \u24235 \u20999 \u12428 '\}\
   212	                </div>\
   213	            </div>\
   214	        </div>\
   215	    `).join('');\
   216	\}\
   217	\
   218	// ==========================================\
   219	// \uc0\u26143 \u35413 \u20385 \u12398 \u29983 \u25104 \
   220	// ==========================================\
   221	function generateStars(rating) \{\
   222	    const fullStars = Math.floor(rating);\
   223	    const hasHalfStar = rating % 1 >= 0.5;\
   224	    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);\
   225	    \
   226	    let stars = '';\
   227	    for (let i = 0; i < fullStars; i++) \{\
   228	        stars += '<i class="fas fa-star"></i>';\
   229	    \}\
   230	    if (hasHalfStar) \{\
   231	        stars += '<i class="fas fa-star-half-alt"></i>';\
   232	    \}\
   233	    for (let i = 0; i < emptyStars; i++) \{\
   234	        stars += '<i class="far fa-star"></i>';\
   235	    \}\
   236	    \
   237	    return stars;\
   238	\}\
   239	\
   240	// ==========================================\
   241	// \uc0\u12459 \u12540 \u12488 \u12463 \u12522 \u12450 \
   242	// ==========================================\
   243	function setupClearCart() \{\
   244	    const clearCartBtn = document.getElementById('clearCartBtn');\
   245	    \
   246	    clearCartBtn?.addEventListener('click', () => \{\
   247	        cart.confirmClearCart();\
   248	    \});\
   249	\}\
   250	\
   251	// ==========================================\
   252	// \uc0\u12481 \u12455 \u12483 \u12463 \u12450 \u12454 \u12488 \
   253	// ==========================================\
   254	function setupCheckout() \{\
   255	    const checkoutBtn = document.getElementById('checkoutBtn');\
   256	    \
   257	    checkoutBtn?.addEventListener('click', () => \{\
   258	        // \uc0\u23455 \u38555 \u12398 EC\u12469 \u12452 \u12488 \u12391 \u12399 \u27770 \u28168 \u12506 \u12540 \u12472 \u12408 \u36983 \u31227 \
   259	        showToast('\uc0\u12372 \u36092 \u20837 \u12354 \u12426 \u12364 \u12392 \u12358 \u12372 \u12374 \u12356 \u12414 \u12377 \u65281 \u65288 \u12487 \u12514 \u29256 \u65289 ');\
   260	        \
   261	        // \uc0\u12487 \u12514 \u12391 \u12399 3\u31186 \u24460 \u12395 \u12459 \u12540 \u12488 \u12434 \u12463 \u12522 \u12450 \
   262	        setTimeout(() => \{\
   263	            cart.clearCart();\
   264	            showToast('\uc0\u27880 \u25991 \u12364 \u23436 \u20102 \u12375 \u12414 \u12375 \u12383 ');\
   265	        \}, 3000);\
   266	    \});\
   267	\}\
   268	\
   269	// ==========================================\
   270	// \uc0\u26908 \u32034 \u27231 \u33021 \
   271	// ==========================================\
   272	function setupSearch() \{\
   273	    const searchInput = document.getElementById('searchInput');\
   274	    const searchBtn = document.querySelector('.search-btn');\
   275	    \
   276	    const performSearch = () => \{\
   277	        const query = searchInput.value.trim();\
   278	        if (query) \{\
   279	            window.location.href = `index.html?search=$\{encodeURIComponent(query)\}`;\
   280	        \}\
   281	    \};\
   282	    \
   283	    searchBtn?.addEventListener('click', performSearch);\
   284	    \
   285	    searchInput?.addEventListener('keypress', (e) => \{\
   286	        if (e.key === 'Enter') \{\
   287	            performSearch();\
   288	        \}\
   289	    \});\
   290	\}\
   291	\
   292	// ==========================================\
   293	// \uc0\u12514 \u12540 \u12480 \u12523 \
   294	// ==========================================\
   295	function showModal(message, onConfirm) \{\
   296	    const modal = document.getElementById('confirmModal');\
   297	    const modalMessage = document.getElementById('modalMessage');\
   298	    const modalConfirm = document.getElementById('modalConfirm');\
   299	    const modalCancel = document.getElementById('modalCancel');\
   300	    const modalClose = document.getElementById('modalClose');\
   301	    \
   302	    modalMessage.textContent = message;\
   303	    modal.classList.add('active');\
   304	    \
   305	    const handleConfirm = () => \{\
   306	        onConfirm();\
   307	        modal.classList.remove('active');\
   308	        cleanup();\
   309	    \};\
   310	    \
   311	    const handleCancel = () => \{\
   312	        modal.classList.remove('active');\
   313	        cleanup();\
   314	    \};\
   315	    \
   316	    const cleanup = () => \{\
   317	        modalConfirm.removeEventListener('click', handleConfirm);\
   318	        modalCancel.removeEventListener('click', handleCancel);\
   319	        modalClose.removeEventListener('click', handleCancel);\
   320	    \};\
   321	    \
   322	    modalConfirm.addEventListener('click', handleConfirm);\
   323	    modalCancel.addEventListener('click', handleCancel);\
   324	    modalClose.addEventListener('click', handleCancel);\
   325	    \
   326	    // \uc0\u12514 \u12540 \u12480 \u12523 \u22806 \u12463 \u12522 \u12483 \u12463 \u12391 \u38281 \u12376 \u12427 \
   327	    modal.addEventListener('click', (e) => \{\
   328	        if (e.target === modal) \{\
   329	            handleCancel();\
   330	        \}\
   331	    \});\
   332	\}\
   333	\
   334	// ==========================================\
   335	// \uc0\u12488 \u12540 \u12473 \u12488 \u36890 \u30693 \
   336	// ==========================================\
   337	function showToast(message) \{\
   338	    const toast = document.getElementById('toast');\
   339	    const toastMessage = document.getElementById('toastMessage');\
   340	    \
   341	    if (!toast || !toastMessage) return;\
   342	    \
   343	    toastMessage.textContent = message;\
   344	    toast.classList.add('show');\
   345	    \
   346	    setTimeout(() => \{\
   347	        toast.classList.remove('show');\
   348	    \}, 3000);\
   349	\}\
   350	\
   351	// ==========================================\
   352	// \uc0\u12514 \u12496 \u12452 \u12523 \u12513 \u12491 \u12517 \u12540 \
   353	// ==========================================\
   354	function setupMobileMenu() \{\
   355	    const mobileMenuBtn = document.getElementById('mobileMenuBtn');\
   356	    const mobileMenu = document.getElementById('mobileMenu');\
   357	    const mobileMenuClose = document.getElementById('mobileMenuClose');\
   358	    \
   359	    mobileMenuBtn?.addEventListener('click', () => \{\
   360	        mobileMenu.classList.add('active');\
   361	    \});\
   362	    \
   363	    mobileMenuClose?.addEventListener('click', () => \{\
   364	        mobileMenu.classList.remove('active');\
   365	    \});\
   366	    \
   367	    mobileMenu?.addEventListener('click', (e) => \{\
   368	        if (e.target === mobileMenu) \{\
   369	            mobileMenu.classList.remove('active');\
   370	        \}\
   371	    \});\
   372	\}\
   373	\
   374	// ==========================================\
   375	// \uc0\u12488 \u12483 \u12503 \u12408 \u25147 \u12427 \u12508 \u12479 \u12531 \
   376	// ==========================================\
   377	function setupScrollTop() \{\
   378	    const scrollTopBtn = document.getElementById('scrollTop');\
   379	    \
   380	    window.addEventListener('scroll', () => \{\
   381	        if (window.scrollY > 300) \{\
   382	            scrollTopBtn?.classList.add('active');\
   383	        \} else \{\
   384	            scrollTopBtn?.classList.remove('active');\
   385	        \}\
   386	    \});\
   387	    \
   388	    scrollTopBtn?.addEventListener('click', () => \{\
   389	        window.scrollTo(\{\
   390	            top: 0,\
   391	            behavior: 'smooth'\
   392	        \});\
   393	    \});\
   394	\}\
   395	\
   396	// ==========================================\
   397	// \uc0\u21021 \u26399 \u21270 \
   398	// ==========================================\
   399	document.addEventListener('DOMContentLoaded', () => \{\
   400	    // \uc0\u12459 \u12540 \u12488 \u12398 \u34920 \u31034 \
   401	    cart.render();\
   402	    \
   403	    // \uc0\u12362 \u12377 \u12377 \u12417 \u21830 \u21697 \u12398 \u21462 \u24471 \
   404	    fetchRecommendedProducts();\
   405	    \
   406	    // \uc0\u12452 \u12505 \u12531 \u12488 \u12522 \u12473 \u12490 \u12540 \u12398 \u35373 \u23450 \
   407	    setupClearCart();\
   408	    setupCheckout();\
   409	    setupSearch();\
   410	    setupMobileMenu();\
   411	    setupScrollTop();\
   412	    \
   413	    console.log('\uc0\u12459 \u12540 \u12488 \u12506 \u12540 \u12472 \u21021 \u26399 \u21270 \u23436 \u20102 ');\
   414	\});\
   415	
\f1 \
}