const url = "http://localhost:3000";

window.onload = async () => {
    console.log("loaded");

    const res = await axios.get(`${url}/users`);
    let users = res.data;

    console.log(res.data);

    const userContainer = document.getElementById("user");

    let userList = "<div>";

    users.map((user) => {
        userList += `<div>
        ${user.id} ${user.firstname} ${user.lastname} 
        <button>Edit</button>
        <button>Delete</button>
        </div>`;
    });

    userList += "</div>";

    userContainer.innerHTML = userList;
};
