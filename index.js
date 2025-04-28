const validateData = (userData) => {
  const errors = [];

  if (!userData.firstname) {
    errors.push("put your First Name");
  }

  if (!userData.lastname) {
    errors.push("put your Last Name");
  }

  if (!userData.age) {
    errors.push("put your Age");
  }

  if (!userData.gender) {
    errors.push("put your Gender");
  }

  if (!userData.interests) {
    errors.push("put your Interests");
  }

  if (!userData.description) {
    errors.push("put your Description");
  }
  return errors;
};

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

    // validation data
    const errors = validateData(userData);

    if (errors.length > 0) {
      throw {
        msg: "Incomplete information",
        errors: errors,
      };
    }

    // use axios to send data
    // use await bc axios return promise
    // "url" is endpoint will send it to server.js
    const res = await axios.post("http://localhost:3000/users", userData);

    // check res if it has been sent
    console.log(res.data);

    msg.innerText = "The Data has been Inserted";
    msg.className = "msg success";
  } catch (error) {
    console.log(error.msg);
    console.log(error.errors);

    // use reponse bc res is not defined in catch
    // if (error.response) {
    //   console.error(error.response.data);
    // }

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
