$(document).ready(function() {
     $("#subLoginForm").click(function(){
      getUser();
    }); 
});


function getUser() {
    const username = $('#username').val(); 
    const password = $('#password').val(); 

    console.log(username, password)

    GSU = 'https://prod-00.northeurope.logic.azure.com/workflows/f713b11eb4db46b7a0758abeabd40cd0/triggers/manual/paths/invoke/api/v1/users/' + username + '/' + password + '?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=gbzBE5D0R267GWaJUnhxSMYSp2QZ7apFRzdqwE4V1ts';

    $.getJSON(GSU, function( data ) {
        sessionStorage.setItem('isAdmin', data.ResultSets.Table1[0].isAdmin )
        sessionStorage.setItem('username', data.ResultSets.Table1[0].username)
        console.log(data.ResultSets.Table1[0].isAdmin)
    });
}
