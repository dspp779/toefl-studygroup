var data_id = ""
$(document).ready(function(){
  data_id = $('.data-select:last-child').attr('data-val') ;

  call_data(data_id) ;

  $('.data-select').click(function(){
    $('.selected_data').text($(this).text()) ;
    data_id = $(this).attr('data-val') ;
    $('#q').html("") ;
    call_data(data_id) ;
  }) ;

  $('#answer').click(check_answer) ;
});

function call_data(data_id) {
  $.ajax({
    url: '/vocabulary/q/' + data_id,
    dataType: 'json'
  })
  .done(function(data){
    data.entries.forEach(function(item){
        tr = $('<tr />') ;
        td_q = $('<td />').text(item) ;
        td_a = $('<td />').addClass('ans') ;
        td_t = $('<input type="text" />').addClass('form-control').attr('name', 'data[]') ;
        td_ca = $('<td />').addClass('cans') ;
        td_verify = $('<td />').addClass('vans').append($('<i />').addClass('glyphicon glyphicon-remove hide').css('color', 'red')) ;
        $('#q').append(tr.append(td_q).append(td_a.append(td_t)).append(td_ca).append(td_verify)) ;
    });
  }) ;
}

function check_answer() {
  if(!data_id)
    return;

  $.ajax({
    url: '/vocabulary/a/' + data_id,
    dataType: 'json'
  })
  .done(function(data){
    var correct = 0 ;
    entries = data.entries

    // check answer
    $('input[name="data[]"]').each(function(index){
      $($('.cans')[index]).text(entries[index]) ;
      $($('.vans i')[index]).removeClass('hide') ;
      if (entries[index] == $(this).val().trim())
      {
        correct += 1 ;
        $($('.vans i')[index]).removeClass('glyphicon-remove').addClass('glyphicon-ok').css('color', 'green') ;
      }
    }) ;

    // compute score
    score = (correct * 100.0 / entries.length).toFixed(2) ;
    swal("Good job!", "You get " + score + " / 100 points", "success") ;
  }) ;
}
