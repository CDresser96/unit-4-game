$(document).ready(function() {

    var $hoverSound = $("#hoverSound");
    
        $(".character > .image").on('mouseenter', function() {
            $hoverSound.get(0).play();
        });
    
        $(".character > .image").on('mouseout', function() {
            $hoverSound.get(0).pause();
            $hoverSound.get(0).currentTime = 0;
        });
    
    });