function calcRemaining(){

  var msg     = $('#twitter textarea').val();
  var length  = 140 - msg.length;
  $('.chars').text(length);

  $('#twitter .form-group').removeClass('has-warning');
  $('#twitter .form-group').removeClass('has-error');

  if(length >= 0 && length < 10) {
    $('t#witter .form-group').addClass('has-warning'); // twitter and SPACE because it IS a child of form group
  }

  if(length < 0) {
    $('#twitter .form-group').addClass('has-error');
  }
}

function sendTweet(e){
    e.preventDefault();

    var msg = $('#twitter textarea').val();
    if(msg.length > 140) {
      return; //Can't send if more than 140
    }

    console.log(msg);

    $.ajax({
        method: "POST",
        url: '/twitter',
        data: {tweet: msg}
    }).done(function(data){
          $('#twitter textarea').val('');
          // Todo add success message
          console.log(data);
    });

}



$(document).ready(function(){
  console.log('ready');

  // Attach functions here

  $('#twitter textarea').on('change keyup paste', calcRemaining);
  $('#twitter button').on('click', sendTweet);
});