//The URIs of the REST endpoint
VUP = "https://prod-87.eastus.logic.azure.com:443/workflows/86460afb2f6244248cb457439e7b9abc/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=FhEHiZOFFpiz_XJR0Cm4kEYRjgH6csb-1ulh9Di3O-Q";

//Handlers for button clicks
$(document).ready(function() {
     //Handler for the new asset submission button
     $("#subNewForm").click(function(){
      //Execute the submit new asset function
      submitNewAsset();
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
    url: VUP, 
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

