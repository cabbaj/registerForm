function submitForm() {
  let firstNameInput = document.getElementById("firstname");
  let lastNameInput = document.getElementById("lastname");
  let ageInput = document.getElementById("age");
  let genderInput = document.querySelector("input[name=gender]:checked");
  let interestsInput = document.querySelectorAll("input[name=interest]:checked");
  let descriptionInput = document.getElementById("description");

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
}
