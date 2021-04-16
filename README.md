# A4 - Superbowl Ad Power
Team member: Zhixin Lin, Christabel Sitienei, Yen-ting Wang

Live here: [https://6859-sp21.github.io/a4-superbowladpower/superbowlZoom]

## Data Source

Our primary source is the [Superbowl ads data compiled by FiveThirtyEight](https://github.com/fivethirtyeight/superbowl-ads). It contains a list of ads from the 10 brands that had the most advertisements in Super Bowls from 2000 to 2020. Each video is evaluated with 7 defining characteristics, including funny, patriotic, involving danger, using sex, showing animals, featuring celebrities, showing products quickly. 

Our goal is to help the audience understand the characteristics of popular ads and their patterns among top brands. There is no apparent ranking of popularity among ads in the original dataset and we have to think about a way to define popularity. Fortunately, we found an open database that scraps [Youtube data](https://github.com/rfordatascience/tidytuesday/tree/master/data/2021/2021-03-02) corresponding to each video in the FiveThirtyEight dataset. We chose the like counts as the primary popularity metric. For ads that are missing Youtube links, we use average like counts.

## Design Decisions

We decided to use a nested bubble chart as the primary visual mark to represent the ad entries. Since there might be multiple videos from the same brand, we used the large colored bubbles to represent brands and the containing white circles to represent individual videos. The nested bubble chart helps people easily distinguish brands and find how many videos are from a specific advertiser. The size of small white bubbles represents popularity, which is Youtube video view count. We have applied log transformation to the view count to avoid barely visible small bubbles. A simple legend on the bottom left corner indicates the relationship between bubble size and Youtube like count. We did not make it dynamic because it does not work well when bubbles are zoomed in. The absolute scale legend does not matter so much because area will be hard to compare. Users can see the exact like count information either through zooming in or tooltips. 

To find out more information, users can hover over the bubbles to see more information. When hovered over large colored bubbles, tooltips will show brand information and the number of videos under that brand. When hovered over white bubbles, tooltips will show detailed information about the ads including screenshots, titles, year, number of views, likes, dislikes, and comments. A grey stroke will show up to indicate the circle being hovered. Users can further click individual circles to watch the original ad in a new window.

To see the yearly change dynamically, we implemented a slider bar. The audience can slide from 2000 to 2020 to see the shifting brands. Alternatively, there is an “All year” toggle, which will show all the ads data of the top 10 brands from the past 20 years.

Besides the year slider,  we included 7 characteristic filters for the audience to check out related videos easily. With specific traits filter buttons being selected, Superbowl ads that fit in these traits can be filtered out quickly and clearly. Multiple filters can be applied at the same time. The matching ads will be updated in the bubble chart and the total video count will be shown as well.

We also add a zooming function for users to see more video details in each brand bubble. If the user clicks at a colored circle area, it will zoom in to show what ads are in this colored brand bubble. If the user clicks at any black space, it will zoom out to the original overview. The zooming in and out function allows users to interact with this dataset and explore videos or brands of interest.

## Development Process

For the development process, Zhixin and Christabel have prior web development experience and contributed to coding and debugging. Yen-Ting helps with sketching the concept design, researching and adapting resources of functional templates, and editing the write-up. It took us approximately 20 people-hours to get to the MVP, and an additional 24 hours to finish the final. The most time-consuming work is about merging different functional codes, especially for generating the nested bubble chart and the zooming function.

