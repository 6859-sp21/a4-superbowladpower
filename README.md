# a4-superbowladpower
Developed by: Zhixin Lin, Christabel Sitienei, Yen-ting Wang

Data Source

Our primary source is the superbowl ads data compiled by FiveThirtyEight. It contains a list of ads from the 10 brands that had the most advertisements in Super Bowls from 2000 to 2020. Each video is evaluated with 7 defining characteristics, including funny, patriotic, involving danger, using sex, showing animals, featuring celebrity, showing products quickly. 

Our goal is to help the audience understand the characteristics of popular ads and its patterns among top brands. There is no apparent ranking of popularity among ads in the original dataset and we have to think about a way to define popularity. Fortunately, we found an open database that scraps Youtube data corresponding to each video in the FiveThirtyEight dataset. We chose the like counts as the primary popularity metric. For ads that are missing Youtube links, we use average like counts.

Design Decisions

We decided to use a nested bubble chart as the primary visual mark to represent the ad entries. Since there might be multiple videos from the same brand, we used the large colored bubbles to represent brands and the containing white circles to represent individual videos. The nested bubble chart helps people easily distinguish brands and find how many videos are from a specific advertiser. The size of small white bubbles represent popularity, which is Youtube video view count as discussed above. We have applied log transformation to the view count to avoid barely visible small bubbles. To find out more information, users can hover over the bubbles, which will show either brand information for large colored bubbles or detailed information about the ad including year, number of views / likes / dislikes / comments for small white bubbles. Users can further click individual circles to watch the original ad in a new window.

For interaction, to see the change dynamically, we implemented a year slider bar. The audience can slide from 2000 to 2020 to see the shifting brands. Alternatively, there is an “All Year” toggle, which will show all the ads data of the top 10 brands from the past 20 years.

Besides the year slider,  we included 7 characteristic filters for the audience to check out related videos easily. With specific traits filter buttons being selected, superbowl ads that fit in these traits can be filtered out quickly and clearly. Multiple filters can be applied at the same time. The matching ads will be updated in the bubble chart and the total video count will be shown as well.

We also add a zooming function for users to see more video details in each brand bubble. If the user clicks at a colored circle area, it will zoom in to show what ads are in this colored brand bubble. If the user clicks at any black space, it will zoom out to the original overview. The zooming in and out function allows users to interact with this dataset and explore videos or brands of interests.

Development Process

For the development process, Zhixin and Christabel have prior web development experience and contributed to coding and debugging. Yen-Ting helps with sketching the concept design, researching and adapting resources of functional templates, and editing the write-up. The most time-consuming work is about merging different functional codes, especially for generating the nested bubble chart and the zooming function.
