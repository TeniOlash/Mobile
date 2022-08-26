document.addEventListener('deviceready', deviceReady, false);

function deviceReady() {
  $(document).ready(function () {
    App.controller('home', function (page) {
      //
    });

    App.controller('skills', function (page) {
      // Skills
    });

    App.controller('Contact', function (page) {
      // Contact Details
    });

    App.controller('certs', function (page) {
      // Certificates and Career summary
    });

    App.controller('extras', function (page) {
      // Academic Background and extras
    });

    try {
      App.restore();
    } catch (err) {
      App.load('home');
    }
  });
}
