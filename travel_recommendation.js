searchBtn = document.getElementById("searchBtn");

console.log("Start JS script.");

function getTravelRecommendation(event) {
    event.preventDefault();

    const apiUrl = "./travel_recommendation_api.json";
    const keyword = document.getElementById("searchInput").value.toLowerCase();

    const searchResults = document.getElementById("searchResults");

    console.log("Keyword = " + keyword);

    let destinationType = " ";

    if (keyword === "beach" || keyword === "beaches") {
        destinationType = "beaches";
    }

    if (keyword === "temple" || keyword === "temples") {
        destinationType = "temples";
    }

    if (keyword === "country" || keyword === "countries") {
        destinationType = "countries";
    }

    if (keyword && destinationType === " ") {
        destinationType = "unknown"
    }

    console.log("Destination Type = " + destinationType);

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            let recommendations;

            if (destinationType === "countries") {
                recommendations = [];
                for (const country of data.countries) {
                    for (const city of country.cities) {
                        recommendations.push(city);
                    }
                }
            } else {
                recommendations = data[destinationType];
            }


            const searchResultsHTML = document.getElementById("searchResults");
            // const recommendation = {
            //     imageUrl: "/travel_recommendation/images/sydney.jpg",
            //     name: "Sydney, Australia",
            //     description: "A vibrant city known for its iconic landmarks like the Sydney Opera House and Sydney Harbour Bridge."
            // };

            const recommendationsHTML = recommendations.map((recommendation) => generateRecommendation(recommendation)).join();

            searchResultsHTML.innerHTML = recommendationsHTML;
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });


}





function generateRecommendation(recommendation) {

    //console.log(recommendation);

    const htmlString = `<div class="recommendation">
    <img class="destinationImage" src="${recommendation.imageUrl}"/>
    <div class="destinationDescription">
        <h3 class="destinationHeader">${recommendation.name}</h3>
        <p class="destinationText">${recommendation.description}</p>
        <button class ="visitBtn">Visit</button>
    </div>
</div>`

    return htmlString;
}

// console.log(generateRecommendation(recommendation));



searchBtn.addEventListener("click", getTravelRecommendation);