//The URIs of the REST endpoint
IUPS = "https://prod-23.eastus.logic.azure.com:443/workflows/f8c3172306d4408fa7484f5645fb862d/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=IcLapt7rtLbbWvyaH0uA4gYPNh1GEnJN9dHppQDhf7U";

//Handlers for button clicks
$(document).ready(function() {
  $("#retImages").click(function(){
      //Run the get asset list function
      getImages();
  }); 
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
  //Create a form data object
  submitData = new FormData();
  //Get form variables and append them to the form data object
  submitData.append('FileName', $('#FileName').val()); 
  submitData.append('userID', $('#userID').val()); 
  submitData.append('userName', $('#userName').val()); 
  submitData.append('File', $("#UpFile")[0].files[0]); 

  //Post the form data to the endpoint, note the need to set the content type header
  $.ajax({ 
    url: IUPS, 
    data: submitData, 
    cache: false, 
    enctype: 'multipart/form-data', 
    contentType: false, 
    processData: false, 
    type: 'POST', 
    success: function(data){ 

    } 
  });
}

