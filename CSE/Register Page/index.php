<?php
require __DIR__ . '/vendor/autoload.php';
use Razorpay\Api\Api;

$api_key = 'rzp_live_fen6ST9vYVrnXz';
$api_secret = 'IjdZRLNIsUxq9OmYG9ehlJtf';

$api = new Api($api_key, $api_secret);

$order = $api->order->create([
    'amount' => 100,
    'currency' => 'INR',
    'receipt' => 'order_receipt_2a2a'
]);

// Get the order ID
$order_id = $order->id;

// Set your callback URL
$callback_url = "http://localhost:8000/success.html";

// Include Razorpay Checkout.js library
echo '<script src="https://checkout.razorpay.com/v1/checkout.js"></script>';

// Create the payment button with Checkout.js

// Add a script to handle the payment
echo '<script>
  function startPayment() {
    var options = {
      key: "' . $api_key . '",
      amount: "' . $order->amount . '",
      currency: "' . $order->currency . '",
      name: "Your Company Name",
      description: "Payment for your order",
      image: "https://cdn.razorpay.com/logos/GhRQcycean79PqE_medium.png",
      order_id: "' . $order_id . '",
      theme: {
        "color": "#738276"
      },
       handler: function (response) {
        // Send payment details to the backend PHP script via AJAX
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "save_payment.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4 && xhr.status == 200) {
            // Redirect to Instagram page after successful payment
            window.location.href = "https://chat.whatsapp.com/L2n6xGgC4KO6zt8MyckBqs";
          }
        };
        xhr.send("payment_id=" + response.razorpay_payment_id + "&order_id=' . $order_id . '");
      },
      callback_url: "' . $callback_url . '"
    };
    
    var rzp = new Razorpay(options);
    rzp.open();
  }
  startPayment();
</script>';
?>
