function viewBook(bookId) {
    window.location.href = `/user/books/${bookId}`;
}

function showMessage(message, type) {
    const messageElement = document.getElementById('message');
    if (messageElement) {
        messageElement.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        `;
    }
}

function addToCart(bookId, bookName) {
    fetch('/user/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bookId: bookId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            showMessage(`${bookName} added to cart`, 'success');
        }
        updateCartDisplay(data.cart);
    })
    .catch(error => console.error('Error:', error));
}

function updateQuantity(bookId, bookName, action) {
    fetch(`/user/cart/update/${bookId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: action })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showMessage(`Cart updated for ${bookName}`, 'success');
            updateCartDisplay(data.cart);
        }
    })
    .catch(error => console.error('Error:', error));
}

function removeFromCart(bookId) {
    fetch(`/user/cart/remove/${bookId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showMessage('Book removed from cart successfully', 'success');
            updateCartDisplay(data.cart);
        }
    })
    .catch(error => console.error('Error:', error));
}

function updateCartDisplay(cart) {
    const cartElement = document.getElementById('cart');
    if (cartElement) {
        let totalAmount = 0;
        let cartHTML = `
            <table class="table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Book</th>
                        <th>Author</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
        `;
        cart.forEach(item => {
            let bookPrice = parseFloat(item.bookDetails.book_price);
            if (isNaN(bookPrice)) {
                console.error('Invalid price for item:', item.bookDetails);
                bookPrice = 0;
            }
            let itemTotal = bookPrice * item.bookDetails.quantity;
            totalAmount += itemTotal;
            cartHTML += `
                <tr>
                    <td><img src="/img/${item.bookDetails.book_img}" alt="" style="width: 100px; height: 150px;"></td>
                    <td>${item.bookDetails.book_name}</td>
                    <td>${item.bookDetails.book_author}</td>
                    <td>₹${bookPrice.toFixed(2)}</td>
                    <td>
                        <button class="btn btn-light" onclick="updateQuantity('${item.bookDetails.book_id}', '${item.bookDetails.book_name}', 'decrease')">-</button>
                        ${item.bookDetails.quantity}
                        <button class="btn btn-light" onclick="updateQuantity('${item.bookDetails.book_id}', '${item.bookDetails.book_name}', 'increase')">+</button>
                    </td>
                    <td>₹${itemTotal.toFixed(2)}</td>
                    <td>
                        <button class="btn btn-danger" onclick="removeFromCart('${item.bookDetails.book_id}')">Remove</button>
                    </td>
                </tr>
            `;
        });
        cartHTML += `
                </tbody>
            </table>
            <div class="text-right">
                <h4>Total: ₹${totalAmount.toFixed(2)}</h4>
                <button class="btn btn-success" onclick="proceedToPay()">Proceed to Pay</button>
            </div>
        `;
        cartElement.innerHTML = cartHTML;
    }
}

function proceedToPay() {
    window.location.href = '/user/checkout';
}