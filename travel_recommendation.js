searchBtn = document.getElementById("searchBtn");

console.log("Start JS script.");

function getTravelRecommendation(event) {
    event. preventDefault();

    const apiUrl = "./travel_recommendation_api.json";

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