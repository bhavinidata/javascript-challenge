// from data.js
var tableData = data;

let tbody = d3.select("tbody")

// Populate the data into the table
function poplulateTable(data){
    // d3.event.preventDefault();
    data.forEach(sightingData=>{
        const trow = tbody.append("tr");
        columns= ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"];
        columns.forEach(key=>{
            trow.append("td").text(sightingData[key]);
        })
    })
}

// Populate whole dataset into the table while loading the page
poplulateTable(tableData);

const submit = d3.select("#filter-btn");

// select date and filter data
submit.on("click", function(){
    d3.event.preventDefault();
    tbody.selectAll('tr').remove()
    const inputDate = d3.select("#datetime").property("value");
    console.log(inputDate);
    const filteredData = tableData.filter(sightingData=>sightingData.datetime === inputDate);
    // Populate filtered data based on date into the table
    poplulateTable(filteredData);
})


