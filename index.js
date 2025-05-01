const submitForm = async () => {
    try {
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

        // use axios to send data
        // use await bc axios return promise
        // "url" is endpoint will send it to server.js
        const res = await axios.post("http://localhost:3000/users", userData);

        // check res if it has been sent
        console.log(res.data);

        msg.innerText = "The Data has been Inserted";
        msg.className = "msg success";
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

        // console.log(error);

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
