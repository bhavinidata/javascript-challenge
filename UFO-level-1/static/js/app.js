// from data.js
var tableData = data;

// YOUR CODE HERE!
let tbody = d3.select("tbody")
tableData.forEach(sightingData=>{
    // console.log(sightingData);
    const trow = tbody.append("tr");
    columns= ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"];
    columns.forEach(key=>{
        // console.log(key, sightingData[key]);
        trow.append("td").text(sightingData[key]);
    })
})

const submit = d3.select("#filter-btn");

submit.on("click", function(){
    d3.event.preventDefault();
    tbody.selectAll('tr').remove()
    const inputDate = d3.select("#datetime").property("value");
    console.log(inputDate);
    const filteredData = tableData.filter(sightingData=>sightingData.datetime === inputDate);
    console.log(filteredData);
    filteredData.forEach(sightingData=>{
        // console.log(sightingData);
        const trow = tbody.append("tr");
        columns= ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"];
        columns.forEach(key=>{
            // console.log(key, sightingData[key]);
            trow.append("td").text(sightingData[key]);
        })
    })

})


