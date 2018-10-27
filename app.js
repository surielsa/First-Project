$(document).ready(function(){
$("#map").show();  
$("#showData").hide();
}); 

var births;
var deaths;
var birthRateArray = [];
var deathRateArray = [];
var data = [];
var articles = [];
var apiResponse;
var queryResponse;

var queryURL = "https://api.census.gov/data/2014/pep/natstprc?get=STNAME,POP,BIRTHS,DEATHS,DENSITY,DIVISION&DATE=7&for=state:*&key=01583ab5bf70e73693ce188c438e8e312568ae00";
var query = "https://newsapi.org/v2/top-headlines?sources=usa-today&apiKey=e66bdc8eb9fa498abce2bdd00c3049fe";

$.ajax({
url: queryURL,
method: "GET"
}).then(function(response) {
    apiResponse = response;
    console.log(apiResponse);
});
// console.log(apiResponse);

$.when( $.ajax( query ) ).then(function( data, textStatus, jqXHR ) {
    // alert( jqXHR.status ); // Alerts 200
    console.log(data);
    afterResponse(data);
});
// $.ajax({
// url: query,
// method: "GET"
// }).then(function(response1){
//     queryResponse = response1;
//     console.log(queryResponse);
// });
// console.log(response1);
function afterResponse(queryResponse){
$.each(queryResponse.articles, function(index, value){
    
        var obj1 = value.description;
        console.log(obj1);
        articles.push(obj1);
})
console.log(articles);
}

$("#addState").on('click', function(){
console.log("Inside functionPOP")
$("#map").hide();  
$("#showData").show();   
var stateInput = $("#stateInput").val().trim();
console.log(queryURL);
$.each(apiResponse, function(index, value){
    if(index == 0){
        return;
    }
    else{
        // console.log(value)
        var obj = {};
        obj.value = value[4];
        obj.code = value[0];
        data.push(obj);
        console.log(obj);
        var state = value[0];
        var pop = value[1];
        births = value[2];
        deaths = value[3];
        if(stateInput.toLowerCase() === state.toLowerCase()){
            //console.log(pop);
            $("#showData").text(JSON.stringify("Total Population is: " + pop));
            $("#showData").append(JSON.stringify("Total Births are: " + births));
            $("#showData").append(JSON.stringify("Total Deaths are: " + deaths));
        }
    }
});
})


var map = AmCharts.makeChart( "chartdiv", {
"type": "map",
"theme": "black",

"panEventsEnabled": true,
//"backgroundColor": "#666666",
//"backgroundAlpha": 1,
"dataProvider": {
"map": "usaLow",
"getAreasFromMap": true
},
"areasSettings": {
"autoZoom": false,
"color": "#772963",
"colorSolid": "#5EB7DE",
"selectedColor": "#5EB7DE",
"outlineColor": "#666666",
"rollOverColor": "#88CAE7",
"rollOverOutlineColor": "#FFFFFF",
"selectable": true
},
"listeners": [ {
"event": "clickMapObject",
"method": function( event ) {
    // deselect the area by assigning all of the dataProvider as selected object
    map.selectedObject = map.dataProvider;

    // toggle showAsSelected
    event.mapObject.showAsSelected = !event.mapObject.showAsSelected;

    // bring it to an appropriate color
    map.returnInitialColor( event.mapObject );

    // let's build a list of currently selected states
    var states = [];
    for ( var i in map.dataProvider.areas ) {
    var area = map.dataProvider.areas[ i ];
    if ( area.showAsSelected ) {
        states.push( area.title );
    }
    }
    $("#dataTable").empty();
    $.each(apiResponse, function(index, value){

        if(index == 0){
            return;
    }
    else{
        if(states.indexOf(value[0]) >= 0){
            var state = value[0];
            var pop = value[1];
            var birth = value[2];
            var death = value[3];

            var row = "<tr>" + "<td>" + state + "</td>"
                        + "<td>" + pop + "</td>" 
                        + "<td>" + birth + "</td>"
                        + "<td>" + death + "</td>"
                        + "</tr>";
            $("#dataTable").append(row);
        }
    }
    });
}
} ],
"export": {
"enabled": true
}
});


// function findPOP(){
//     console.log("Inside functionPOP")
//     $("#map").hide();  
//     $("#showData").show();   
//     var stateInput = $("#stateInput").val();
//     console.log(queryURL);
//     $.each(apiResponse, function(index, value){
//         if(index == 0){
//             return;
//         }
//         else{
//             // console.log(value)
//             var obj = {};
//             obj.value = value[4];
//             obj.code = value[0];
//             data.push(obj);
//             console.log(obj);
//             var state = value[0];
//             var pop = value[1];
//             births = value[2];
//             deaths = value[3];
//             if(stateInput.toLowerCase() === state.toLowerCase()){
//                 //console.log(pop);
//                 $("#showData").text(JSON.stringify("Total Population is: " + pop));
//                 $("#showData").append(JSON.stringify("Total Births are: " + births));
//                 $("#showData").append(JSON.stringify("Total Deaths are: " + deaths));
//             }
//         }
//     });
// }

        
        
