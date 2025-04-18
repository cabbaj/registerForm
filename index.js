function submitForm() {
  let firstNameInput = document.getElementById("firstname");
  let lastNameInput = document.getElementById("lastname");
  let ageInput = document.getElementById("age");
  let genderInput = document.querySelector("input[name=gender]:checked");
  let interestsInput = document.querySelectorAll("input[name=interest]:checked");
  let descriptionInput = document.getElementById("description");

  // genders.forEach(function (g) {
  //   if (g.checked) console.log(g.value);
  // });

  // loop every input in nodeList
  // interests.forEach(function (i) {
  //   if (i.checked) console.log(i.value);
  // });

  let interests = "";

  interestsInput.forEach((interest, idx, array) => {
    interests += `${interest.value}, `;
    // console.log(`length= ${array.length}`);
    // console.log(`index= ${idx}`);
    // interests is string now ("a, b, c")
    if (idx === array.length - 1) {
      // -2 is mean remove the last 2 characters -> ", "
      interests = interests.slice(0, -2);
    }
  });

  // this is json
  let userData = {
    firstname: firstNameInput.value,
    lastname: lastNameInput.value,
    age: ageInput.value,
    genders: genderInput.value,
    interests: interests,
    description: descriptionInput.value,
  };

  console.log(userData);
}
