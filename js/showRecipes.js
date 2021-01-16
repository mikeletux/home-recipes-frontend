$(document).ready(function() {
    //Read recipes summary to display the table
    $.ajax({
        url: endpoint + "/api/v1/recipes",
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        success: function(list){
            $.each(list, function(i) {
              //Format time to show
              var updatedDate = jQuery.format.prettyDate(list[i].updatedTime)
              var createdDate = jQuery.format.date(list[i].creationTime, 'dd/MM/yyyy')
                $(".table tbody").append("<tr>" +
                                         "<td>" + (i+1) + "</td>" +
                                         //"<td><a class=\"pe-auto\" id=\"recipeButton\" data-mdb-toggle=\"modal\" data-mdb-target=\"#exampleModal\" href=\"#\" recipe-link=\"" + list[i].location + "\">" + list[i].name + "</a></td>" +
                                         "<td><a class=\"pe-auto\" id=\"recipeButton\" href=\"#\" recipe-link=\"" + list[i].location + "\">" + list[i].name + "</a></td>" +
                                         "<td>" + updatedDate + "</td>" +
                                         "<td>" + createdDate + "</td>" +
                                         '<td id="recipeRemoval"><a href="#" location="' + list[i].location + '" recipeName="' + list[i].name + '"><i class="fas fa-times"> </i></a></td>' +
                                         "</tr>");
            });
        },
    });
});   

//Event that captures the click on each recipe (event-delegation)
$('#recipesTable tbody').on("click", "#recipeButton", function (e) {
    e.preventDefault();
    //console.log($( this ).attr("recipe-link"));
    $.ajax({
        url: endpoint + $( this ).attr("recipe-link"),
        type: "GET", 
        contentType: "application/json",
        dataType: 'json',
        success: function(item){
            //empty div that holds the modal
            $("#modalShowRecipe").empty();
            //Create HTML list
            var ingredientsList = ""; //Initialize the var
            $.each(item.ingredients, function(i) {
              ingredientsList += '<li class="list-group-item">' + item.ingredients[i] + '</li>'
            });
            //Write modal
            $("#modalShowRecipe").append(
                '<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
                '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                  '<div class="modal-header">' +
                    '<h5 class="modal-title" id="exampleModalLabel">' + item.name + '</h5>' +
                    '<button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close">' +
                    '</button>' +
                  '</div>' +
                  //Set vertigal gutters with gy-* class
                  '<div class="modal-body row gy-3">' +
                    //Header recipe image
                    '<div>' +
                      '<img src="' + item.image +'" class="img-fluid" alt="..." />' +
                    '</div>' +
                    '<div>' +
                      //Ingredients header
                      '<p class="h4">Ingredients</p>' +
                      //Add ingredients list
                      '<ul class="list-group">' +
                        ingredientsList +
                      '</ul>' +
                    '</div>' +
                    //Recipe steps header
                    '<div>' +
                      '<p class="h4">Recipe steps</p>' +
                      //Add recipe steps
                      item.text + 
                    '</div>' +
                  '</div>' + 
                  '<div class="modal-footer">' +
                    '<button type="button" class="btn btn-primary" data-mdb-dismiss="modal"> Close </button>' +
                  '</div>' +
                '</div>' +
              '</div>' +
              '</div>'
            );
            //Trigger modal from JS
            //$('#exampleModal').modal({ show: false})
            $('#exampleModal').modal('show');
        },
    });
});

//Adds ingredients to the list
$("#form-add-ingredients-button").click(function() {
  //Check if string is empty first
    $("#ingredients-list-form").append('<li class="list-group-item d-flex justify-content-between">' + 
                                          '<div id="ingredient-listname-form">' +
                                            $("#formRecipeIngredients").val() +
                                          '</div>' +
                                          '<div >' +
                                            '<a id="ingredient-remove-form" href="#" ><i class="fas fa-times"> </i></a>' +
                                          '</div>' +
                                      '</li>');
    $("#formRecipeIngredients").val("");
});

//Event that Removes ingredients from the list
$("#ingredients-list-form").on("click", "#ingredient-remove-form", function(e) {
  e.preventDefault();
  $(this).closest('li').remove();
});

//Event that POST the recipe to the backend
$('#createRecipeModal').on("click", "#saveRecipeButton", function (e) {
  e.preventDefault();
  //Get ingredients list
  var ingredientsList = []; //Initialize the var
  $("#ingredients-list-form li").each(function (){
    ingredientsList.push($(this).find("#ingredient-listname-form").text());
    //console.log(ingredientsList);
  });

  var recipe = {
    name: $("#createRecipeModal #formRecipeName").val(),
    image: $("#createRecipeModal #formRecipeImage").val(),
    ingredients: ingredientsList,
    text: $("#createRecipeModal #formRecipeSteps").val()
  }

  $.ajax({
    url: endpoint + "/api/v1/recipes",
    type:"POST",
    dataType: 'json',
    statusCode: {
      201: function(item) {
        //alert("Recipe created")
        $('#createRecipeModal').modal('hide'); //ALSO EMPTY THE FIELDS
        location.reload(); //It reloads the website
      }
    },
    data: JSON.stringify(recipe)
  });
});

//Event that captures when clicking on X for recipe removal
$("#recipesTable tbody").on("click", "#recipeRemoval", function(e){
  e.preventDefault();
  //Show warning window to prevent deleting recipe from mistake
  //recipeName Are you sure you want to delete this recipe?
  $('#recipeRemovalModal .modal-body').text("Are you sure you want to delete \"" + $(this).children("a").attr("recipeName") + "\" recipe?")
  $('#recipeRemovalButton').attr("location", $(this).children("a").attr("location"))
  $('#recipeRemovalModal').modal('show');
});

//Event that triggers recipe removal
$("#recipeRemovalModal").on("click", "#recipeRemovalButton", function(e){
  $.ajax({
    url: endpoint + $('#recipeRemovalButton').attr("location"),
    type:"DELETE",
    statusCode: {
      202: function(item) {
        //alert("Recipe removed")
        $('#recipeRemovalModal').modal('hide'); //ALSO EMPTY THE FIELDS
        location.reload(); //It reloads the website
      }
    },
    dataType: 'json'
  });
}); 