sabio.services.cars = sabio.services.cars || {}
sabio.services.getCars = function (onSuccess, onError) {
    var url = "http://sabioapi2.azurewebsites.net/api/entities/cars";
    var settings = {
        headers: {
            'SABIO-AUTH': 'U4UKNBJ12'
        },
        success: onSuccess,
        error: onError,
        type: "GET",
    };
    $.ajax(url, settings);
}
sabio.services.getCarById = function (id, onSuccess, onError) {
    var url = "http://sabioapi2.azurewebsites.net/api/entities/cars" + id;
    var settings = {
        headers: {
            'SABIO-AUTH': 'U4UKNBJ12'
        },
        success: onSuccess,
        error: onError,
        type: "GET",
    };
    $.ajax(url, settings);
}
sabio.services.addCar = function (car, onSuccess, onError) {
    var url = "http://sabioapi2.azurewebsites.net/api/entities/cars";
    var settings = {
        headers: {
            'SABIO-AUTH': 'U4UKNBJ12'
        },
        success: onSuccess,
        error: onError,
        type: "POST",
        data: car
    };
    $.ajax(url, settings);
}
sabio.services.updateCar = function (car, onSuccess, onError) {
    var url = "http://sabioapi2.azurewebsites.net/api/entities/cars" + car.id;
    var settings = {
        headers: {
            'SABIO-AUTH': 'U4UKNBJ12'
        },
        success: onSuccess,
        error: onError,
        type: "PUT",
        data: car
    };
    $.ajax(url, settings);
}
sabio.services.deleteCar = function (id, onSuccess, onError) {
    var url = "http://sabioapi2.azurewebsites.net/api/entities/cars" + id;
    var settings = {
        headers: {
            'SABIO-AUTH': 'U4UKNBJ12'
        },
        success: onSuccess,
        error: onError,
        type: "DELETE"
    };
    $.ajax(url, settings);
}