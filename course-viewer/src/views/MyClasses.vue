<html>
   <head>
      <title>VueJs Introduction</title>
      <script type = "text/javascript" src = "js/vue.js"></script>
   </head>
   <body>
      <div id = "intro" style = "text-align:center;">
         <h1>{{ message }}</h1>
      </div>
      <script type = "text/javascript">
        //load classes initially
        var json = require('./classes.json');
        var vue_det = new Vue({
          el: '#intro',
          data: {
            message: 'My first VueJS Task'
          }
        });
      </script>
   </body>
</html>