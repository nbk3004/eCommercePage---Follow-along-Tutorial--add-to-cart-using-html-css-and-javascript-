const searchInput = document.querySelector(".navbar--search");

searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    Array.from(productList.children).forEach((product) => {
      const productName = product.querySelector(".product--name").textContent.toLowerCase();
      product.style.display = productName.includes(query) ? "" : "none";
    });
