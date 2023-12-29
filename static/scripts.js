/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});




let nextButton = document.getElementById('next')
let prevButton = document.getElementById('prev')
let list = [].slice.call(document.querySelector('.container').children)

function findActiveList() {
  let activeList = list.findIndex((e) => {
    return e.classList.contains('active')
  })
  
  list[activeList].classList.remove('active', 'fadeInRight', 'fadeInLext', 'animated')
  
  return activeList
}

function slideShow() {
  let activeList = findActiveList()
  
  activeList++
  activeList = activeList === list.length ? 0 : activeList
  
  list[activeList].classList.add('active', 'fadeInRight', 'animated')
}

setInterval(slideShow, 15000)

nextButton.addEventListener('click', slideShow)

prevButton.addEventListener('click', () => {
  let activeList = findActiveList()
  
  activeList--
  activeList = activeList === -1 ? list.length - 1 : activeList
  
  list[activeList].classList.add('active', 'fadeInLeft', 'animated')
})

function sendEmail() {
    // Your existing code to send the email using AJAX
    // Update the message div based on the response
    $.ajax({
        type: 'POST',
        url: '/send_email',
        data: $('#contactForm').serialize(), // Update the form ID here
        success: function(response) {
            if (response.status === 'success') {
                $('#statusMessage').html('<div class="alert alert-success">' + response.message + '</div>');
            } else {
                $('#statusMessage').html('<div class="alert alert-danger">' + response.message + '</div>');
            }
        },
        error: function(error) {
            $('#statusMessage').html('<div class="alert alert-danger">An error occurred: ' + error + '</div>');
        }
    });
}
