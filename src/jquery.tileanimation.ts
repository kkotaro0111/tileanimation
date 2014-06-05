/// <reference path="../typings/tsd.d.ts" />

(function(jQuery){
  jQuery.fn.tileanimation = function( type, settings){

    var options = jQuery.extend({
      width: 0,
      height: 0,
      numcol: 0,
      numrow: 0,
      offset: void 0,
      maxframe: 0,
      frame: 0,
      reverse: false,
      type: "margin"
    }, settings);

    return this.each(function(){
      var t$ = jQuery(this);
      
      if(type === "init"){
        t$.data("spanim", jQuery.extend({}, options));
      }else if( type === "to"){
        var data = t$.data("spanim");
        t$.tileanimation("stop");
        var direction = settings.direction || 0;
        var frametime = settings.frametime || 1;
        var currentFrameCount = frametime;
        var normalizeframe = (data.frame - settings.to + data.maxframe) % data.maxframe;
        if( direction === 0){
          if( normalizeframe > data.maxframe / 2){
            direction = 1;
          }else{
            direction = -1;
          }
        }

        data.offset = (data.offset + data.frame + data.maxframe) % data.maxframe || 0;

        //rotateTo interface
        var rotateTo: {
          ():any;
          playing: Boolean;
        };

        rotateTo = (() => {
          var _f: any = function(){
            currentFrameCount -= 1;
            if( currentFrameCount === 0){
              currentFrameCount = frametime;
              var frame = data.frame + direction;
              if( data.reverse ){
                frame = data.maxframe - frame;
              }
              frame = (frame + data.maxframe) % data.maxframe;
              t$.tileanimation(frame, true);
              if( rotateTo.playing && frame !== settings.to){
                requestAnimationFrame(rotateTo);
              }else{
                rotateTo.playing = false;
                t$.trigger("animationStop");
              }
            }else{
              requestAnimationFrame(rotateTo);
            }
          };
          return _f;
        })();

        rotateTo.playing = true;
        rotateTo();

        data.currentAnimation = rotateTo;

      }else if( type === "stop"){
        var data = t$.data("spanim");
        if( jQuery.isFunction( data.currentAnimation )){
          data.currentAnimation.playing = false;
          data.currentAnimation = void 0;
        }
      }else if(jQuery.isNumeric( type )){
        var data = t$.data("spanim");
        var offset = (settings ? 0 : data.reverse ? data.maxframe - data.offset : data.offset) || 0 ;
        var frame = ((type << 0) % data.maxframe ) - offset;
        if( data.reverse ){
          frame = data.maxframe - frame;
        }
        frame = (frame + data.maxframe) % data.maxframe;
        data.frame = frame;
        var col = frame % data.numcol;
        var row = ((frame / data.numcol) << 0 ) % data.numrow;

        var xpos = - (col * data.width);
        var ypos = - (row * data.height);
        var pos = xpos + "px " + ypos + "px";

        if( data.type === "margin" ){
          t$.css({
            marginLeft: xpos,
            marginTop: ypos
          });
        }else if( data.type === "background" ){
          var bgp = xpos + "px " + ypos + "px"
          t$.css({
            backgroundPosition: bgp
          });
        }
      }
    });
  };
})(jQuery);
