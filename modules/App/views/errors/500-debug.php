<html class="app-page-500-debug">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Internal Server Error</title>
    <style type="text/css">

    * {
        box-sizing: border-box;
        scrollbar-width: thin;
        scrollbar-color: #334264 #131720;
    }

    html, body {background-color: #131720; }

    body {
        font-family: "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, "Lucida Grande", sans-serif;
        font-size: 18px;
        font-style: normal;
        font-weight: normal;
        text-transform: normal;
        letter-spacing: normal;
        line-height: 1.4em;
        color:#fff;
        padding-top: 40px;
    }

    h1 { font-size:38px;letter-spacing: -2px;line-height: 1em;margin:0; }
    h2 { font-size:22px;font-weight:normal;color:#DA4453; }
    h3 { font-weight:bold;font-size:11pt}
    p  { margin-top: 5px 0px;}
    pre { font-family: monospace; margin: 0; }
    table { width: 100%; }

    .wrapper{
        width: 95%;
        max-width: 940px;
        margin: 20px auto;
    }

    .content {
        background-color: #1c1d2b;
        padding: 20px;
        border-radius: 4px;
        margin-top: 40px;
    }

    .code {
        color: #777;
        background-color: #000;
        padding: 10px;
        font-size: 12px;
        border-radius: 4px;
        margin-top: 20px;
    }

    .code ol { overflow-x: scroll; }

    .code li.selected {
        background: #333;
        color: yellow;
    }

    .file {
        font-family: monospace;
        font-size: 14px;
    }

    .sysinfo {
        margin-top: 10px;
        color: rgba(255, 255, 255,.2);
        font-size: 12px;
    }

    .margin {
        margin-top: 1em;
        margin-bottom: 1em;
    }

    .muted {
        color: rgba(255, 255, 255, .4);
    }

    .badge {
        display: inline-block;
        padding: 0.2em 0.6em;
        background: rgba(0,0,0,.1);
        border-radius: 4px;
    }

    debug-trace {
        display: flex;
        align-content: center;
        gap: 1em;
        font-family: 'Courier New', Courier, monospace;
        background: rgba(0,0,0,.1);
        padding: .6em;
        font-size: 14px;
    }

    .keyval {
        background: rgba(0,0,0,.1);

        td, th {
            padding: 10px;
            vertical-align: top;
            text-align: left;
            font-family: monospace;
        }

        th {
            font-size: .6em;
            text-transform: uppercase;
            letter-spacing: 1.8;
        }

        tr:nth-child(even) {
            background: rgba(0,0,0,.1);
        }
    }
    </style>
</head>
<body>

    <div class="wrapper">
        <h1>Something broke:</h1>
        <h2><?=nl2br(htmlentities($error['message']));?></h2>
    </div>
    <div class="wrapper content">

        <span class="file"><?=str_replace(APP_DIR, '', $error['file']);?></span>

        <div class="code">
            <pre><?php

                $file   = file(str_starts_with($error['file'], APP_DIR) ? $error['file'] : APP_DIR.$error['file']);
                $offset = 6;
                $line   = $error['line'] ? $error['line'] - 1 : 0;
                $start  = isset($file[$line-1]) ? $line - 1 : $line;
                $end    = $line + $offset;

                if ($start != $line) {

                    $i = $offset;

                    while (true) {

                        if (isset($file[($start-1)])) {
                            $start -= 1;
                        } else {
                            break;
                        }

                        if ($line - $start > $offset) break;
                    }
                }
            ?><ol start="<?=($start+1)?>"><?php

                for ($i=$start;$i<$line;$i++) {
                    if (isset($file[$i])) {
                        echo '<li>'.htmlentities($file[$i]).'</li>';
                    }
                }

                echo '<li class="selected">'.htmlentities($file[$line]).'</li>';

                for ($i=$error['line'];$i<$end;$i++) {
                    if (isset($file[$i])) {
                        echo '<li>'.htmlentities($file[$i]).'</li>';
                    }
                }
            ?></ol></pre>
        </div>

        <?php if (($error['trace'] ?? false) && count($error['trace'])): ?>
        <h3>Trace</h3>
        <div class="margin">
            <?php foreach ($error['trace'] as $idx => $trace): ?>
            <debug-trace>
                <div><strong class="badge"><?=$idx?></strong></div>
                <div style="flex-grow:1"><?=str_replace(APP_DIR, '', $trace['file']);?><span class="muted">:<?=$trace['line'];?></span></div>
                <div></div>
            </debug-trace>
            <?php endforeach; ?>
        </div>
        <?php endif; ?>

        <?php if (count(($this->request->request ?? []))): ?>
        <h3>Request payload</h3>
        <div class="margin">
            <table class="keyval">
                <thead>
                    <tr>
                        <th style="width:25%">Key</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($this->request->request as $key => $val): ?>
                    <tr>
                        <td><?=$key?></td>
                        <td><pre><?=trim(json_encode($val , JSON_PRETTY_PRINT), '"')?></pre></td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        <?php endif; ?>
        <div class="sysinfo">
            System message generated by App debug
        </div>
    </div>
</body>
</html>
