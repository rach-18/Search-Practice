const usersDiv = document.querySelector(".users");
const searchName = document.getElementById("searchName");

let userArray = []

function callApi(url) {
    const myPromise = new Promise((resolve, reject) => {
        fetch(url)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })

    return myPromise;
}

function displayUser(arr) {
    usersDiv.innerHTML = "";

    if(arr.length === 0) {
        const msg = document.createElement("p");
        msg.classList.add("msg");
        msg.innerHTML = "No such user";
        usersDiv.appendChild(msg);
    }
    else {
        arr.forEach((user) => {
            const userDiv = document.createElement("div");
            userDiv.classList.add("user");
    
            const name = document.createElement("p");
            name.innerHTML = user.name;
            userDiv.appendChild(name);
            
            const location = document.createElement("p");
            location.innerHTML = user.address;
            userDiv.appendChild(location);
    
            // const line = document.createElement("hr");
            // userDiv.appendChild(line);
    
            usersDiv.appendChild(userDiv);
        })
    }
}

function filterUsers(val) {
    let filteredUsers = userArray.filter((user) => {
        return user.name.toLowerCase().includes(val.toLowerCase()) || user.address.toLowerCase().includes(val.toLowerCase());
    })

    displayUser(filteredUsers);
}

searchName.addEventListener("input", (event) => {
    // console.log(event.target.value);
    filterUsers(event.target.value);
})

callApi("https://jsonplaceholder.typicode.com/users")
.then((data) => {
    console.log(data);
    userArray = data.map((user) => {
        let obj = {
            name : user.name,
            address : user.address.city
        }

        return obj;
    })

    console.log(userArray);
    displayUser(userArray);
})
.catch(err => {
    console.log(err);
})
