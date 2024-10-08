<?php
session_start();
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


// Check if the email session variable is set
if (isset($_SESSION['email'])) {
  $email = $_SESSION['email']; // Get the email from the session
  // Display the email safely
} else {
  echo "No email found. Please register.";
}

// Get the order ID
$order_id = $order->id;



// Include Razorpay Checkout.js library
echo '<script src="https://checkout.razorpay.com/v1/checkout.js"></script>';

// Create the payment button with Checkout.js
echo '<script>
function startPayment() {
  var options = {
    key: "' . $api_key . '",
    amount: "' . $order->amount . '",
    currency: "' . $order->currency . '",
    name: "Elements 2K24",
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
          // Log the response to the console
          console.log(xhr.responseText);
          // Redirect to WhatsApp after successful payment
          window.location.href = "https://chat.whatsapp.com/L2n6xGgC4KO6zt8MyckBqs";
        }
      };
      // Send email along with payment ID and order ID
      xhr.send("payment_id=" + response.razorpay_payment_id + "&order_id=' . $order_id . '&email=' . urlencode($email) . '");
    }
  };

  var rzp = new Razorpay(options);
  rzp.open();
}
startPayment();
</script>';

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Processing Registration</title>
    <style>
    /* Loading Spinner Styles */
    .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 80vh;
        text-align: center;
    }

    /* Loader spinner */
    .loader {
        height: 4px;
        width: 130px;
        --c:no-repeat linear-gradient(yellow 0 0);
        background: var(--c),var(--c),orange;
        background-size: 60% 100%;
        animation: l16 3s infinite;
    }

    @keyframes l16 {
        0%   {background-position:-150% 0,-150% 0}
        66%  {background-position: 250% 0,-150% 0}
        100% {background-position: 250% 0, 250% 0}
    }
    </style>
</head>
<body>

    <!-- Loading container with loader spinner -->
    <div class="loading-container">
        <div class="loader"></div>
        <p>Please Wait, Confirming Verification</p>
    </div>
</body>
</html>