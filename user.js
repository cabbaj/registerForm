const url = "http://localhost:3000";

window.onload = async () => {
    await refreshData();
    console.log("loaded");
};

const refreshData = async () => {
    const res = await axios.get(`${url}/users`);
    let users = res.data;

    // create user list and button
    const userContainer = document.getElementById("user");

    // create list of user and button for edit, delete
    // data-id(data-* * is for store what data do u want to) is property for store value of user's id
    let userList = "<div>";
    users.forEach((user) => {
        userList += `<div>
        ${user.id} ${user.firstname} ${user.lastname} 
        <a href="index.html?id=${user.id}"><button>Edit</button></a>
        <button class="deleteBtn" data-id="${user.id}">Delete</button>
        </div>`;
    });
    userList += "</div>";
    userContainer.innerHTML = userList;

    // add event listener to delete button
    const deleteBtn = document.getElementsByClassName("deleteBtn");

    for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener("click", async (event) => {
            const id = event.target.dataset.id;

            // prevent rapid click on button
            event.target.disabled = true;

            try {
                await axios.delete(`${url}/users/${id}`);

                // refresh page after delete
                await refreshData();

                console.log("delete success");
            } catch (error) {
                console.log("error:", error);
            }
        });
    }
};
