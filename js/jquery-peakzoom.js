/*!
  Tuomas Salo <tuomas.salo@iki.fi>
  license: MIT
  Version: 0.0.1
*/
(function($, window, undefined) {
  'use strict';
  $.fn.peakzoom = function() {
    return this.each(function() {

      var
        $container = $(this),
        $inner = $container.find('div'),
        $img = $container.find('img'),
        rotation,
        scale,
        mouseButtonPressed = false,
          init = function() {
          $img.add($inner).css('transform', '');
          rotation = /* $container.data('peakzoom-rotation') || */ 0;
          scale = 1;
        }
      ;
      
      init();
    
      $container.on('peakzoom.destroy', init);
      $container.on('peakzoom.rotate', function() {
        rotation += 90;
        scale = (rotation % 180) ? Math.min($img.height()/$img.width(), $inner.width()/$img.height()) : 1;
        $inner.css({
          transform: 'rotate(' + rotation + 'deg) scale(' + scale + ')',
        });
      });

      $container.mousedown(function(e) {
        mouseButtonPressed = true;
        show(e, this);
      });
      $container.on('mouseup mouseleave touchend touchleave', function(e) {
        e.preventDefault();
        e.stopPropagation();
        mouseButtonPressed = false;
        $img.css('transform', '');
      });

      $container.mousemove(function(e) {
        if(mouseButtonPressed) {
          e.preventDefault();
          e.stopPropagation();
          show(e, this);
        }
      });

      $container.on('touchstart touchmove', function(e) {
        e.preventDefault();
        e.stopPropagation();
        show(e.originalEvent.touches[0] || e.originalEvent.changedTouches[0], this);
      });

      function show(e, elem) {
        var offset = $(elem).offset();
        var x = e.pageX - offset.left - $inner.width()/2;
        var y = e.pageY - offset.top  - $inner.height()/2;
        var imgWidth, imgHeight;
        if(rotation % 180) {
          imgWidth  = scale * $img.height();
          imgHeight = scale * $img.width();
        } else {
          imgWidth  = scale * $img.width();
          imgHeight = scale * $img.height();
        }

        var xSize = Math.min($inner.width(),  imgWidth);
        var ySize = Math.min($inner.height(), imgHeight);
        var scaleFactor = 4.5; // TODO: make this an option
        // Where have we clicked/tapped?
        // (As percentages, 0..100%, origin in left top corner of the image, with current orientation)
        var margin = 0;
        var p = [
      Math.max(0, Math.min(100, 50+(100+margin)*x/xSize)),
      Math.max(0, Math.min(100, 50+(100+margin)*y/ySize)),
    ];
        // Rotate `p` to the original image orientation
        if(rotation % 360 === 90) {
          p = p.reverse();
          p[1] = 100 - p[1];
        } else if(rotation % 360 === 180) {
          p[0] = 100 - p[0];
          p[1] = 100 - p[1];
        } else if (rotation % 360 === 270) {
          p = p.reverse();
          p[0] = 100 - p[0];
        }
        $img.css({
          transformOrigin: '' + p[0] + '% ' + p[1] + '%',
          transform: 'scale(' + scaleFactor + ') '
        });
      }
    });
  };
})(window.jQuery, window);
