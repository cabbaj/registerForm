const url = "http://localhost:3000";

window.onload = async () => {
    await loadData();
};

const loadData = async () => {
    const res = await axios.get(`${url}/users`);
    let users = res.data;

    console.log(res.data);

    const userContainer = document.getElementById("user");

    // create list of user and button for edit, delete
    // data-id(data-* * is for store what data do u want to) is property for store value of user's id
    let userList = "<div>";
    users.map((user) => {
        userList += `<div>
        ${user.id} ${user.firstname} ${user.lastname} 
        <button>Edit</button>
        <button class="deleteBtn" data-id="${user.id}">Delete</button>
        </div>`;
    });
    userList += "</div>";

    userContainer.innerHTML = userList;

    const deleteBtn = document.getElementsByClassName("deleteBtn");

    // check clicked from button
    for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener("click", async (event) => {
            // target is select itself that have a click event
            const id = event.target.dataset.id;
            try {
                await axios.delete(`${url}/users/${id}`);

                // call it again for refresh web page
                loadData();
            } catch (error) {
                console.log("error:", error);
            }
        });
    }

}