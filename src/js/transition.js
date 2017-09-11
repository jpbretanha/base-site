/* 
* Function to animate leaving a page
*/
$.fn.leavePage = function() {   
    
  this.click(function(event){

    // Don't go to the next page yet.
    event.preventDefault();
    linkLocation = this.href;
    
    // Fade out this page first.
    $('body').fadeOut(500, function(){
      
      // Then go to the next page.
      window.location = linkLocation;
    });      
  }); 
};


/* 
* Call the leavePage function upon link clicks with the "transition" class
*/
$('.transition').leavePage();