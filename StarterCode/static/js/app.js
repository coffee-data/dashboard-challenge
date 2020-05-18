// Read in json data using async
(async function(){
    var data = await d3.json("./data/samples.json").catch(function(error) {
      console.log(error);
    });
    console.log(data);
  
    // log a list of names
    var names = data.map(function(x) {
        return x.name;
    });
    console.log("names", names);
  
    // Cast each hours value in tvData as a number using the unary + operator
    tvData.forEach(function(d) {
      d.hours = +d.hours;
      console.log("Name:", d.name);
      console.log("Hours:", d.hours);
    });
  })()