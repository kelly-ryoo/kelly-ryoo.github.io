    var idleTime = 0;
    $(document).ready(function () {
    //Increment the idle time counter every minute.
    var idleInterval = setInterval(timerIncrement, 1000); // 1 minute
    
    //Zero the idle timer on mouse movement.
    $(this).mousemove(function (e) {
        idleTime = 0;
        $('.navbar').fadeIn('slow');
    });
    $(this).keypress(function (e) {
        idleTime = 0;
    });
    });
    
    function timerIncrement() {
    idleTime = idleTime + 1;
    if (idleTime > 1) {
      $('.navbar').fadeOut('slow');
    }
    }
  