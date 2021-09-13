
// load products from fakestore API
const loadProducts = () => {
  // add Loading message
  document.getElementById("all-products").innerHTML = "<h1>Loading...</h1>";

  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();    // get products when webpage loads in browser

// show all product in UI 
const showProducts = (products) => {
  document.getElementById("all-products").textContent = "";  // clear Loading message

  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product", "text-center", "px-2");
    div.innerHTML = `
    <div class="single-product">
      <div class="mb-3">
        <img class="product-image" src=${image}></img>
      </div>
      <h5 class="fw-bold">${product.title}</h5>
      <h6 class="fw-bold text-capitalize">Category: ${product.category}</h6>
      <h6 class="fw-bold text-secondary">Average rating: ${product.rating.rate}/5.0 <br>
      Rated by: ${product.rating.count} users</h6>
      <h4 class="fw-bold my-3">Price: $${product.price}</h4>

      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-primary fw-bold my-3">Add to Cart</button>

      <button id="details-btn" class="btn btn-warning fw-bold" data-bs-toggle="modal" data-bs-target="#detailsContainer" onclick="getDetails(${product.id})">
        Details
      </button>
    </div>
      `;
    // push new product to all products container
    document.getElementById("all-products").appendChild(div);
  }
};

// add product to cart
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;

  updateTotal();
};

// get inner text from an element
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};


// get details of a product from API
const getDetails = productID => {
  document.getElementById('modal-name').innerHTML = '';
  document.getElementById('modal-details').innerHTML = "Loading...";

  const url = `https://fakestoreapi.com/products/${productID}`;
  fetch(url).then(res => res.json()).then(data => showDetails(data));

}

// show details in ui
function showDetails(product) {
  document.getElementById('modal-name').innerHTML = product.title;

  document.getElementById('modal-details').innerHTML = `
      <img src="${product.image}" class="img-fluid">
      <div class="my-3 lh-lg p-1">
          <p class="lh-sm mb-3 text-secondary" style="text-align:justify">${product.description}</p>
          <h5 class="text-capitalize"><b>Category:</b> ${product.category}</h5>
          <h5><b>Rating:</b> ${product.rating.rate} out of 5.0</h5>
          <h5><b>Rated by:</b> ${product.rating.count} users</h5>
          <h2 class="display-6 my-3">
            <span class="fw-bold">Price:</span> $${product.price}
          </h2>
          <a role="button" class="text-decoration-none text-dark text-center d-block fw-bold bg-warning py-1 mt-3 rounded-3" onclick="addToCart(${product.id},${product.price})">Add to Cart</a>
      </div>`;
}