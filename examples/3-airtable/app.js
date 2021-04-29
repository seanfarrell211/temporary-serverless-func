const result = document.querySelector('.result')

const fetchProducts = async () => {
    try{
    const {data} = await axios.get('/api/3-z-complete');
        const products = data
        .map((product) => {
            const{name,description,price,image,featured,colors,company,stock,stars,reviews,category,shipping,id,url} = product
            return `<a href="product.html?id=${id}" class="product">
            <img src="${url}" alt ="${name}"/>
            <div class ="info">
            <h5>${name}</h5>
            <h5 class="price">$${price}</h5>
            <h5>${description}</h5>
            <h5>${colors}</h5>
            <h5>${company}</h5>
            <h5>${stock}</h5>
            <h5>${stars}</h5>
            <h5>${reviews}</h5>
            <h5>${category}</h5>
            <h5>${shipping}</h5>
            <h5>${featured}</h5>
            <img class="product-img"
          src="${image[0].url}"
          alt="${name}"
          />
            </div>
            </a>`
        }).join('')
        result.innerHTML = products
   }catch(error){
        result.innerHTML = '<h4>There was error </h4>'
    }
}

fetchProducts()