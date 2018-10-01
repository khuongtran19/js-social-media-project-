sabio.services.authors = sabio.services.authors || {}
sabio.services.getAuthors = function (onSuccess, onError) {
    var url = "http://sabioapi2.azurewebsites.net/api/authors/";
    var settings = {
        headers: {
            'SABIO-AUTH': 'U4TM3BMU5'
        },
        success: onSuccess,
        error: onError,
        type: "GET",
    };
    $.ajax(url, settings);
}
sabio.services.getAuthorById = function (id, onSuccess, onError) {
    var url = "http://sabioapi2.azurewebsites.net/api/authors/" + id;
    var settings = {
        headers: {
            'SABIO-AUTH': 'U4TM3BMU5'
        },
        success: onSuccess,
        error: onError,
        type: "GET",
    };
    $.ajax(url, settings);
}
sabio.services.addAuthor = function (author, onSuccess, onError) {
    var url = "http://sabioapi2.azurewebsites.net/api/authors/";
    var settings = {
        headers: {
            'SABIO-AUTH': 'U4TM3BMU5'
        },
        success: onSuccess,
        error: onError,
        type: "POST",
        data: author
    };
    $.ajax(url, settings);
}
sabio.services.updateAuthor = function (author, onSuccess, onError) {
    var url = "http://sabioapi2.azurewebsites.net/api/authors/" + author.id;
    var settings = {
        headers: {
            'SABIO-AUTH': 'U4TM3BMU5'
        },
        success: onSuccess,
        error: onError,
        type: "PUT",
        data: author
    };
    $.ajax(url, settings);
}
sabio.services.deleteAuthor = function (id, onSuccess, onError) {
    var url = "http://sabioapi2.azurewebsites.net/api/authors/" + id;
    var settings = {
        headers: {
            'SABIO-AUTH': 'U4TM3BMU5'
        },
        success: onSuccess,
        error: onError,
        type: "DELETE"
    };
    $.ajax(url, settings);
}