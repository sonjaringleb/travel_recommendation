searchBtn = document.getElementById("searchBtn");

console.log("Start JS script.");

showTimeDataNYC();

function showTimeDataCountries(timezone) {
    const options = { timeZone: timezone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const newResultTimeData = new Date().toLocaleTimeString('en-US', options);
    return newResultTimeData;
}

function getTravelRecommendation(event) {
    event.preventDefault();

    const apiUrl = "./travel_recommendation_api.json";
    const searchTerm = document.getElementById("searchInput").value.trim();
    const keyword = searchTerm.toLowerCase();

    console.log("Keyword = " + keyword);

    let destinationType = "";

    if (keyword === "beach" || keyword === "beaches") {
        destinationType = "beaches";
    } else if (keyword === "temple" || keyword === "temples") {
        destinationType = "temples";
    } else if (keyword === "country" || keyword === "countries") {
        destinationType = "countries";
    } else if (keyword === "city" || keyword === "cities") {
        destinationType = "cities";
    }

    // if (keyword !== "" && destinationType === "") {
    //     destinationType = keyword;
    // }

    // if (keyword && destinationType === "") {
    //     destinationType = "unknown";
    // }

    console.log("Destination Type = " + destinationType);

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            let recommendations;

            if (keyword !== "" && destinationType === "") {
                recommendations = [];
                for (const country of data.countries) {
                    for (const city of country.cities) {
                        if (city.name.toLowerCase().includes(keyword)) {
                            recommendations.push(city);
                        }
                    }
                }

                for (const temple of data.temples) {
                    if (temple.name.toLowerCase().includes(keyword)) {
                        recommendations.push(temple);
                    }
                }

                for (const beach of data.beaches) {
                    if (beach.name.toLowerCase().includes(keyword)) {
                        recommendations.push(beach);
                    }
                }

            } else if (destinationType === "countries" || destinationType === "cities") {
                recommendations = [];
                for (const country of data.countries) {
                    for (const city of country.cities) {
                        recommendations.push(city);
                    }
                }
            } else {
                recommendations = data[destinationType];
            }

            if (!recommendations) {
                alert("Enter a keyword into the text field, e.g., 'beach', and click the Search button.");
            } else if (recommendations.length === 0) {
                alert(`No results found for "${searchTerm}". Try searching for another destination, e.g., "Australia".`);
            }

            const searchResultsHTML = document.getElementById("searchResults");
            // const recommendation = {
            //     imageUrl: "/travel_recommendation/images/sydney.jpg",
            //     name: "Sydney, Australia",
            //     description: "A vibrant city known for its iconic landmarks like the Sydney Opera House and Sydney Harbour Bridge."
            // };

            const recommendationsHTML = recommendations.map((recommendation) => generateRecommendation(recommendation)).join('');

            searchResultsHTML.innerHTML = recommendationsHTML;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function generateRecommendation(recommendation) {

    //console.log(recommendation);

    let localTime = showTimeDataCountries(recommendation.timezone);

    const htmlString = `<div class="recommendation">
    <img class="destinationImage" src="${recommendation.imageUrl}"/>
    <div class="destinationDescription">
        <h3 class="destinationHeader">${recommendation.name}</h3>
        <p class="destinationText">${recommendation.description}</p>
        <p class="timeData">Timezone: ${recommendation.timezone} </br> Local Time: ${localTime}</p>
        <button class="visitBtn" onclick="showBookingConfirmation('${recommendation.name}')">Visit</button>
    </div>
</div>`

    return htmlString;
}

// console.log(generateRecommendation(recommendation));

function clearSearchResults() {
    document.getElementById("searchResults").innerHTML = "";
    // document.getElementById("searchInput").value = " ";
}

const searchForm = document.getElementById("search");
if (searchForm) {
    searchForm.addEventListener("submit", getTravelRecommendation);

    // searchBtn.addEventListener("click", getTravelRecommendation);
    clearBtn.addEventListener("click", clearSearchResults);
}

function showTimeDataNYC() {
    const options = { timeZone: 'America/New_York', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const newYorkTime = new Date().toLocaleTimeString('en-US', options);
    console.log("Current time in New York:", newYorkTime);
}

const messageSubmit = document.getElementById('messageSubmit');
const contactForm = document.getElementById('contactForm');
console.log(contactForm);

const test = document.getElementById('contactArea');
console.log(test);

function sendMessage(event) {

    event.preventDefault();

    const username = document.getElementById("name").value;
    const userEmail = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const messageSentInfo = document.getElementById("messageSentInfo");

    console.log("Message sent.");

    const messageSentAlert = `"Thank you ${username} for your message: ${message}. We will respond as soon as possible by sending an email to ${userEmail}."`;

    //   alert(messageSentAlert);
    alert("Message Sent!");

    messageSentInfo.innerHTML = `<p>Thank you ${username} for your message: ${message}.</p><p>We will respond as soon as possible by sending an email to ${userEmail}.</p>`;
}

if (contactForm) {
    contactForm.addEventListener("submit", sendMessage);

    console.log("Test");
}

const bookButton = document.getElementById("bookBtn");

function clickBookButton(event) {
    event.preventDefault();

    alert("For booking your vacation, search for a destination (e.g., by entering 'beach' into the search field). Then click the 'Visit' button of the destination you want to book.");
}

if (bookButton) {
    bookButton.addEventListener("click", clickBookButton);
}


function showBookingConfirmation(destinationName) {
    const bookingConfirmation = `Thank you for booking your vacation at the following destination: ${destinationName}!`;
    alert(bookingConfirmation);

    console.log(destinationName);
}

const teamInfoArea = document.getElementById("team");
if (teamInfoArea) {

}

function showTeamInfo(position,teamMemberName) {
    const jobDescription = document.getElementById(position);

    const firstName = teamMemberName.split(' ');
    const teamMemberFirstName = firstName[0];
    
    console.log(position, teamMemberName);
    
    

    switch(position){
        case "ceo": jobDescription.innerText = `${teamMemberFirstName} founded Travel Guide 10 years ago. He is responsible for the company, its strategy and finances.`;
            break;
        case "teamLead": jobDescription.innerText = `${teamMemberFirstName} is responsible for managing the team. This includes also various HR tasks.`; 
            break;
        case "marketing": jobDescription.innerText = `${teamMemberFirstName} is responsible for promoting travel destinations by developing and implementing content marketing and social media strategies.`;
            break;
    }
}