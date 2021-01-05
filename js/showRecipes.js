$(document).ready(function() {
    let endpoint = 'http://localhost:8080/api/v1'

    $.ajax({
        url: endpoint + "/recipes",
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        success: function(list){
            console.log(list)
            $.each(list, function(i) {
                $(".table tbody").append("<tr>" +
                                        "<td>" + (i+1) + "</td>" +
                                         "<td>" + list[i].name + "</td>" +
                                         "<td>" + list[i].updatedTime + "</td>" +
                                         "</tr>")
            });
        },
    });


});