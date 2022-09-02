// Checking that cordova and jquery have loaded properly
document.addEventListener('deviceready', deviceReady, false);

function deviceReady() {
  $(document).ready(function () {
    // saving endpoints in variables

    https: var url = 'https://000webhost.com/thepocketspace/';
    var postsUrl = 'https://000webhost.com/thepocketspace/wp-json/wp/v2/posts';
    // saving token in variable
    var tokenUrl = `${url}/wp-json/jwt-auth/v1/token`;
    // admin details to access blog
    var adminDetails = {
      username: 'TeniOlash',
      password: 'Perseverance000@',
    };
    // getting all blog posts
    function getPosts() {
      $.getJSON(postsUrl, function (response) {
        $('.loader').remove();
        $.map(response, function (res) {
          $('.all-posts').append(`
                <div class="app-section">
                  <div class="post">
                  <h3 class="post-title">${res.title.rendered}</h3>
                  <sub>${res.date}</sub>
                  <hr />
                  <p class="post-content">${res.excerpt.rendered}</p>
                  </div>
                </div>`);
        });
      });
    }
    // saving token for authentication
    var token;
    $.post(tokenUrl, adminDetails, function (postData, status) {
      token = postData.token;
    });
    // app pages and functionality
    App.controller('home', function (page) {
      // put stuff here
    });

    App.controller('create-post', function (page) {
      // put stuff here
      function onBackKeyDown(e) {
        e.preventDefault();
        App.load(home);
      }
      $(page)
        .find('form')
        .on('submit', function (e) {
          let title = $(page).find('input[name=title]').val();
          let content = $(page).find('textarea[name=content]').val();

          e.preventDefault();

          var formData = {
            title: title,
            content: content,
            status: 'publish',
          };
          $.ajax({
            type: 'post',
            url: postsUrl,
            data: JSON.stringify(formData),
            crossDomain: true,
            contentType: 'application/json',
            headers: {
              Authorization: 'Bearer ' + token,
            },
            success: function (postData) {
              console.log('working');
              $('.intro-txt').replaceWith(
                ' <div class="success-txt"> Uploaded post successfully!</div>'
              );
              $('input').empty();
            },
            error: function (error) {
              console.log('error: ' + error);
              $('.intro-txt').replaceWith(
                ' <div class="error-txt"> Could not send your post. Try again!</div>'
              );
            },
          });
          App.load('create-post');
        });
    });
    App.controller('all-posts', function (page) {
      // put stuff here
      $(page)
        .find('.all-posts')
        .append(`<div>Loading...<div class="loader"></div></div>`);

      getPosts();
    });
  });
  App.load('home');
}
