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
]);  // Add semicolon here

// Get the order ID
$order_id = $order->id;

// Set your callback URL
$callback_url = "http://localhost:8000/success.html";

// Include Razorpay Checkout.js library
echo '<script src="https://checkout.razorpay.com/v1/checkout.js"></script>';

// Create a payment button with Checkout.js
echo '<button onclick="startPayment()">Pay with Razorpay</button>';

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
      callback_url: "' . $callback_url . '"
    };
    
    var rzp = new Razorpay(options);
    rzp.open();
  }
</script>';
?>
