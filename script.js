const restaurantWhatsApp = "923001234567";

const foods = [
    {
        id: 1,
        name: "Zinger Burger",
        category: "Burgers",
        price: 650,
        description: "Crispy chicken with fresh lettuce and sauce",
        image: "images/burger.jpg"
    },
    {
        id: 2,
        name: "Beef Burger",
        category: "Burgers",
        price: 750,
        description: "Juicy beef patty with cheese",
        image: "images/beef.jpg"
    },
    {
        id: 3,
        name: "Chicken Pizza",
        category: "Pizza",
        price: 1200,
        description: "Chicken, cheese and special toppings",
        image: "images/pizza.jpg"
    },
    {
        id: 4,
        name: "Fries",
        category: "Snacks",
        price: 300,
        description: "Golden crispy fries",
        image: "images/fries.jpg"
    },
    {
        id: 5,
        name: "Cold Coffee",
        category: "Drinks",
        price: 400,
        description: "Chilled creamy coffee",
        image: "images/coffee.jpg"
    }
];

let cart = [];
let selectedCategory = "All";

function renderCategories() {
    const categories = [
        "All",
        ...new Set(foods.map(food => food.category))
    ];

    document.getElementById("categories").innerHTML =
        categories.map(category => `
            <button
                class="category-btn ${category === selectedCategory ? "active" : ""}"
                onclick="filterCategory('${category}')">
                ${category}
            </button>
        `).join("");
}

function renderMenu() {
    const filteredFoods = selectedCategory === "All"
        ? foods
        : foods.filter(food => food.category === selectedCategory);

    document.getElementById("menu").innerHTML =
        filteredFoods.map(food => `
            <div class="food-card">

                <img src="${food.image}" alt="${food.name}">

                <div class="food-info">
                    <h3>${food.name}</h3>

                    <p>${food.description}</p>

                    <div class="food-bottom">
                        <span class="price">
                            Rs. ${food.price}
                        </span>

                        <button
                            class="add-btn"
                            onclick="addToCart(${food.id})">
                            + Add
                        </button>
                    </div>
                </div>

            </div>
        `).join("");
}

function filterCategory(category) {
    selectedCategory = category;

    renderCategories();
    renderMenu();
}

function addToCart(id) {
    const food = foods.find(item => item.id === id);

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...food,
            quantity: 1
        });
    }

    updateCart();
}

function updateCart() {
    const totalQuantity = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    document.getElementById("cart-count").innerText = totalQuantity;

    const cartItems = document.getElementById("cart-items");

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <strong>${item.name}</strong>

            <p>
                Rs. ${item.price} × ${item.quantity}
            </p>

            <button onclick="changeQuantity(${item.id}, -1)">−</button>
            <button onclick="changeQuantity(${item.id}, 1)">+</button>
        </div>
    `).join("");

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    document.getElementById("cart-total").innerText =
        `Total: Rs. ${total}`;
}

function changeQuantity(id, change) {
    const item = cart.find(item => item.id === id);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== id);
    }

    updateCart();
}

function openCart() {
    document.getElementById("cart-modal").style.display = "flex";
}

function closeCart() {
    document.getElementById("cart-modal").style.display = "none";
}

function placeOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const customerName =
        document.getElementById("customer-name").value;

    const tableNumber =
        document.getElementById("table-number").value;

    if (!customerName || !tableNumber) {
        alert("Please enter your name and table number.");
        return;
    }

    let message = `New Restaurant Order\n`;
    message += `Name: ${customerName}\n`;
    message += `Table: ${tableNumber}\n\n`;

    cart.forEach(item => {
        message += `${item.name} x ${item.quantity}`;
        message += ` = Rs. ${item.price * item.quantity}\n`;
    });

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    message += `\nTotal: Rs. ${total}`;

    const url =
        `https://wa.me/${restaurantWhatsApp}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
}

renderCategories();
renderMenu();
updateCart();