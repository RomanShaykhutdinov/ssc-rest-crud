$(document).ready(getAllUsers());

// Show user table
function getAllUsers() {
    $("#table").empty();
    $.ajax({
        type: 'POST',
        url: '/api/admin/users',
        timeout: 3000,
        success: function (data) {
            console.log(data);
            $.each(data, function (i, user) {
                $("#table").append($('<tr>').append(
                    $('<td>').append($('<span>')).text(user.id),
                    $('<td>').append($('<span>')).text(user.username),
                    $('<td>').append($('<span>')).text(user.lastname),
                    $('<td>').append($('<span>')).text(user.age),
                    $('<td>').append($('<span>')).text(user.email),
                    $('<td>').append($('<span>')).text(user.role),
                    $('<td>').append($('<button>').text("Edit").attr({
                        "type": "button",
                        "class": "btn btn-primary edit",
                        "data-toggle": "modal",
                        "data-target": "#myModal",
                    })
                        .data("user", user)),
                    $('<td>').append($('<button>').text("Delete").attr({
                        "type": "button",
                        "class": "btn btn-danger delete",
                        "data-toggle": "modal",
                        "data-target": "#myModalDelete",
                    })
                        .data("user", user))
                    )
                );
            });
        }
    });
}

//Show user information for user
$(document).ready(getUser());
function getUser() {
    $("#userTable").empty();
    $.ajax({
        type: 'POST',
        url: '/api/user/getUser',
        timeout: 3000,
        error: function() {
            $('#forUser').hide();
        },
        success: function (data) {
            console.log(data);
            $.each(data, function (i, user) {
                if(user.role === "USER") {
                    $('#menuUser').trigger('click');
                    $('#main2').trigger('click');
                    $('#forAdmin').hide();
                }
                $("#userTable").append($('<tr>').append(
                    $('<td>').append($('<span>')).text(user.id),
                    $('<td>').append($('<span>')).text(user.username),
                    $('<td>').append($('<span>')).text(user.lastname),
                    $('<td>').append($('<span>')).text(user.age),
                    $('<td>').append($('<span>')).text(user.email),
                    $('<td>').append($('<span>')).text(user.role),
                    )
                );
            });
        }
    });
}

// Add user
$(document).on("click", ".addUser", function () {
    $('#usersTable').trigger('click');
    let user = $(".formAddUser").serializeArray();

    $('.formAddUser #newId').val(user.id).val(0).hide();
    $('.formAddUser #newUsername').val('');
    $('.formAddUser #newLastname').val('');
    $('.formAddUser #newAge').val('');
    $('.formAddUser #newEmail').val('');
    $('.formAddUser #newPassword').val('');
    $('.formAddUser #newRole').val('');
    $.ajax({
        type: 'POST',
        url: '/api/admin/addUser',
        data: user,
        timeout: 3000,
        success: function () {
            getAllUsers();
        }
    });
});

//Edit user modal
$(document).on("click", ".edit", function () {
    let user = $(this).data('user');

    $('#id').val(user.id).hide();
    $('#username').val(user.username);
    $('#lastname').val(user.lastname);
    $('#age').val(user.age);
    $('#email').val(user.email);
    $('#password').val(null);
    $('#role').val(user.role);
});

$(document).on("click", ".editUser", function () {
    let formData = $(".formEditUser").serializeArray();
    $.ajax({
        type: 'POST',
        url: '/api/admin/update',
        data: formData,
        timeout: 1000,
        success: function () {
            getAllUsers();
        }
    });
});

//Delete user modal
$(document).on("click", ".delete", function () {
    let user = $(this).data('user');
    $('#delId').val(user.id).hide();
    $(document).on("click", ".deleteUser", function () {
        $.ajax({
            type: 'POST',
            url: '/api/admin/remove',
            data: {id: $('#delId').val()},
            timeout: 500,
            success: function () {
                getAllUsers();
            }
        });
    });
})




