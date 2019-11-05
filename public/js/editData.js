var Action = "";

$(".inc").click(function(){
    Action = ""
    Action += "/edit/income/" + this.id
    console.log(Action)
})

$(".exp").click(function(){
    Action = ""
    Action += "/edit/expense/" + this.id
    console.log(Action)
})

$(".edt[data-target='#myModal']").click(function() {
    var columnHeadings = $("thead.inEx th").map(function() {
              return $(this).text();
           }).get();
    console.log(columnHeadings);


    
    columnHeadings.pop();
    columnHeadings.pop();
    
    var columnValues = $(this).parent().siblings().map(function() {
              return $(this).text();
    }).get();

var modalBody = $('<div id="modalContent"></div>');
var modalForm = $('<form name="modalForm" action="'+Action+'" method="POST"></form>');
$.each(columnHeadings, function(i, columnHeader) {
    var formGroup = $('<div class="form-group"></div>');
    formGroup.append('<label for="'+columnHeader+i+'">'+columnHeader+'</label>');
    formGroup.append('<input autocomplete="off" type="text" class="form-control" name="'+columnHeader+i+'" id="'+columnHeader+i+'" value="'+columnValues[i]+'">'); 
    modalForm.append(formGroup);
});
modalBody.append(modalForm);
$('.modal-unique').html(modalBody);
});
$('.modal-footer .btn-success').click(function() {
$('form[name="modalForm"]').submit();
});