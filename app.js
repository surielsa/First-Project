        $(document).ready(function(){
            $("#map").show();  
            $("#showData").hide();
        }); 
        
        var births;
        var deaths;
        var birthRateArray = [];
        var deathRateArray = [];
        var data = [];
        var apiResponse;

        var queryURL = "https://api.census.gov/data/2014/pep/natstprc?get=STNAME,POP,BIRTHS,DEATHS,DENSITY,DIVISION&DATE=7&for=state:*&key=01583ab5bf70e73693ce188c438e8e312568ae00";
        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                apiResponse = response;
                console.log(apiResponse);
        });
        

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
        
        
        
