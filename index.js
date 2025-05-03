const url = "http://localhost:3000";

// define mode for create or edit
let mode = "create"; // default of

// store the id for edit user
let selectId = "";

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (id) {
        mode = "edit";
        selectId = id;

        try {
            const res = await axios.get(`${url}/users/${selectId}`);

            // put value of user to html
            let userData = res.data;
            let firstNameInput = document.getElementById("firstname");
            let lastNameInput = document.getElementById("lastname");
            let ageInput = document.getElementById("age");
            let genderInput = document.querySelectorAll("input[name=gender]");
            let interestsInput = document.querySelectorAll("input[name=interest]");
            let descriptionInput = document.getElementById("description");

            firstNameInput.value = userData.firstname;
            lastNameInput.value = userData.lastname;
            ageInput.value = userData.age;

            // use === bc userData.gender has a only one value
            for (let i = 0; i < genderInput.length; i++) {
                if (genderInput[i].value === userData.gender) {
                    genderInput[i].checked = true;
                }
            }

            // use includes bc userData.interests has multiple value
            for (let i = 0; i < interestsInput.length; i++) {
                if (userData.interests.includes(interestsInput[i].value)) {
                    interestsInput[i].checked = true;
                }
            }

            descriptionInput.value = userData.description;

            console.log(userData);
        } catch (error) {
            console.log("error", error);
        }
    }
};

const submitForm = async () => {
    let firstNameInput = document.getElementById("firstname");
    let lastNameInput = document.getElementById("lastname");
    let ageInput = document.getElementById("age");
    let genderInput = document.querySelector("input[name=gender]:checked") || {};
    let interestsInput = document.querySelectorAll("input[name=interest]:checked");
    let descriptionInput = document.getElementById("description");

    let msg = document.getElementById("msg");

    // convert nodeList to array but it still nodeList (like a [input#game, input#movie])
    const interests = Array.from(interestsInput)
        // take a value each element in array
        .map((el) => el.value)
        // then join it
        .join(", ");

    // this is json
    let userData = {
        firstname: firstNameInput.value,
        lastname: lastNameInput.value,
        age: ageInput.value,
        gender: genderInput.value,
        interests: interests,
        description: descriptionInput.value,
    };

    console.log(userData);

    try {
        if (mode == "create") {
            // use axios to send data
            // use await bc axios return promise
            // "url" is endpoint will send it to server.js
            const res = await axios.post(`${url}/users`, userData);

            msg.innerText = "The Data has been Inserted";
            msg.className = "msg success";
        } else {
            await axios.put(`${url}/users/${selectId}`, userData);

            msg.innerText = "The Data has been Updated. Redirecting...";
            msg.className = "msg success";

            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        }
    } catch (error) {
        // .response bc axios send it from back-end through response
        if (error.response) {
            console.error(error.response);

            // put error in this to receive from back-end
            error.msg = error.response.data.msg;
            error.errors = error.response.data.error;
        }

        console.log("errors msg:", error.msg);
        console.log("error:", error.errors);

        msg.innerHTML = "Incomplete Information";

        // create <ul>
        const ulElement = document.createElement("ul");

        // create each <li> to <ul>
        error.errors.forEach((err) => {
            const liElement = document.createElement("li");
            liElement.textContent = err; // add <li> text
            ulElement.appendChild(liElement); // add <li> to <ul>
        });

        // add <ul> to msg container
        msg.appendChild(ulElement);

        msg.className = "msg danger";
    }
};
