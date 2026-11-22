const defaultFoods = [
    {
        id: 1,
        name: "Zinger Burger",
        category: "Burgers",
        price: 650,
        description: "Crispy chicken burger",
        image: "images/burger.jpg"
    },
    {
        id: 2,
        name: "Chicken Pizza",
        category: "Pizza",
        price: 1200,
        description: "Chicken and cheese pizza",
        image: "images/pizza.jpg"
    }
];

function getFoods() {
    return JSON.parse(localStorage.getItem("restaurantFoods"))
        || defaultFoods;
}

function saveFoods(foods) {
    localStorage.setItem("restaurantFoods", JSON.stringify(foods));
}

function renderAdminMenu() {
    const foods = getFoods();

    document.getElementById("admin-menu").innerHTML =
        foods.map(food => `
            <div class="admin-item">
                <h3>${food.name}</h3>
                <p>${food.category}</p>
                <p>Rs. ${food.price}</p>

                <button onclick="deleteFood(${food.id})">
                    Delete
                </button>
            </div>
        `).join("");
}

document.getElementById("food-form")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const foods = getFoods();

        const newFood = {
            id: Date.now(),
            name: document.getElementById("food-name").value,
            category: document.getElementById("food-category").value,
            price: Number(document.getElementById("food-price").value),
            description: document.getElementById("food-description").value,
            image: document.getElementById("food-image").value
        };

        foods.push(newFood);

        saveFoods(foods);

        this.reset();

        renderAdminMenu();

        alert("Menu item added!");
    });

function deleteFood(id) {
    const foods = getFoods().filter(food => food.id !== id);

    saveFoods(foods);

    renderAdminMenu();
}

renderAdminMenu();