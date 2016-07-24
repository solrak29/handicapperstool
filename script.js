$('.no-js').hide();
d3.text("data.csv", function(data) {
    var parsedCSV = d3.csv.parseRows(data);
    //reading in the headings into columns var
    console.log(parsedCSV);
    var filterByProp=function (types,accepted) {
        var result = [];
        for (var type in types)
            if (accepted.indexOf(type) > -1) 
                result.push(types[type]);
        return result;
    };
    var columns = parsedCSV[0].filter(function(val) {
        return (val === 'Horse' || val === 'Jockey' || val === 'PostPosition');
    });
    var filterArr = [];
    parsedCSV.slice(1).forEach(function(arr) {
        var subArr=filterByProp(arr,['5','28','30']);
        filterArr.push(subArr);
    });
    console.log(filterArr);
    //appending table to tableDiv using d3
    //adding data to table from the parsedCSV
    var table = d3.select("#tableDiv")
        .append("table")
        .attr('class', 'bordered highlight  black  green-text ');
    table
        .append('thead')
        .append('tr')
        .selectAll('th')
        .data(columns).enter()
        .append('th')
        .text(function(d) {
            return d;
        });
    table
        .append('tbody')
        .selectAll('tr')
        .data(filterArr).enter()
        .append("tr")
        .selectAll("td")
        .data(function(d) {
            return d;
        }).enter()
        .append("td")
        .text(function(d) {
            return d;
        });
});