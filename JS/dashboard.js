//The URIs of the REST endpoint
RAI = "https://prod-53.eastus.logic.azure.com:443/workflows/74aa47df4e434d568e167608fb87022d/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=qM2-jpUWzNz0oOyLETH0LmHjn1zWB0UwF6iSL4BfrCk";
RAV = "https://prod-73.eastus.logic.azure.com:443/workflows/b974a35e9773429f918aebbcac24a065/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=YgfBH-S8ZELkkKTz2AcxlhPOmZ9F9N59qCYod2sc5cM"
// Base URI: 
BLOB_ACCOUNT = "https://netflicblobstorage.blob.core.windows.net";

if (sessionStorage.getItem('isAdmin') === 'true') {
  const navbar = document.getElementsByClassName('navbar-nav')
  const li =  document.createElement("li");
  li.setAttribute('class', 'nav-item')
  const a = document.createElement("a");
  a.setAttribute('class', 'nav-link')
  a.setAttribute('href', './uploadVideo.html')
  a.textContent = 'Upload Video'
  console.log($('.navbar-nav'))
  li.appendChild(a)
  navbar[0].appendChild(li)
}

//Handlers for button clicks
$(document).ready(function() {
  $("#retImages").click(function(){
      //Run the get asset list function
      getImages();
  }); 
});

function submitRating(formID, id) {
  //Get form variables and append them to the form data object
  const num = formID.charAt(formID.length -1)
  const rating = $(`#${formID} #rating${num}`).val()

  $.ajax({ 
    url: "https://prod-46.eastus.logic.azure.com/workflows/eb73bdd7ca624370b0af299fcdd354a5/triggers/manual/paths/invoke/" + id + "/" + rating + "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=hbDbumLq4y9MJ5-1SnwwZjd5AVOnGfSeFakvO4kGZqI", 
    cache: false, 
    contentType: false, 
    processData: false, 
    type: 'POST', 
    success: function(data){ 
    } 
  });
}

function deleteVideo(docID, filepath) {
  $.ajax({ 
    url: "https://prod-76.eastus.logic.azure.com/workflows/5b02ce8174554f65a930aad3c84e84d1/triggers/manual/paths/invoke/" + filepath + "/" + docID + "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=JhqA0B6GR8ChvqU-wtj9od2ZMwD2eYNPwILIK-7eCGg", 
    type: 'DELETE', 
    success: function(data){ 
    } 
  });
}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages(){
  //Replace the current HTML in that div with a loading message
  $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

  $.ajax({url: RAV, headers: {'Access-Control-Allow-Origin': '*'}, type: 'GET', success: function( data ) {
    //Create an array to hold all the retrieved assets
    var items = [];
    let i = 0
    console.log(data[1])
    //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each( data[0], function( key, val ) {
      items.push( "<hr />");
      items.push(`<video width='320' height='240' controls crossorigin="anonymous"><source src='${BLOB_ACCOUNT}${val["filepath"]}' type='video/mp4'><track default kind='captions' srclang='en' src='${BLOB_ACCOUNT}${val["filepath"].replace("netflicvideostore", "netfliccaptionstore")}''></video><br/ >`)
      items.push( "File : " + val["fileName"] + "<br />");
      items.push( "Uploaded by: " + val["userName"] + " (user id: "+val["userID"]+")<br />");
      items.push( `<form id='ratingForm${i}' data-selected='1'>
                      <input type='number' name='rating' id='rating${i}'/>
                      <button type="button" id='${val["id"]}' class="btn btn-primary subRatingForm">Submit Rating</button><br/>
                    </form><br/>`);
      if (sessionStorage.getItem('isAdmin') === 'true') {
        items.push( `<button type="button" data-documentid='${val["id"]}' data-filepath='${val["filepath"]}' class="btn btn-primary deleteVideo" on>Delete</button><br/>`);
      }
      items.push(``)
      items.push( "<hr />");
      i++ 
    });    

    //Clear the assetlist div 
    $('#ImageList').empty();
    //Append the contents of the items array to the ImageList Div
    $( "<ul/>", { "class": "my-new-list", html: items.join( "" ) }).appendTo( "#ImageList" );
    
    $(`.subRatingForm`).click(function(){
      submitRating($(this)[0].parentNode.id, $(this)[0].id)
    });

    $(`.deleteVideo`).click(function(){
      deleteVideo(this.dataset.documentid, this.dataset.filepath.replace('/netflicvideostore/', ''))
    });
  }});
}

