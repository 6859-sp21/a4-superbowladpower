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
    'E-Trade' : "FBEEC1"
}


// console.log(colors)

const width = window.innerWidth;
const height = window.innerHeight * 0.8;

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

    // console.log(data)

    // console.log(data.filter(d => d.brand == 'Toyota'))

    let superbowl_data = []
    for (let name of brand_names) {
        let val = { 'children' : data.filter(d => d.brand == name), 
                    'name': name
                  }
        superbowl_data.push(
            val
        )
    }

    // console.log(superbowl_data)

    const bubble = data => d3.pack()
        .size([width, height])
        .padding(20)(d3.hierarchy({ children: data }).sum(d => Math.log(d.like_count)));
    
    
    const root = bubble(superbowl_data);

    console.log(root)

    const svg = d3.select('#bubble-chart')
        .style('width', width)
        .style('height', height);

    const tooltip = d3.select('.tooltip'); 

    const node = svg.selectAll()
        .data(root.descendants().slice(1))
        .enter().append('g')
        .attr('transform', d => `translate(${d.x}, ${d.y})`);


    const circle = node.append('circle')
                        .attr('r', d => d.r)
                        .style('fill', d => d.children ? colors[d.data.name] : "white")
                        .on('mouseover', function (e, d) {
                            // circle.style('visibility', 'hidden')
                            if (!d.children) {
                                tooltip.select('img').attr('src', function(){
                                    if(d.data.thumbnail != "NA"){
                                        return d.data.thumbnail;
                                    }
                                    // Show image not available if so
                                    else{
                                        return "https://raw.githubusercontent.com/6859-sp21/a4-superbowladpower/main/ImageNA.png";
                                    }
                                } )
                                // tooltip.select('a').attr('href', d.data.superbowl_ads_dot_com_url);
                                tooltip.select('.card-title').text(`${d.data.brand} ${d.data.year}: ${d.data.like_count} likes`);
                                tooltip.select('.card-text').text(d.data.title);
                                tooltip.select('#like').text(`likes: ${d.data.like_count}`);
                                tooltip.select('#view').text(`views: ${d.data.view_count}`);
                                tooltip.select('#comment').text(`comments: ${d.data.comment_count}`);
                                tooltip.select('#dislike').text(`dislikes: ${d.data.dislike_count}`);
                                tooltip.style('visibility', 'visible');
                                tooltip.style('background-color', colors[d.data.brand])
                                d3.select(this).style('stroke', '#222');
                            }

                            
                        })
                        .on('mousemove', e => tooltip.style('top', `${e.pageY}px`)
                                                    .style('left', `${e.pageX + 10}px`))
                        .on('mouseout', function () {
                            d3.select(this).style('stroke', 'none');
                            return tooltip.style('visibility', 'hidden');
                        })
                        .on('click', (e, d) => {
                            if (!d.children) {
                                window.open(d.data.superbowl_ads_dot_com_url)
                            }
                        });
    
    // Add title label to bubble
    const label = node.append('text')
                      .attr('dy', 2)
                    //   .text(d => d.data.brand);
                          
    // Add animation transition effects
    node.transition()
        .ease(d3.easeExpInOut)
        .duration(10000)
        .attr('transform', d => `translate(${d.x}, ${d.y})`);
    
    circle.transition()
        .ease(d3.easeExpInOut)
        .duration(1000)
        .attr('r', d => d.r);
    
    label.transition()
        .delay(700)
        .ease(d3.easeExpInOut)
        .duration(1000)
        .style('opacity', 1) 

    // console.log(root)
                            

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
            // need to do something here
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
