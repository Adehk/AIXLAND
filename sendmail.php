<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'PHPMailer_6.9.1/src/Exception.php';
    require 'PHPMailer_6.9.1/src/PHPMailer.php';
    require 'PHPMailer_6.9.1/src/SMTP.php';

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $phone =  $_POST['phone'];
        $subject = 'AIXLAND';
        $body = '';

        if (trim(!empty($name))) {
            $body.='<p><strong>Name: </strong>'.$name.'</p>';
        }
        if (trim(!empty($phone))) {
            $body.='<p><strong>Phone: </strong>'.$phone.'</p>';
        }
        if (trim(!empty($email))) {
            $body.='<p><strong>Email: </strong>'.$email.'</p>';
        }
    
        $mail = new PHPMailer(true);
        $mail->CharSet = 'UTF-8';
        $mail->setLanguage('ru', 'PHPMailer_6.9.1/language/');

        //SMTP settings
        $mail->isSMTP();  // Set mailer to use SMTP
        $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
        $mail->SMTPAuth = true;  // Enable SMTP authentication
        $mail->Username = 'example@gmail.com'; // УКАЗАТЬ ПОЧТУ GMAIL
        $mail->Password = 'example';  // УКАЗАТЬ ПАРОЛЬ
        $mail->SMTPSecure = 'tls';  // Enable TLS encryption, 'ssl' also accepted
        $mail->Port = 587;  // TCP port to connect to
    
        //Recipients
        // $mail->setFrom('from@gmail.com', 'from');
        $mail->addAddress('aliev@expovision.io'); 
    
        //Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $body;
    
        if (!$mail->send()) {
            $message = 'Error';
        } else {
            $message = 'Success';
        }

        header('Content-Type: application/json');
        echo $message;
    }
?>


