


// for clothing.html

document.addEventListerner(DOMContenentLoaded, function() {
    const buyButtons = document.querySelectorAll("buy-now-btn");
    const purchaseForm = document.getElementById("purchaseForm");
    const thankYou= document.getElementById("thankYou");
    const selectedProductImage = document.getElementById("selectedProductImage");
    const selectedProductName = document.getElementById("selectedProductName");
    const selectedProductPrice = document.getElementById("selectedProductPrice");
    const checkoutForm = document.getElementById("selectedProductImage");

        //  store selected product details

        let selectedProduct ='';
        let selectedPrice ='';
        let selectedImage ='';

        // Buy Now Buttons
        buyButtons.forEach(button => {
            button.addEventListener("click", function () {
                selectedProduct = this.getAttribute("data-product")
                selectedPrice = this.getAttribute("data-price")
                selectedImage = this.getAttribute("data-image")

                // Update form with product details
                selectedProductImage.src = selectedImage;
                  selectedProductImage.alt= selectedProduct;
                  selectedProductName.textContent = selectedProduct;
                  selectedProductPrice.textContent = `price: $${selectedPrice}`;

                //   show form
                purchaseForm.style.display = 'block';
                purchaseForm.scrollIntoView({behavior:"smooth"})

            })
        })

        // handle form submission


checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();


            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const address = document.getElementById('address').value;
            const phone = document.getElementById('phone').value;

            const subject= `Order for: ${selectedProduct}`;
            const body=`
                Hello Farfetch Store,
                
            I would like to place an order for the folowing items:
            
            product:${selectedProduct}
            price:${selectedPrice}

            My details:

            -name:${name}
            -Email:${email}
            -Shipping Address: ${address}
            -Phone: ${phone}

            Please process my order and let me know the next steps
        `.trim();


        const mailtoLink = `mail:larkaimas18@gmail.com?subject=${encodedURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;

        purchaseForm.style.display = 'none';
        thankYou.style.display = 'block';
        thankYou.scrollIntoView({ behavior: "smooth"});

        })

})




















































