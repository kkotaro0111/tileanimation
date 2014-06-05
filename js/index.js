$(function(){
  $("#anim").tileanimation("init", {
      width: 480,
      height: 360,
      numcol: 5,
      numrow: 5,
      maxframe: 23,
      reverse: false,
      type: "background"
  });

  $("#playbtn").on("click", function(){
    $("#anim").tileanimation("to", {to: 23, direction: 1, frametime: 2});
    $("#stopbtn").removeAttr("disabled");
    $("#playbtn").attr("disabled", "disabled");
  });

  $("#stopbtn").on("click", function(){
    $("#anim").tileanimation("stop");
    $("#playbtn").removeAttr("disabled");
    $("#stopbtn").attr("disabled", "disabled");
  });
});
