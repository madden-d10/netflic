//The URIs of the REST endpoint
RAI = "https://prod-53.eastus.logic.azure.com:443/workflows/74aa47df4e434d568e167608fb87022d/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=qM2-jpUWzNz0oOyLETH0LmHjn1zWB0UwF6iSL4BfrCk";

// Base URI: 
BLOB_ACCOUNT = "https://netflicblobstorage.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function() {
  $("#retImages").click(function(){

      //Run the get asset list function
      getImages();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
});

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages(){
  //Replace the current HTML in that div with a loading message
  $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

  $.getJSON(RAI, function( data ) {
    //Create an array to hold all the retrieved assets
    var items = [];

    //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each( data, function( key, val ) {
      items.push( "<hr />");
      // items.push("<img src='"+BLOB_ACCOUNT + val["filepath"] +"' width='400'/> <br />")
      items.push("<video width='320' height='240' controls><source src='"+BLOB_ACCOUNT + val["filepath"] +"' type='video/mp4'></video>")
      items.push( "File : " + val["fileName"] + "<br />");
      items.push( "Uploaded by: " + val["userName"] + " (user id: "+val["userID"]+")<br />");
      items.push( "<hr />");
    });

    //Clear the assetlist div 
    $('#ImageList').empty();
    //Append the contents of the items array to the ImageList Div
    $( "<ul/>", { "class": "my-new-list", html: items.join( "" ) }).appendTo( "#ImageList" );
  });
}

