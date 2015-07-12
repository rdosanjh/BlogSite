(function(){
  var init = (function(){
      $("#adminForm").on("submit", function (e) {
        e.preventDefault();
          var data = {
            title: $("#title").val(),
            article: $("#article").val()
          };
        console.log(data);
        $.post("/admin", data)
        .then(function(){
          toastr.success('Article has been submitted', 'Shizzz is all good');
          $("#title").val("");
          $("#article").val("");
        })
      })
  })
  init();
}())
