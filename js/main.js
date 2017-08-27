/**
 * Created by Batu on 04/07/16.
 */

//Top bar location by scroll
$(document).on('scroll', function (e) {
    if($(document).scrollTop()<38){
        $('#navbar-container').css('margin-top',-$(document).scrollTop());
    }else{
        $('#navbar-container').css('margin-top',-38);
    }
});
//Smooth scroll
$(function () {
    $('.scroller>a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});
//Project photo containers fade-in
$(".project").on('click',function(){
    jQuery(this).parent().children().removeClass('project-active');
    jQuery(this).addClass('project-active');
    var cont_id="#"+this.id+"-container";
    if( $(cont_id).height()+450> $(window).height()+180 ){
        $("#projects-container").css("height",$(cont_id).height()+450+"px");
    } else{
        $("#projects-container").css("height", $(window).height()+180+"px");
    }
    $(".photo-container").fadeOut();
    $(cont_id).fadeIn();
});
//Slider
$(function() {

    var Page = (function() {

        var $navArrows = $( '#nav-arrows' ),
            $nav = $( '#nav-dots > span' ),
            slitslider = $( '#slider' ).slitslider( {
                onBeforeChange : function( slide, pos ) {

                    $nav.removeClass( 'nav-dot-current' );
                    $nav.eq( pos ).addClass( 'nav-dot-current' );

                }
            } ),

            init = function() {

                initEvents();

            },
            initEvents = function() {

                // add navigation events
                $navArrows.children( ':last' ).on( 'click', function() {

                    slitslider.next();
                    return false;

                } );

                $navArrows.children( ':first' ).on( 'click', function() {

                    slitslider.previous();
                    return false;

                } );

                $nav.each( function( i ) {

                    $( this ).on( 'click', function( event ) {

                        var $dot = $( this );

                        if( !slitslider.isActive() ) {

                            $nav.removeClass( 'nav-dot-current' );
                            $dot.addClass( 'nav-dot-current' );

                        }

                        slitslider.jump( i + 1 );
                        return false;

                    } );

                } );

            };

        return { init : init };

    })();

    Page.init();

    /**
     * Notes:
     *
     * example how to add items:
     */

    /*

     var $items  = $('<div class="sl-slide sl-slide-color-2" data-orientation="horizontal" data-slice1-rotation="-5" data-slice2-rotation="10" data-slice1-scale="2" data-slice2-scale="1"><div class="sl-slide-inner bg-1"><div class="sl-deco" data-icon="t"></div><h2>some text</h2><blockquote><p>bla bla</p><cite>Margi Clarke</cite></blockquote></div></div>');

     // call the plugin's add method
     ss.add($items);

     */

});


$(function() {
    // initialize
    $('.photo-div').peakzoom();
    $('input').click(function() {
        $(this>img).trigger('peakzoom.rotate');
    });

});

$(function(){
    if($(window).width()>900){
        $('#landing-container').css("height",$(window).width()/2+"px");

    }else{
        $('#landing-container').css("height",$(window).width()+"px");

    }
    $('#slider').css("height",$("#landing-container").height()+80+"px");
    $('#slider-cont').css("height",$("#landing-container").height()+80+"px");
    $('.sl-slider-wrapper').css("height",$("#landing-container").height()+80+"px");
})
$(window).resize(function () {
    if($(window).width()>900){
        $('#landing-container').css("height",$(window).width()/2+"px");
    }else{
        $('#landing-container').css("height",$(window).width()+"px");
    }
    $('#slider').css("height",$("#landing-container").height()+80+"px");
    $('#slider-cont').css("height",$("#landing-container").height()+80+"px");
    $('.sl-slider-wrapper').css("height",$("#landing-container").height()+80+"px");
    $("#projects-container").css("height",$("#yeni-container").height()+450+"px");

})

