const url = new URL(location.href);
const movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");

const API_LINK = "http://localhost:8000/api/v1/reviews";

const main = document.getElementById("section");
const title = document.getElementById("title");
title.innerHTML = movieTitle;

returnReviews(API_LINK);

function returnReviews(url){
    const div_card = document.createElement("div");
    div_card.innerHTML = 
    `   <div class="row">
            <div class="column">
                <div class="card">
                    <p><strong>Review:</strong>
                        <input type="text" id="newReviewId" value=""/>
                    </p>
                    <p><strong>User:</strong>
                    <input type="text" id="newUserId" value=""/>
                    </p>
                    <p>
                        <a href="#" onclick="saveReview('newReviewId','newUserId')">💾</a>
                    </p>
                </div>
            </div>
        </div>                        
    `
    main.appendChild(div_card);
    fetch(`${url}/movie/${movieId}`).then(res => res.json())
              .then(function(data){
                data.forEach(e => {
                        const div_card = document.createElement("div");
                        div_card.innerHTML = 
                        `   <div class="row">
                                <div class="column">
                                    <div class="card" id="${e._id}">
                                        <p><strong>Review: </strong> ${e.review}</p>
                                        <p><strong>User: </strong> ${e.user}</p>
                                        <p>
                                            <a href="#" onclick="editReview('${e._id}','${e.review}','${e.user}')">✎</a>
                                            <a href="#" onclick="deleteReview('${e._id}')">🗑</a>
                                        </p>
                                    </div>
                                </div>
                            </div>                        
                        `
                        main.appendChild(div_card);
                });
            });          
}

function editReview(id, review, user){
    const element = document.getElementById(id);
    const reviewInputId = "review" + id;
    const userInputId = "user" + id;

    element.innerHTML = 
    `
        <p><strong>Review:</strong>
            <input type="text" id="${reviewInputId}" value="${review}"/>
        </p>
        <p><strong>User:</strong>
        <input type="text" id="${userInputId}" value="${user}"/>
        </p>
        <p>
            <a href="#" onclick="saveReview('${reviewInputId}','${userInputId}','${id}')">💾</a>
        </p>
    `;
}

function saveReview(reviewInputId, userInputId, id="") {
    const review = document.getElementById(reviewInputId).value;
    const user = document.getElementById(userInputId).value;

    if(id){
        fetch(`${API_LINK}/${id}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"user": user, "review": review})
        }).then(res => {
            res.json();
            main.innerHTML = '';
            returnReviews(API_LINK);
        });
    }
    else {
        fetch(`${API_LINK}/new`, {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"user": user, "review": review, "movieId": movieId})
        }).then(res => {
            res.json();
            main.innerHTML = '';
            returnReviews(API_LINK);
        });
    }
}

function deleteReview(id){
    fetch(`${API_LINK}/${id}`, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json, text/plain, */*'
        }
    }).then(res => {
        res.json();
        main.innerHTML = '';
        returnReviews(API_LINK);
    });
}