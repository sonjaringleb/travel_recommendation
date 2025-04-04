searchBtn = document.getElementById("searchBtn");

console.log("Start JS script.");

function getTravelRecommendation(event) {
     event.preventDefault();

    const apiUrl = "./travel_recommendation_api.json";
    const keyword = document.getElementById("searchInput").value.toLowerCase();
    
    console.log("Keyword = " + keyword);

    let destinationType = " ";

    if(keyword === "beach" || keyword === "beaches"){
        destinationType = "beach";
    }
    
    if (keyword === "temple" || keyword === "temples"){
        destinationType = "temple";
    }

    if (keyword === "country" || keyword === "countries"){
        destinationType = "country";
    }

    if (keyword && destinationType === " "){
        destinationType = "unknown"
    }

    console.log("Destination Type = " + destinationType);

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        
            
           

        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });

}

searchBtn.addEventListener("click", getTravelRecommendation);