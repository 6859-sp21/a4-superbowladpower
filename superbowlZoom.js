const file = 'https://raw.githubusercontent.com/6859-sp21/a4-superbowladpower/main/data/superbowl-ad-youtube.csv'
var colors = {
    'Toyota'    : "#E27D60",
    'Hynudai'   : "#85DCBA",
    'Coca-Cola' : '#E8A87C', 
    'Bud Light' : '#C38D9E',
    'Kia'       : "#41B3A3",
    'Budweiser' : "#242582",
    'NFL' : '#553D67',
    'Pepsi' : "#F64C72",
    'Doritos' : "#659DBD",
    'E-Trade' : "#e8a7e5"
}

var logos = {
    'Toyota'    : "https://raw.githubusercontent.com/6859-sp21/a4-superbowladpower/main/data/toyota-logo.png",
    'Hynudai'   : "https://raw.githubusercontent.com/6859-sp21/a4-superbowladpower/main/data/hyundai-logo.jpg",
    'Coca-Cola' : 'https://raw.githubusercontent.com/6859-sp21/a4-superbowladpower/main/data/cocacola-logo.jpg', 
    'Bud Light' : 'https://raw.githubusercontent.com/6859-sp21/a4-superbowladpower/main/data/budLight-logo.jpg',
    'Kia'       : "https://raw.githubusercontent.com/6859-sp21/a4-superbowladpower/main/data/kia-logo2.png",
    'Budweiser' : "https://raw.githubusercontent.com/6859-sp21/a4-superbowladpower/main/data/budweiser-logo.png",
    'NFL' : 'https://raw.githubusercontent.com/6859-sp21/a4-superbowladpower/main/data/nfl-logo.png',
    'Pepsi' : "https://raw.githubusercontent.com/6859-sp21/a4-superbowladpower/main/data/pepsi-logo.jpg",
    'Doritos' : "https://raw.githubusercontent.com/6859-sp21/a4-superbowladpower/main/data/doritos-logo.png",
    'E-Trade' : "https://raw.githubusercontent.com/6859-sp21/a4-superbowladpower/main/data/etrade-logo.jpg"
}


const width = window.innerWidth;
const height = window.innerHeight;
const viewboxHeight = height * 0.8;
const viewboxWidth = width * 1;

const brand_names = ['Toyota', 'Hynudai', 'Coca-Cola', 'Bud Light', 
                     'Kia', 'Budweiser', 'NFL', 'Pepsi', 'Doritos',
                     'E-Trade']

var slider = document.getElementById("yearRange");

var output = document.getElementById("yearValue");
output.innerHTML = slider.value;
var newYear = 2020;
                     

let featureButtons = d3.select('#button-features');

let sex = d3.select('#sex');
let sexClicked = false;

let funny = d3.select('#funny');
let funnyClicked = false;

let showProducts = d3.select('#show-product-quickly');
let showProductsClicked = false; 

let patriotic = d3.select('#patriotic');
let patrioticClicked  = false;

let celebrity = d3.select('#celebrity');
let celebrityClicked = false;

let danger = d3.select('#danger');
let dangerClicked = false;

let animals = d3.select('#animals');
let animalsClicked = false;

let allYears = d3.select('#allYears');
let allYearsClicked = false;

sex.on('click', () => {
    sexClicked =  sexClicked ? false : true
    if (sexClicked) {
        sex.style('background-color', '#343a40')
    }
    else {
        sex.style('background-color', '#6c757d')
    }
})

funny.on('click', () => {
    funnyClicked =  funnyClicked ? false : true
    if (funnyClicked) {
        funny.style('background-color', '#343a40')
    }
    else {
        funny.style('background-color', '#6c757d')
    }
})

showProducts.on('click', () => {
    showProductsClicked =  showProductsClicked ? false : true
    if (showProductsClicked) {
        showProducts.style('background-color', '#343a40')
    }
    else {
        showProducts.style('background-color', '#6c757d')
    }
})

patriotic.on('click', () => {
    patrioticClicked =  patrioticClicked ? false : true
    if (patrioticClicked) {
        patriotic.style('background-color', '#343a40')
    }
    else {
        patriotic.style('background-color', '#6c757d')
    }
})

celebrity.on('click', () => {
    celebrityClicked =  celebrityClicked ? false : true
    if (celebrityClicked) {
        celebrity.style('background-color', '#343a40')
    }
    else {
        celebrity.style('background-color', '#6c757d')
    }
}) 

danger.on('click', () => {
    dangerClicked =  dangerClicked ? false : true
    if (dangerClicked) {
        danger.style('background-color', '#343a40')
    }
    else {
        danger.style('background-color', '#6c757d')
    }
})


animals.on('click', () => {
    animalsClicked =  animalsClicked ? false : true
    if (animalsClicked) {
        animals.style('background-color', '#343a40')
    }
    else {
        animals.style('background-color', '#6c757d')
    }
})


var featureDetails = {
    year: 2020, 
    sex: 'FALSE', 
    funny: 'FALSE', 
    showProducts: 'FALSE', 
    patriotic: 'FALSE', 
    celebrity: 'FALSE', 
    danger: 'FALSE', 
    animals: 'FALSE'
}


const generateChart = data => {

    let superbowl_data = []
    for (let name of brand_names) {
        // Avoid empty branch
        if (data.filter(d => d.brand == name).length != 0) {
            let val = { 'children' : data.filter(d => d.brand == name), 
                    'name': name
                  }
            superbowl_data.push(val)
        }
    }

    const bubble = data => d3.pack()
        .size([viewboxWidth, viewboxHeight])
        .padding(20)(d3.hierarchy({ children: data }).sum(d => Math.log(d.like_count)));
    
    
    const root = bubble(superbowl_data);
    let focus = root;
    let view;

    const tooltip = d3.select('.tooltip'); 

    console.log(root)

    const svg = d3.select('#bubble-chart')
        // .attr("viewBox", `0 0 ${width} ${viewboxheight}`)
        .attr("viewBox", `-${viewboxWidth / 2} -${viewboxHeight / 2} ${viewboxWidth} ${viewboxHeight}`)
        .style("display", "block")
        .style("margin-top", "15px")
        .style("margin-bottom", "15px")
        // Color the background to see the viewbox area. Can delete background color in final
        .style("background", "#343a40")
        .style("cursor", "pointer")
        .on("click", (event) => zoom(event, root));
    
    const node = svg.append("g")
    .selectAll("circle")
    .data(root.descendants().slice(1))
    .join("circle")
        .attr("fill", d => d.children ? colors[d.data.name] : "white")
        .on('mouseover', function (e, d) {
            // Tooltips for individual video (white circles)
            if (!d.children) {
                tooltip.select('img').attr('src', function(){
                    if(d.data.thumbnail != "NA"){
                        return d.data.thumbnail;
                    }
                    // Show image not available if so
                    else{
                        return "https://raw.githubusercontent.com/6859-sp21/a4-superbowladpower/main/ImageNA.png";
                    }
                })
                // tooltip.select('a').attr('href', d.data.superbowl_ads_dot_com_url);
                tooltip.select('.card-title').text(`${d.data.brand} ${d.data.year}: ${d.data.like_count} likes`);
                tooltip.select('.card-subtitle').text(d.data.title);
                tooltip.select('.card-text').text(`Youtube views 👀: ${d.data.view_count} | likes 👍: ${d.data.like_count} | comments 💬: ${d.data.comment_count} | dislikes 👎: ${d.data.dislike_count} | `);
                tooltip.select('.card-text').style('display', 'inline')
                tooltip.style('background-color', colors[d.data.brand])
            }
            // Tooltips for brand (corlored circles)
            else{
                tooltip.select('img').attr('src', logos[d.data.name])
                tooltip.select('.card-title').text(`Brand: ${d.data.name}`);
                tooltip.select('.card-subtitle').text(`Number of ads: ${d.children.length}`);
                tooltip.select('.card-text').style('display', 'none')
                tooltip.style('background-color', colors[d.data.name])
            }
            // Show tooltips
            tooltip.style('visibility', 'visible');
            d3.select(this).style('stroke', '#222');
        })
        .on('mousemove', e => tooltip.style('top', `${e.pageY}px`)
                                    .style('left', `${e.pageX + 10}px`))
        .on('mouseout', function () {
            d3.select(this).style('stroke', 'none');
            return tooltip.style('visibility', 'hidden');
        })
        .on("click", (event, d) => {
            // Zoom if click on colored circles with children
            if (d.children) {
            focus !== d && (zoom(event, d), event.stopPropagation())
            }
            // Open video link if click on white circles
            else{
                window.open(d.data.superbowl_ads_dot_com_url)
            }
        })
            
    
    const label = svg.append("g")
        .attr("text-anchor", "middle")
    .selectAll("text")
    .data(root.descendants())
    .join("text")
        // Font size will be no more than one fourth of the radius, cap at 14
        .style("font-size", d => Math.min(d.r * 1.2, 14))
        // .style("font-size", "20px") 
        .style("opacity", 1)  
        .style("fill-opacity", d => d.parent === root ? 1 : 0)
        .style("display", d => d.parent === root ? "inline" : "none")
        .text(d => {
            if (d.children) {
                return d.data.name;
            }
            else{
                return "👍" + d.data.like_count;
            }
        });

    // Add logos
    // const images = svg.append("g")
    //     .selectAll("image")
    // .data(root.descendants().slice(1))
    // .join("svg:image")
    //     .style('opacity', 0.5)
    //     .attr('width', d => d.r/2)
    //     .attr("xlink:href", d => d.children ? logos[d.data.name] : "");
    
    zoomTo([root.x, root.y, root.r * 2]);
    console.log(root.x, root.y, root.r);
    console.log(viewboxWidth, viewboxHeight);
    
    function zoomTo(v) {
        const k = viewboxHeight / v[2];

        view = v;

        label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        // images.attr("transform", d => `translate(${(d.x - d.r/4 - v[0]) * k},${(d.y + 2 - v[1]) * k})`);
        node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        node.attr("r", d => d.r * k);
    }

    function zoom(event, d) {
        const focus0 = focus;

        focus = d;

        const transition = svg.transition()
            .duration(event.altKey ? 7500 : 750)
            .tween("zoom", d => {
            const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
            return t => zoomTo(i(t));
            });

        label
        .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
        .transition(transition)
            .style("fill-opacity", d => d.parent === focus ? 1 : 0)
            .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
            .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
    }


    // --------------------------------------------------------------------
    // Bubble size legend - Work in progress
    // Todo: dynamically update size legend. Place next to main bubble chart.
    // --------------------------------------------------------------------
    var legendHeight = 460
    var legendWidth = 460
    var sizeLegend = d3.select("#size-legend")
    .append("svg")
        .attr("width", legendWidth)
        .attr("height", legendHeight)
      
    // The scale you use for bubble size
    var size = d3.scaleSqrt()
    .domain([1, 100])  // What's in the data, let's say it is percentage
    .range([1, 100])  // Size in pixel
    
    // Add legend: circles
    var valuesToShow = [10, 50, 100]
    var xCircle = 230
    var xLabel = 380
    var yCircle = 330
    
    sizeLegend
    .selectAll("legend")
    .data(valuesToShow)
    .enter()
    .append("circle")
        .attr("cx", xCircle)
        .attr("cy", function(d){ return yCircle - size(d) } )
        .attr("r", function(d){ return size(d) })
        .style("fill", "none")
        .attr("stroke", "black")
    
    // Add legend: segments
    sizeLegend
    .selectAll("legend")
    .data(valuesToShow)
    .enter()
    .append("line")
        .attr('x1', function(d){ return xCircle + size(d) } )
        .attr('x2', xLabel)
        .attr('y1', function(d){ return yCircle - size(d) } )
        .attr('y2', function(d){ return yCircle - size(d) } )
        .attr('stroke', 'black')
        .style('stroke-dasharray', ('2,2'))
    
    // Add legend: labels
    sizeLegend
    .selectAll("legend")
    .data(valuesToShow)
    .enter()
    .append("text")
        .attr('x', xLabel)
        .attr('y', function(d){ return yCircle - size(d) } )
        .text( function(d){ return d } )
        .style("font-size", 10)
        .style('opacity', 1)
        .attr('alignment-baseline', 'middle')

}


(async () => {
    data = await d3.csv(file).then(data => data)

    update();

    featureButtons.on( 'click', update)

    function update() {

        selectedData = [...data]

        if (sexClicked) {
            selectedData = selectedData.filter(d => d.use_sex == 'TRUE')
        }
        if ( funnyClicked) {
            selectedData = selectedData.filter(d => d.funny == 'TRUE')
        }
        if ( showProductsClicked) {
            selectedData = selectedData.filter(d => d.show_product_quickly == 'TRUE')
        }
        if ( patrioticClicked) {
            selectedData = selectedData.filter(d => d.patriotic == 'TRUE')
        }
        if ( celebrityClicked) {
            selectedData = selectedData.filter( d => d.celebrity == 'TRUE')
        }
        if (dangerClicked) {
            selectedData = selectedData.filter( d => d.danger == 'TRUE')
        }
        if (animalsClicked) {
            selectedData = selectedData.filter( d => d.animals == 'TRUE')
        }
        if (!allYearsClicked){
            selectedData = selectedData.filter(d => d.year == newYear)
        }

        //  WHAT TO DO IF THERE IS NO DATA? 
        console.log(selectedData)
        d3.selectAll("g > *").remove();	
        if (selectedData.length > 0) {
            document.querySelector("#bubble-chart").style.display = 'inline';
            document.querySelector("#noMatch").style.display = 'none';
            document.querySelector("#count").style.display = 'block';
            document.querySelector("#count").innerHTML = 'Count: ' + selectedData.length;
            generateChart(selectedData);
        }
        else {
            // need to do something here: show no matching record warning
            document.querySelector("#noMatch").style.display = 'block';
            document.querySelector("#bubble-chart").style.display = 'none';
            document.querySelector("#count").style.display = 'none';
        }
    }

    allYears.on('click', () => {
        allYearsClicked =  allYearsClicked ? false : true
        if (allYearsClicked) {
            allYears.style('background-color', '#007bff');
            allYears.text("Browse by year");
            slider.disabled = true;
        }
        else {
            allYears.style('background-color', '#6c757d')
            allYears.text("All years");
            slider.disabled = false;
        }
        update();
    })

    const yearSlider = d3.select('.year-slider').node()

    yearSlider.oninput =  function() {
        newYear = this.value
        output.innerHTML = newYear
        update()
    }

})();
