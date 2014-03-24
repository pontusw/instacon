<?php
// SET SERVER
require_once("api/config.php");
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Zquick</title>
  <base href='<?php echo SERV;?>'/>
  <link rel="stylesheet" href="public/css/womsgrid.css"/>
  <link rel="stylesheet" href="public/css/linecon.css"/>
  <link rel="stylesheet" href="public/css/typicons.min.css"/>
  <link rel="stylesheet" href="public/css/style.css"/>
  <link rel="stylesheet" href="public/css/responsive.css"/>
  
  <meta name="viewport" content="width=device-width, user-scalable=no">

  <script data-main="public/js/main" src="public/js/libs/require.js"></script>

</head>

<body>
  <div id="reveal-left" class="reveal revealover"></div>
  <div id="reveal-right" class="reveal revealover"></div>

  <div id="instapp" class="mainapp blur_on_blur">
  <div class="content">
    <header>

      <h1>Ready. <span>Z</span> Go!</h1>

      <div id="menu">
      </div>

    </header>
  </div>
    <section id="main">
      <div class="bg">
        <div class="content">
      
          <div class="grid grid">
            <div class="col-9">
              <div id="static-content" class="main-static"></div>
            </div>
            <div class="col-3">
              <div id="winner" class="winner"></div>
            </div>
          </div>

        </div>
      </div>

      <div class="bg">
        <div class="content">
          <div id="instafeed"></div>
        </div>
      </div>

    </section>

    <footer>

    </footer>

  </div>
  <div id="#lightbox"></div>
  <div class="backclick"></div>


  </body>
</html>



