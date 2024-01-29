document.addEventListener('DOMContentLoaded', function () {
    showData();
});

function validateForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var age = document.getElementById("age").value;
    var adress = document.getElementById("adress").value;

    if (name === "") {
        alert('Por favor, informe o nome');
        return false;
    }

    if (email === "") {
        alert('Por favor, informe o email');
        return false;
    } else if (!email.includes('@')) {
        alert('Por favor, insira um email válido');
        return false;
    }
    if (age === "") {
        alert('Por favor, informe a idade');
        return false;
    } else if (age <= 0) {
        alert("Por favor, insira uma idade válida");
        return false;
    }
    if (adress === "") {
        alert('Por favor, informe o endereço');
        return false;
    }

    return true;
}

function showData() {
    var peopleList = JSON.parse(localStorage.getItem('peopleList')) || [];
    var html = "";

    peopleList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.adress + "</td>";
        html += '<td><button onclick="deleteData(' + index + ')" class="btn btn-danger">Apagar dados</button> <button onclick="updateData(' + index + ')" class="btn btn-warning m-2">Atualizar dados</button> </td>';
        html += "</tr>";
    });

    document.querySelector('#crudTable tbody').innerHTML = html;
}

function AddData() {
    if (validateForm()) {
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var age = document.getElementById('age').value;
        var adress = document.getElementById('adress').value;

        var peopleList = JSON.parse(localStorage.getItem('peopleList')) || [];
        peopleList.push({
            name: name,
            email: email,
            age: age,
            adress: adress
        });

        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("age").value = "";
        document.getElementById("adress").value = "";
    }
}

function deleteData(index) {
    var peopleList = JSON.parse(localStorage.getItem('peopleList')) || [];
    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

function updateData(index) {
    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "block";

    var peopleList = JSON.parse(localStorage.getItem('peopleList')) || [];
    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("email").value = peopleList[index].email;
    document.getElementById("age").value = peopleList[index].age;
    document.getElementById("adress").value = peopleList[index].adress;

    document.querySelector("#update").addEventListener("click", function () {
        if (validateForm()) {
            peopleList[index].name = document.getElementById("name").value;
            peopleList[index].email = document.getElementById("email").value;
            peopleList[index].age = document.getElementById("age").value;
            peopleList[index].adress = document.getElementById("adress").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));
            showData();

            document.getElementById('name').value = "";
            document.getElementById('email').value = "";
            document.getElementById('age').value = "";
            document.getElementById('adress').value = "";

            document.getElementById("submit").style.display = "block";
            document.getElementById("update").style.display = "none";
        }
    });
}
