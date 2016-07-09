/**
 * Menu state
 */
app.menu = {};


app.menu.create = function () {

  // if (localStorage.hashtagJSON && localStorage.getItem('hashtagJSON') !== null) {
  //   // AJAX magic
  //   $.ajax({
  //     type: 'POST',
  //     url: 'php/index.php',
  //     async: true,
  //     dataType: 'json',
  //     data: {
  //       q: '#shmup',
  //       count: '10',
  //       until: '2016-07-02'
  //     },
  //   })
  //   .done(function(data) {
  //     // console.log(JSON.stringify(data));
  //     // console.log(app.menu.readData(data));
  //     if (data.statuses.length > 1 || !data.hasOwnProperty('errors')) {
  //       localStorage.setItem('hashtagJSON', JSON.stringify(data));
  //       console.log(localStorage.getItem('hashtagJSON'));
        
  //       app.game.state.start('level01');
  //     } else if (data.hasOwnProperty('errors')) {
  //       this.errorMsg(data);
  //     } else {
  //       console.log('möpp');
  //     }

  //   })
  //   .fail(function(jqXHR, textStatus, errorThrown) {
  //     var failMessage = 'ajax error: ' + textStatus + '\n' + 'errorThrown: ' + errorThrown;
  //     console.log(failMessage);

  //     var style = { font: "24px Arial", fill: "#ff0044", align: "left" };
  //     app.game.add.text(10, 0, failMessage, style);
  //   }); // END AJAX
  // } else {
    
  // }

  $.getJSON('js/test.json',
    function (data, textStatus, jqXHR) {
      // console.log(data);
      localStorage.setItem('hashtagJSON', JSON.stringify(data));
      // console.log(localStorage.getItem('hashtagJSON'));

      // continue to level
      app.game.state.start('level01');

    }
  );
};


// app.menu.readData = function(d) {
//   var output = '';

//   for (var key of d.statuses) {
//     output += key.created_at + '<br>'
//   }

//   return output;
// }

app.menu.errorMsg = function (error) {
    var code = 'Code: ' + error.code;
    var message = 'Message: ' + error.message;
    var style = { font: "24px Arial", fill: "#ff0044", align: "left" };

    var c = app.game.add.text(10, 0, text, style);
    var m = app.game.add.text(10, 30, message, style);
}