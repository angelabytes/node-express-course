document.addEventListener('DOMContentLoaded', () => {
        
    const filterSelect = document.getElementById('filter');

    let displayProducts = async (order) => {
        try {
            let URL = '/api/v1/products';

            if (order) {
                let productOrder = '';
                if (order === 'Highest') {
                    productOrder = 'desc';
                } else if (order === 'Lowest') {
                    productOrder = 'asc';
                }

                URL = `api/v1/sorted?order=${productOrder}`;
            } 

            const res = await fetch(URL);

            if(!res.ok){
                console.error(`Failed to fetch ${res.status}`);
                throw new Error(`HTTP error! Status: ${res.status}`)
            }

            const products = await res.json();
            const productList = document.querySelector(".product-list");
            productList.textContent = '';

            products.map( (product) => {
                const productDiv = document.createElement('div');
                const productName = document.createElement('h2');
                productName.textContent = product.name;
                productDiv.appendChild(productName);

                const productImg = document.createElement('img');
                productImg.src = product.image;
                productDiv.appendChild(productImg);

                const productPrice = document.createElement('h3');
                productPrice.textContent = product.price;
                productDiv.appendChild(productPrice);

                const productDesc = document.createElement('p');
                productDesc.textContent = product.desc;
                productDiv.appendChild(productDesc);

                productList.appendChild(productDiv);
            });
        } catch (error) {
            console.error("There was an with displaying the products: ", error);
            const productList = document.querySelector('.product-list');
            productList.textContent = `Error: ${error.message}`;
        }
    }
    
    displayProducts();

    filterSelect.addEventListener('change', (e) => {
        const selectOrder = e.target.value;
        displayProducts(selectOrder);
    });
});
