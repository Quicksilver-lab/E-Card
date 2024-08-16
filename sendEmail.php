<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $email = filter_var($data['email'], FILTER_VALIDATE_EMAIL);
    $type = $data['type'];
    $message = htmlspecialchars($data['message']);
    $quote = htmlspecialchars($data['quote']);

    if ($email) {
        $subject = "You've received a new e-card!";
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

        $cardStyle = '';

        switch ($type) {
            case 'birthday':
                $cardStyle = 'background-color: #ffefef; color: #ff7f7f;';
                break;
            case 'holiday':
                $cardStyle = 'background-color: #e0f7fa; color: #00acc1;';
                break;
            case 'love':
                $cardStyle = 'background-color: #fce4ec; color: #f06292;';
                break;
            case 'celebration':
                $cardStyle = 'background-color: #d1c4e9; color: #673ab7;';
                break;
            // Add more styles if needed
        }

        $body = "
        <html>
        <head>
            <style>
                .ecard {
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    $cardStyle
                }
                .ecard .message {
                    font-size: 1.5em;
                    margin-top: 10px;
                }
                .ecard .quote {
                    font-size: 1.2em;
                    margin-top: 5px;
                    color: #555;
                }
            </style>
        </head>
        <body>
            <div class='ecard'>
                <div class='message'>$message</div>
                <div class='quote'><em>$quote</em></div>
            </div>
        </body>
        </html>
        ";

        if (mail($email, $subject, $body, $headers)) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false]);
        }
    } else {
        echo json_encode(['success' => false]);
    }
} else {
    echo json_encode(['success' => false]);
}
?>
