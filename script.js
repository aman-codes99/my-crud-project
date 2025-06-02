document.addEventListener("DOMContentLoaded", function () {
    loadItems();
});

function addItem() {
    const input = document.getElementById("itemInput");
    const itemList = document.getElementById("itemList");
    const itemText = input.value.trim();

    if (itemText !== "") {
        const li = document.createElement("li");
        li.innerHTML = `<span>${itemText}</span> 
                        <button class="edit-btn" onclick="editItem(this)">Edit</button>
                        <button class="delete-btn" onclick="deleteItem(this)">Delete</button>`;
        itemList.appendChild(li);
        saveItems();
    }
    input.value = "";
}

function editItem(button) {
    const li = button.parentElement;
    const span = li.querySelector("span");
    const newValue = prompt("Edit item:", span.textContent);
    
    if (newValue !== null && newValue.trim() !== "") {
        span.textContent = newValue.trim();
        saveItems();
    }
}

function deleteItem(button) {
    button.parentElement.remove();
    saveItems();
}

function saveItems() {
    const items = [];
    document.querySelectorAll("#itemList li span").forEach(span => {
        items.push(span.textContent);
    });
    localStorage.setItem("items", JSON.stringify(items));
}

function loadItems() {
    const itemList = document.getElementById("itemList");
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    
    storedItems.forEach(itemText => {
        const li = document.createElement("li");
        li.innerHTML = `<span>${itemText}</span> 
                        <button class="edit-btn" onclick="editItem(this)">Edit</button>
                        <button class="delete-btn" onclick="deleteItem(this)">Delete</button>`;
        itemList.appendChild(li);
    });
}