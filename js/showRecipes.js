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
            console.log(item);
            //Check if the id exists. If no, create it. If so, just replace everything
            $("body").append(
                '<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
                '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                  '<div class="modal-header">' +
                    '<h5 class="modal-title" id="exampleModalLabel">' + item.name + '</h5>' +
                    '<button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close">' +
                    '</button>' +
                  '</div>' +
                  '<div class="modal-body">' + item.text + '</div>' + 
                  '<div class="modal-footer">' +
                    '<button type="button" class="btn btn-secondary" data-mdb-dismiss="modal"> Close </button>' +
                    //'<button type="button" class="btn btn-primary">Save changes</button>' +
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