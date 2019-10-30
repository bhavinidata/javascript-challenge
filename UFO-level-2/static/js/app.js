// from data.js
var tableData = data;

let tbody = d3.select("tbody")
// function to populate the whole dataset into the table
function poplulateTable(data){
    data.forEach(sightingData=>{
        const trow = tbody.append("tr");
        columns= ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"];
        columns.forEach(key=>{
            trow.append("td").text(sightingData[key]);
        })
    })
}
poplulateTable(tableData);

function addDropdown(ddId, ddValue){
    // function to add "select" as default value in dropdown
    function addSelects(selectid){
        selectid.data(["--Select--"])
        .enter()
        .append("option")
        .attr("value",function(d){ return d;})
        .text(function(d){ return d;})
    }
    const dd = d3.select("#filters").append("select")
        .attr("id", ddId)
        .attr("class", "form-control")
        .selectAll("option");
    addSelects(dd);
    // add data to dropdown 
    dd.data(d3.map(tableData, function(d){
            return d[ddValue];}).keys())
        .enter()
        .append("option")
        .attr("value",function(d){ return d;})
        .text(function(d){ return d;});
}
// add country dropdown
addDropdown("countrySelector","country");
// add state dropdown
addDropdown("stateSelector","state");
// add city dropdown
addDropdown("citySelector","city");
// add shape dropdown
addDropdown("shapeSelector","shape");
 
// after seclecting country, populate state dropdown based on selected country
d3.select("#countrySelector")
    .on("change", function(){
        d3.event.preventDefault();
        const selectedCountry = d3.select("#countrySelector").node().value;
        console.log(selectedCountry);
        if (selectedCountry === "--Select--"){
            // if selecteed country is "--Select--" on change event then append all the states to state dropdown.
            const states = d3.select("#stateSelector").selectAll("option").data(d3.map(tableData, function(d){
                return d.state;}).keys())
            states.enter()
            .append("option")
            // .merge(states)
            .attr("value",function(d){ return d;})
            .text(function(d){ return d;});
        }
        else{
        const stateOptions = tableData.filter(sightingData=>sightingData.country === selectedCountry);
        const selectedStates = d3.select("#stateSelector").selectAll("option").data(d3.map(stateOptions, function(d){
            return d.state;}).keys());
        selectedStates.exit().remove();
        selectedStates.enter()
            .append("option")
            .merge(selectedStates)
            .attr("value",function(d){ return d;})
            .text(function(d){ return d;});

        const addSelect = selectedStates.data(["--Select--"]);
        addSelect.enter()
            .append("option")
            .merge(addSelect)
            .attr("value",function(d){ return d;})
            .text(function(d){ 
                return d;})
        }
    });

// after seclecting State, populate city dropdown based on selected state
d3.select("#stateSelector")
    .on("change", function(){
        d3.event.preventDefault();
        const selectedState = d3.select("#stateSelector").node().value;
        const cityOptions = tableData.filter(sightingData=>sightingData.state === selectedState);
        const selectedCities = d3.select("#citySelector").selectAll("option").data(d3.map(cityOptions, function(d){
            return d.city;}).keys());

        selectedCities.exit().remove();
        selectedCities.enter()
            .append("option")
            .merge(selectedCities)
            .attr("value",function(d){ return d;})
            .text(function(d){ return d;});
        const addSelect = selectedCities.data(["--Select--"]);
        addSelect.enter()
            .append("option")
            .merge(addSelect)
            .attr("value",function(d){ return d;})
            .text(function(d){ 
                return d;})
    });

// after seclecting city, populate shape dropdown based on selected city
d3.select("#citySelector")
    .on("change", function(){
        d3.event.preventDefault();
        const selectedCity = d3.select("#citySelector").node().value;
        const shapeOptions = tableData.filter(sightingData=>sightingData.city === selectedCity);
        const selectedShapes = d3.select("#shapeSelector").selectAll("option").data(d3.map(shapeOptions, function(d){
            return d.shape;}).keys());

        selectedShapes.exit().remove();

        selectedShapes.enter()
            .append("option")
            .merge(selectedShapes)
            .attr("value",function(d){ return d;})
            .text(function(d){ return d;});
        const addSelect = selectedShapes.data(["--Select--"]);
        addSelect.enter()
            .append("option")
            .merge(addSelect)
            .attr("value",function(d){ return d;})
            .text(function(d){ 
                return d;})
    });

const submit = d3.select("#filter-btn");

// populate filtered data into the table based on selected input fields.
submit.on("click", function(){
    d3.event.preventDefault();
    tbody.selectAll('tr').remove()
    const inputDate = d3.select("#datetime").property("value");
    const inputCountry = d3.select("#countrySelector").property("value");
    const inputState = d3.select("#stateSelector").property("value");
    const inputCity = d3.select("#citySelector").property("value");
    const inputShape = d3.select("#shapeSelector").property("value");

    var filteredData = tableData;
    const listId = document.getElementsByClassName("form-control");
    // iterate through all the input fields
    for (var i = 0; i < listId.length; i++) {
        var idName = listId[i].id;
        const field = d3.select("#" + idName).property("value");
        // don't consider "select" and empty space into filtering data.
        if (field.trim() !== "--Select--" && field.trim() !== "") {
            if (idName !== "datetime"){
                // remove word "selector" from all input field ids except "datetime". so it can be used to fetch data and treated as column name.
                idName = idName.substring(0,idName.length-8);
            };
            filteredData = filteredData.filter(sightingData =>
                // match as case insensitive
                sightingData[idName].toUpperCase().trim() ===
                field.toUpperCase().trim());
        };
    };
    poplulateTable(filteredData);
})


