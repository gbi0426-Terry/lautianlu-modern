const productSeed = [
  {
    id: "duck-tongue",
    name: "鴨舌",
    category: "鴨肉滷味",
    price: 260,
    unit: "100g",
    tag: "招牌熱銷",
    desc: "越嚼越香的經典品項，適合自用與伴手禮。",
    image: "https://www.lautianlu.com.tw/upload/catalog_list_pic/twL_catalog_21B16_ts6jezwfgu.jpg",
    active: true,
  },
  {
    id: "duck-wing",
    name: "鴨翅",
    category: "鴨肉滷味",
    price: 75,
    unit: "1支",
    tag: "經典口味",
    desc: "肉質筋骨充滿嚼勁，滷汁深入骨肉之中。",
    image: "https://www.lautianlu.com.tw/upload/catalog_list_pic/twL_catalog_21B16_iv7w3xms2x.jpg",
    active: true,
  },
  {
    id: "duck-head",
    name: "鴨頭",
    category: "鴨肉滷味",
    price: 80,
    unit: "1支",
    tag: "香氣濃郁",
    desc: "外皮富彈性，濃郁香氣鎖在肉骨之中。",
    image: "https://www.lautianlu.com.tw/upload/catalog_list_pic/twL_catalog_21B16_7ynpj6vau6.jpg",
    active: true,
  },
  {
    id: "duck-heart",
    name: "鴨心",
    category: "鴨肉滷味",
    price: 90,
    unit: "4個",
    tag: "Q彈可口",
    desc: "溫火慢滷，保留滷汁精華與軟中帶Q的口感。",
    image: "https://www.lautianlu.com.tw/upload/catalog_list_pic/twL_catalog_21B16_f6gfx4g5kg.jpg",
    active: true,
  },
  {
    id: "bean-curd",
    name: "滷豆干",
    category: "豆製滷味",
    price: 120,
    unit: "300g",
    tag: "素食可選",
    desc: "入味不死鹹，適合搭配肉類滷味一起分享。",
    image: "https://www.lautianlu.com.tw/upload/base_fb_img/twL_01ns_web_base_21C09_nctihgvhds.jpg",
    active: true,
  },
  {
    id: "beef-shank",
    name: "滷牛腱",
    category: "牛肉滷味",
    price: 360,
    unit: "300g",
    tag: "宴客推薦",
    desc: "切片即食，適合作為年節冷盤與團購禮盒。",
    image: "https://www.lautianlu.com.tw/upload/catalog_m_list_pic/twL_catalog_m_21C11_2um9heahue.jpg",
    active: true,
  },
  {
    id: "gift-box",
    name: "經典伴手禮盒",
    category: "盒裝滷味",
    price: 980,
    unit: "盒",
    tag: "團購首選",
    desc: "可依預算搭配鴨舌、鴨翅、豆干與牛肉品項。",
    image: "https://www.lautianlu.com.tw/upload/package_b/ALL_package_21A10_7fhjik5qkr.jpg",
    active: true,
  },
  {
    id: "duck-bag",
    name: "鴨翅家庭包",
    category: "盒裝滷味",
    price: 680,
    unit: "10支",
    tag: "家庭分享",
    desc: "冷藏宅配與公司團購都適用的袋裝規格。",
    image: "https://www.lautianlu.com.tw/upload/catalog_list_pic/twL_catalog_23A18_ps4yvcy2cy.jpg",
    active: true,
  },
];

const imageSeed = {
  hero: {
    label: "首頁主視覺",
    target: "#heroImage",
    src: "https://www.lautianlu.com.tw/upload/package_b/ALL_package_21A10_7fhjik5qkr.jpg",
  },
  storyMain: {
    label: "品牌故事主圖",
    target: "#storyMainImage",
    src: "https://www.lautianlu.com.tw/upload/package_b/ALL_package_21A10_7fhjik5qkr.jpg",
  },
  storyFounder: {
    label: "創辦人/歷史照片",
    target: "#storyFounderImage",
    src: "https://www.lautianlu.com.tw/upload/package_b/ALL_package_21B19_2pbyiabnt8.jpg",
  },
  storyStore: {
    label: "門市/環境照片",
    target: "#storyStoreImage",
    src: "https://www.lautianlu.com.tw/upload/package_b/ALL_package_21A10_7uaa5pdhmj.jpg",
  },
};

const state = {
  route: "home",
  category: "全部",
  query: "",
  adminOrderQuery: "",
  adminOrderStatus: "all",
  products: read("lt-products", productSeed),
  images: read("lt-images", imageSeed),
  cart: read("lt-cart", []),
  orders: read("lt-orders", []),
  groups: read("lt-groups", []),
  member: read("lt-member", null),
};

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function money(value) {
  return `NT$${Number(value || 0).toLocaleString("zh-TW")}`;
}

function plainMoney(value) {
  return Number(value || 0).toLocaleString("zh-TW");
}

function toast(message) {
  const node = document.querySelector("#toast");
  node.textContent = message;
  node.classList.add("show");
  window.setTimeout(() => node.classList.remove("show"), 1800);
}

function routeTo(route) {
  state.route = route;
  document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.id === route));
  document.querySelector("#mobileNav").classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (route === "admin") renderAdmin();
}

function activeProducts() {
  return state.products.filter((product) => product.active !== false);
}

function normalizeImages() {
  state.images = Object.fromEntries(
    Object.entries(imageSeed).map(([key, seed]) => [key, { ...seed, ...(state.images?.[key] || {}) }]),
  );
  write("lt-images", state.images);
}

function applyImages() {
  normalizeImages();
  Object.values(state.images).forEach((image) => {
    const target = document.querySelector(image.target);
    if (target) target.src = image.src;
  });
}

function renderCategories() {
  const categories = ["全部", ...new Set(activeProducts().map((product) => product.category))];
  const tabs = document.querySelector("#categoryTabs");
  tabs.innerHTML = categories
    .map(
      (category) =>
        `<button class="${category === state.category ? "active" : ""}" data-category="${category}" type="button">${category}</button>`,
    )
    .join("");
}

function renderProducts() {
  const grid = document.querySelector("#productGrid");
  const query = state.query.trim().toLowerCase();
  const products = activeProducts().filter((product) => {
    const categoryMatch = state.category === "全部" || product.category === state.category;
    const text = `${product.name} ${product.category} ${product.desc}`.toLowerCase();
    return categoryMatch && (!query || text.includes(query));
  });

  if (!products.length) {
    grid.innerHTML = `<div class="result-panel">找不到符合條件的商品，請換一個關鍵字或分類。</div>`;
    return;
  }

  grid.innerHTML = products
    .map(
      (product) => `
        <article class="product-card">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <div class="body">
            <span class="tag">${product.tag || product.category}</span>
            <h2>${product.name}</h2>
            <p>${product.desc}</p>
            <footer>
              <div class="price-line"><span>${product.unit || "份"}</span><strong>${money(product.price)}</strong></div>
              <select aria-label="${product.name}口味" data-flavor="${product.id}">
                <option>原味</option>
                <option>辣味</option>
              </select>
              <input type="number" min="1" value="1" aria-label="${product.name}數量" data-qty="${product.id}">
              <button class="primary-btn" type="button" data-add="${product.id}">
                <i data-lucide="plus"></i>加入購物車
              </button>
            </footer>
          </div>
        </article>
      `,
    )
    .join("");
  refreshIcons();
}

function addToCart(id) {
  const product = state.products.find((item) => item.id === id);
  const qty = Number(document.querySelector(`[data-qty="${id}"]`)?.value || 1);
  const flavor = document.querySelector(`[data-flavor="${id}"]`)?.value || "原味";
  const key = `${id}-${flavor}`;
  const row = state.cart.find((item) => item.key === key);
  if (row) {
    row.qty += qty;
  } else {
    state.cart.push({ key, productId: id, flavor, qty, price: product.price });
  }
  write("lt-cart", state.cart);
  renderCart();
  toast(`${product.name} 已加入購物車`);
}

function cartTotal() {
  return state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function renderCart() {
  const count = state.cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelector("#cartCount").textContent = count;
  document.querySelector("#cartTotal").textContent = money(cartTotal());
  const list = document.querySelector("#cartItems");

  if (!state.cart.length) {
    list.innerHTML = `<div class="result-panel">購物車目前沒有商品。</div>`;
    return;
  }

  list.innerHTML = state.cart
    .map((item) => {
      const product = state.products.find((row) => row.id === item.productId);
      return `
        <div class="cart-row">
          <img src="${product?.image || ""}" alt="${product?.name || "商品"}">
          <div>
            <h3>${product?.name || "已下架商品"}</h3>
            <p>${item.flavor} / ${money(item.price)} / 小計 ${money(item.price * item.qty)}</p>
          </div>
          <div class="qty-controls">
            <button type="button" data-dec="${item.key}">-</button>
            <span>${item.qty}</span>
            <button type="button" data-inc="${item.key}">+</button>
          </div>
        </div>
      `;
    })
    .join("");
}

function changeQty(key, delta) {
  const row = state.cart.find((item) => item.key === key);
  if (!row) return;
  row.qty += delta;
  if (row.qty <= 0) state.cart = state.cart.filter((item) => item.key !== key);
  write("lt-cart", state.cart);
  renderCart();
}

function createOrder(form) {
  if (!state.cart.length) {
    toast("請先加入商品");
    return;
  }
  const data = Object.fromEntries(new FormData(form).entries());
  const order = {
    id: `LT${new Date().toISOString().slice(0, 10).replaceAll("-", "")}${String(state.orders.length + 1).padStart(3, "0")}`,
    createdAt: new Date().toLocaleString("zh-TW"),
    customer: data.customer,
    phone: data.phone,
    shipping: data.shipping,
    payment: data.payment,
    status: data.payment === "到店付款" ? "待門市確認" : "待付款確認",
    note: "",
    trackingNo: "",
    total: cartTotal(),
    items: state.cart.map((item) => ({ ...item })),
  };
  state.orders.unshift(order);
  state.cart = [];
  write("lt-orders", state.orders);
  write("lt-cart", state.cart);
  form.reset();
  renderCart();
  renderAdmin();
  document.querySelector("#cartDrawer").classList.remove("open");
  toast(`訂單已建立：${order.id}`);
  routeTo("orders");
  document.querySelector("#lookupOrderNo").value = order.id;
  document.querySelector("#lookupPhone").value = order.phone;
  showOrder(order);
}

function showOrder(order) {
  const panel = document.querySelector("#lookupResult");
  if (!order) {
    panel.innerHTML = `<h2>查無訂單</h2><p>請確認訂單編號與手機號碼是否正確。</p>`;
    return;
  }
  const rows = order.items
    .map((item) => {
      const product = state.products.find((row) => row.id === item.productId);
      return `<li>${product?.name || "商品"} ${item.flavor} x ${item.qty}</li>`;
    })
    .join("");
  panel.innerHTML = `
    <h2>${order.id}</h2>
    <p><strong>${order.status}</strong> / ${order.shipping} / ${order.payment}</p>
    <p>訂購人：${order.customer}，手機：${order.phone}</p>
    <ul>${rows}</ul>
    <p>合計：<strong>${money(order.total)}</strong></p>
  `;
}

function renderAdmin() {
  document.querySelector("#statRevenue").textContent = money(state.orders.reduce((sum, order) => sum + order.total, 0));
  document.querySelector("#statOrders").textContent = state.orders.length;
  document.querySelector("#statProducts").textContent = state.products.length;
  document.querySelector("#statGroups").textContent = state.groups.length;

  document.querySelector("#adminProducts").innerHTML = state.products
    .map(
      (product) => `
        <div class="admin-item">
          <header><strong>${product.name}</strong><small>${product.category} / ${money(product.price)}</small></header>
          <img class="admin-product-thumb" src="${product.image}" alt="${product.name}">
          <small>${product.active === false ? "下架" : "上架中"} - ${product.desc}</small>
          <label class="admin-image-url">
            商品圖片網址
            <input value="${product.image}" data-product-image="${product.id}" aria-label="${product.name}圖片網址">
          </label>
          <button class="secondary-btn apply-image-btn" type="button" data-apply-product-image="${product.id}">套用商品圖</button>
          <label class="file-picker">
            <i data-lucide="upload"></i>
            選擇本機照片
            <input type="file" accept="image/*" data-product-file="${product.id}">
          </label>
          <button class="danger-btn" type="button" data-toggle-product="${product.id}">${product.active === false ? "重新上架" : "下架商品"}</button>
        </div>
      `,
    )
    .join("");

  document.querySelector("#imageManager").innerHTML = Object.entries(state.images)
    .map(
      ([key, image]) => `
        <article class="image-card">
          <img src="${image.src}" alt="${image.label}預覽">
          <div>
            <h3>${image.label}</h3>
            <label>
              圖片網址
              <input value="${image.src}" data-image-url="${key}" aria-label="${image.label}圖片網址">
            </label>
            <button class="secondary-btn apply-image-btn" type="button" data-apply-image="${key}">套用網址</button>
            <label class="file-picker">
              <i data-lucide="image-plus"></i>
              選擇本機照片
              <input type="file" accept="image/*" data-image-file="${key}">
            </label>
          </div>
        </article>
      `,
    )
    .join("");

  renderOrderManager();

  document.querySelector("#adminGroups").innerHTML =
    state.groups
      .slice(0, 6)
      .map(
        (group) => `
          <div class="admin-item">
            <header><strong>${group.company}</strong><small>${group.date}</small></header>
            <small>${group.name} / ${group.phone} / ${group.budget}</small>
            <small>${group.note || "未填寫需求說明"}</small>
          </div>
        `,
      )
      .join("") || `<div class="admin-item"><small>尚無團購需求。</small></div>`;
  refreshIcons();
}

function filteredOrders() {
  const keyword = state.adminOrderQuery.trim().toLowerCase();
  return state.orders.filter((order) => {
    const statusMatch = state.adminOrderStatus === "all" || order.status === state.adminOrderStatus;
    const text = `${order.id} ${order.customer} ${order.phone} ${order.shipping} ${order.payment}`.toLowerCase();
    return statusMatch && (!keyword || text.includes(keyword));
  });
}

function orderItemSummary(order) {
  return order.items
    .map((item) => {
      const product = state.products.find((row) => row.id === item.productId);
      return `${product?.name || "商品"} ${item.flavor} x ${item.qty}`;
    })
    .join("、");
}

function renderOrderManager() {
  const container = document.querySelector("#adminOrders");
  const orders = filteredOrders();
  if (!orders.length) {
    container.innerHTML = `
      <div class="empty-state">
        <i data-lucide="clipboard-list"></i>
        <h3>目前沒有符合條件的訂單</h3>
        <p>可以調整搜尋條件，或按「建立示範訂單」產生一筆測試資料。</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="order-row order-header">
      <span>訂單</span>
      <span>客戶</span>
      <span>金額/付款</span>
      <span>狀態</span>
      <span>操作</span>
    </div>
    ${orders
      .map(
        (order) => `
          <article class="order-row">
            <div>
              <strong>${order.id}</strong>
              <small>${order.createdAt}</small>
              <small>${orderItemSummary(order)}</small>
            </div>
            <div>
              <strong>${order.customer}</strong>
              <small>${order.phone}</small>
              <small>${order.shipping}</small>
            </div>
            <div>
              <strong>${money(order.total)}</strong>
              <small>${order.payment}</small>
            </div>
            <div>
              <select data-order-status="${order.id}" aria-label="${order.id}訂單狀態">
                ${["待付款確認", "待門市確認", "備貨中", "已出貨", "已完成", "已取消"]
                  .map((status) => `<option ${order.status === status ? "selected" : ""}>${status}</option>`)
                  .join("")}
              </select>
            </div>
            <div class="order-actions">
              <button class="secondary-btn" type="button" data-view-order="${order.id}">
                <i data-lucide="list-checks"></i>
                明細
              </button>
              <button class="danger-btn" type="button" data-cancel-order="${order.id}">取消</button>
            </div>
          </article>
        `,
      )
      .join("")}
  `;
}

function updateOrderStatus(id, status) {
  const order = state.orders.find((item) => item.id === id);
  if (!order) return;
  order.status = status;
  write("lt-orders", state.orders);
  renderAdmin();
  toast(`${id} 已更新為「${status}」`);
}

function showAdminOrderDetail(id) {
  const order = state.orders.find((item) => item.id === id);
  if (!order) return;
  const items = order.items
    .map((item) => {
      const product = state.products.find((row) => row.id === item.productId);
      return `
        <tr>
          <td>${product?.name || "商品"}</td>
          <td>${item.flavor}</td>
          <td>${item.qty}</td>
          <td>${money(item.price)}</td>
          <td>${money(item.price * item.qty)}</td>
        </tr>
      `;
    })
    .join("");
  document.querySelector("#orderDialogContent").innerHTML = `
    <p class="eyebrow">Order Detail</p>
    <h2>${order.id}</h2>
    <div class="detail-grid">
      <div><small>訂購人</small><strong>${order.customer}</strong></div>
      <div><small>手機</small><strong>${order.phone}</strong></div>
      <div><small>配送</small><strong>${order.shipping}</strong></div>
      <div><small>付款</small><strong>${order.payment}</strong></div>
      <div><small>狀態</small><strong>${order.status}</strong></div>
      <div><small>建立時間</small><strong>${order.createdAt}</strong></div>
    </div>
    <table class="order-detail-table">
      <thead><tr><th>商品</th><th>口味</th><th>數量</th><th>單價</th><th>小計</th></tr></thead>
      <tbody>${items}</tbody>
    </table>
    <div class="detail-total">
      <span>訂單合計</span>
      <strong>${money(order.total)}</strong>
    </div>
  `;
  document.querySelector("#orderDialog").showModal();
  refreshIcons();
}

function exportOrdersCsv() {
  const rows = [
    ["訂單編號", "建立時間", "客戶", "手機", "配送方式", "付款方式", "狀態", "金額", "商品明細"],
    ...filteredOrders().map((order) => [
      order.id,
      order.createdAt,
      order.customer,
      order.phone,
      order.shipping,
      order.payment,
      order.status,
      plainMoney(order.total),
      orderItemSummary(order),
    ]),
  ];
  const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
  const blob = new Blob([`\ufeff${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `orders-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
  toast("訂單 CSV 已匯出");
}

function seedDemoOrder() {
  const sampleItems = [
    { key: `duck-tongue-原味-${Date.now()}`, productId: "duck-tongue", flavor: "原味", qty: 2, price: 260 },
    { key: `gift-box-原味-${Date.now()}`, productId: "gift-box", flavor: "原味", qty: 1, price: 980 },
  ];
  const order = {
    id: `LT${new Date().toISOString().slice(0, 10).replaceAll("-", "")}${String(state.orders.length + 1).padStart(3, "0")}`,
    createdAt: new Date().toLocaleString("zh-TW"),
    customer: "示範採購",
    phone: "0912-000-888",
    shipping: "黑貓冷藏宅配",
    payment: "線上刷卡",
    status: "備貨中",
    note: "後台示範訂單",
    trackingNo: "",
    total: sampleItems.reduce((sum, item) => sum + item.qty * item.price, 0),
    items: sampleItems,
  };
  state.orders.unshift(order);
  write("lt-orders", state.orders);
  renderAdmin();
  toast("已建立示範訂單");
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function updateImage(key, src) {
  if (!state.images[key] || !src) return;
  state.images[key].src = src;
  write("lt-images", state.images);
  applyImages();
  renderAdmin();
  toast(`${state.images[key].label}已更新`);
}

function updateProductImage(id, src) {
  const product = state.products.find((item) => item.id === id);
  if (!product || !src) return;
  product.image = src;
  write("lt-products", state.products);
  renderProducts();
  renderCart();
  renderAdmin();
  toast(`${product.name}圖片已更新`);
}

function refreshIcons() {
  if (window.lucide) window.lucide.createIcons();
}

document.addEventListener("click", (event) => {
  const routeButton = event.target.closest("[data-route]");
  if (routeButton) routeTo(routeButton.dataset.route);

  const categoryButton = event.target.closest("[data-category]");
  if (categoryButton) {
    state.category = categoryButton.dataset.category;
    renderCategories();
    renderProducts();
  }

  const addButton = event.target.closest("[data-add]");
  if (addButton) addToCart(addButton.dataset.add);

  const incButton = event.target.closest("[data-inc]");
  if (incButton) changeQty(incButton.dataset.inc, 1);

  const decButton = event.target.closest("[data-dec]");
  if (decButton) changeQty(decButton.dataset.dec, -1);

  const toggleProduct = event.target.closest("[data-toggle-product]");
  if (toggleProduct) {
    const product = state.products.find((item) => item.id === toggleProduct.dataset.toggleProduct);
    product.active = product.active === false;
    write("lt-products", state.products);
    renderCategories();
    renderProducts();
    renderAdmin();
  }

  const applyImage = event.target.closest("[data-apply-image]");
  if (applyImage) {
    const key = applyImage.dataset.applyImage;
    const input = document.querySelector(`[data-image-url="${key}"]`);
    updateImage(key, input?.value.trim());
  }

  const applyProductImage = event.target.closest("[data-apply-product-image]");
  if (applyProductImage) {
    const id = applyProductImage.dataset.applyProductImage;
    const input = document.querySelector(`[data-product-image="${id}"]`);
    updateProductImage(id, input?.value.trim());
  }

  const viewOrder = event.target.closest("[data-view-order]");
  if (viewOrder) showAdminOrderDetail(viewOrder.dataset.viewOrder);

  const cancelOrder = event.target.closest("[data-cancel-order]");
  if (cancelOrder) updateOrderStatus(cancelOrder.dataset.cancelOrder, "已取消");
});

document.addEventListener("change", async (event) => {
  const imageUrl = event.target.closest("[data-image-url]");
  if (imageUrl) {
    updateImage(imageUrl.dataset.imageUrl, imageUrl.value.trim());
    return;
  }

  const productImage = event.target.closest("[data-product-image]");
  if (productImage) {
    updateProductImage(productImage.dataset.productImage, productImage.value.trim());
    return;
  }

  const imageFile = event.target.closest("[data-image-file]");
  if (imageFile?.files?.[0]) {
    const dataUrl = await fileToDataUrl(imageFile.files[0]);
    updateImage(imageFile.dataset.imageFile, dataUrl);
    return;
  }

  const productFile = event.target.closest("[data-product-file]");
  if (productFile?.files?.[0]) {
    const dataUrl = await fileToDataUrl(productFile.files[0]);
    updateProductImage(productFile.dataset.productFile, dataUrl);
  }

  const orderStatus = event.target.closest("[data-order-status]");
  if (orderStatus) updateOrderStatus(orderStatus.dataset.orderStatus, orderStatus.value);
});

document.querySelector("#menuBtn").addEventListener("click", () => {
  document.querySelector("#mobileNav").classList.toggle("open");
});

document.querySelector("#cartBtn").addEventListener("click", () => {
  document.querySelector("#cartDrawer").classList.add("open");
});

document.querySelector("#closeCart").addEventListener("click", () => {
  document.querySelector("#cartDrawer").classList.remove("open");
});

document.querySelector("#memberBtn").addEventListener("click", () => {
  document.querySelector("#memberDialog").showModal();
});

document.querySelector("#searchInput").addEventListener("input", (event) => {
  state.query = event.target.value;
  renderProducts();
});

document.querySelector("#adminOrderSearch").addEventListener("input", (event) => {
  state.adminOrderQuery = event.target.value;
  renderOrderManager();
  refreshIcons();
});

document.querySelector("#adminOrderStatus").addEventListener("change", (event) => {
  state.adminOrderStatus = event.target.value;
  renderOrderManager();
  refreshIcons();
});

document.querySelector("#checkoutForm").addEventListener("submit", (event) => {
  event.preventDefault();
  createOrder(event.currentTarget);
});

document.querySelector("#lookupForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const id = document.querySelector("#lookupOrderNo").value.trim();
  const phone = document.querySelector("#lookupPhone").value.trim();
  const order = state.orders.find((item) => item.id === id && item.phone === phone);
  showOrder(order);
});

document.querySelector("#groupForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const group = {
    ...Object.fromEntries(new FormData(event.currentTarget).entries()),
    id: `G${Date.now()}`,
    createdAt: new Date().toLocaleString("zh-TW"),
  };
  state.groups.unshift(group);
  write("lt-groups", state.groups);
  event.currentTarget.reset();
  toast("團購需求已送到後台");
  renderAdmin();
});

document.querySelector("#memberForm").addEventListener("submit", (event) => {
  event.preventDefault();
  state.member = Object.fromEntries(new FormData(event.currentTarget).entries());
  write("lt-member", state.member);
  document.querySelector("#memberStatus").textContent = `${state.member.name}，已以 ${state.member.phone} 登入示範會員。`;
  toast("會員已登入");
});

document.querySelector("#productForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  state.products.unshift({
    id: `custom-${Date.now()}`,
    name: data.name,
    category: data.category,
    price: Number(data.price),
    unit: "份",
    tag: "後台新增",
    desc: "由後台新增的示範商品，可在前台分類與搜尋中看到。",
    image: data.image || "https://www.lautianlu.com.tw/upload/base_fb_img/twL_01ns_web_base_21C09_nctihgvhds.jpg",
    active: true,
  });
  write("lt-products", state.products);
  event.currentTarget.reset();
  renderCategories();
  renderProducts();
  renderAdmin();
  toast("商品已新增");
});

document.querySelector("#resetProducts").addEventListener("click", () => {
  state.products = productSeed.map((item) => ({ ...item }));
  write("lt-products", state.products);
  renderCategories();
  renderProducts();
  renderAdmin();
  toast("已還原示範商品");
});

document.querySelector("#resetImages").addEventListener("click", () => {
  state.images = JSON.parse(JSON.stringify(imageSeed));
  write("lt-images", state.images);
  applyImages();
  renderAdmin();
  toast("已還原預設圖片");
});

document.querySelector("#exportOrdersBtn").addEventListener("click", exportOrdersCsv);

document.querySelector("#seedOrderBtn").addEventListener("click", seedDemoOrder);

if (state.member) {
  document.querySelector("#memberStatus").textContent = `${state.member.name}，已以 ${state.member.phone} 登入示範會員。`;
}

renderCategories();
applyImages();
renderProducts();
renderCart();
renderAdmin();
refreshIcons();
