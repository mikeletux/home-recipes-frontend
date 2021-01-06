//Rest API endpoint
let endpoint = 'http://localhost:8080';

$(document).ready(function() {
    //Read recipes summary to display the table
    $.ajax({
        url: endpoint + "/api/v1/recipes",
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        success: function(list){
            //console.log(list);
            $.each(list, function(i) {
                $(".table tbody").append("<tr>" +
                                         "<td>" + (i+1) + "</td>" +
                                         //"<td><a class=\"pe-auto\" id=\"recipeButton\" data-mdb-toggle=\"modal\" data-mdb-target=\"#exampleModal\" href=\"#\" recipe-link=\"" + list[i].location + "\">" + list[i].name + "</a></td>" +
                                         "<td><a class=\"pe-auto\" id=\"recipeButton\" href=\"#\" recipe-link=\"" + list[i].location + "\">" + list[i].name + "</a></td>" +
                                         "<td>" + list[i].updatedTime + "</td>" +
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