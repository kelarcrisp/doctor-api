import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { doctorNames } from './backend-code.js';

$(function() {
  $(".search").submit(function(event){
    event.preventDefault();

    
    $('.output1').text(" ");

    let doctorName = $("#name").val();
    let condition = $("#condition").val();
    let location = $("#location").val();

    doctorNames(doctorName, condition).then(function(response){



        let result = JSON.parse(response);
        if (doctorName === "") {
          $(".output1").text('please enter a valid name');
        // }else if (result.data.length > 1){
        //   $(".output1").text(``);
        // }
      }

        for (let i = 0; i < result.data.length; i++) {

          $('.output1').append(`<strong>location: ${result.data[i].practices[0].location_slug} <br>`);

          $('.output1').append(`<strong>Phone number: ${result.data[i].practices[0].phones[i].number} <br>`);

          $('.output1').append(`<i>bio: ${result.data[i].profile.bio} <br>`);

          $('.output1').append(`<strong>Accepting new patients: ${result.data[i].practices[0].accepts_new_patients} <br>`);

          $('.output1').append(`<strong>First Name:</bold> ${result.data[i].profile.first_name}<br> `);

          $('.output1').append(`<strong>Last Name ${result.data[i].profile.last_name} <hr>`);

          $('.output1').append(`<strong>street address: ${result.data[i].practices[0].visit_address.street}<br> `);

          $('.output1').append(`website:  ${result.data[i].practices[0].website}<br>`);

          $(".output1").append("<img src='" + result.data[i].profile.image_url+ "'>");

          // if (result.data[i].practices[0] === "" ){
          //   $(".output1").append('this user doesnt have a website');
          // }
        }

        }, function(error) {
          $(".output1").text(`There was an error processing your request ${error.message}`);
        });
        });
      });
