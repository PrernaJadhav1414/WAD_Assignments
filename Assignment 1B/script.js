
$(document).ready(function(){
    const form = $("#registrationForm");
    $("#sub").click(function(){

        const user = {
            name: $("#name").val(),
            email: $("#email").val(),
        };

        let users = JSON.parse(localStorage.getItem("users")) ||
        [];
        users.push(user);
        localStorage.setItem("users",JSON.stringify(users));
        alert("User registration successfully");
        form.reset();
    });
});
