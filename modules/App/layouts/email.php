<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta content="IE=edge" http-equiv="X-UA-Compatible">
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
    <meta content="width=device-width, initial-scale=1" name="viewport"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title></title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background: #fafafa;
            padding: 40px;
            font-size: 14px;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%
        }

        h1 {font-size: 25px;}
        h2 {font-size: 20px;}
        h3 {font-size: 18px;}

        .wrapper {
            margin-left: auto;
            margin-right: auto;
            max-width: 800px;
        }

        .container {
            background: #fff;
            border-radius: 4px;
            padding: 20px;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.12);
        }

        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #0e8fff;
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <h1><?=$this->retrieve('app.name')?></h1>
        <div class="container"><?=$content_for_layout?></div>
    </div>
</body>
</html>
