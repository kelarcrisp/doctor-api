import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Constructor-Name } from './backend-code';

$(function() {
$(".search").submit(function(event){
  event.preventDefault();


  $('.output1').text(" ");
  $('.output2').text(" ");
  let doctorName = $("#name").val();
  let condition = $("#condition").val();


  let doctorNames = new Promise(function(resolve,reject){
//search doctors by name
    let request = new XMLHttpRequest();
    let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${doctorName}&query=${condition}&location=wa-seattle&skip=0&limit=10&user_key=9b646921fe3bcf87002beb619881b7af`;

    request.onload = function() {
      if (this.status === 200) {
        resolve(request.response);
      }else{
        reject(Error(request.statusText));
      }
    };
  request.open("GET",url, true);
  request.send();
});






  doctorNames.then(function(response){
    let result = JSON.parse(response);
    if (doctorName === "") {
      $(".output").text('please enter a valid name');
    }else if (result.data.length > 1){
      $(".output1").text(`All results for ${doctorName}`);
    }

    for (let i = 0; i < 5; i++) {
    $('.output1').append(`${result.data[i].profile.first_name} <br>`);
    $('.output1').append(`${result.data[i].profile.last_name}`);
    $('.output1').append(`${result.data[i].practices.location_slug} `);
    // $('.output1').append(`${result.data[i].practices.phones.number} <br>`);
    // $('.output1').append(`${result.data[i].profile.first_name} <br>`);
    // $('.output1').append(`${result.data[i].profile.first_name} <br>`);



    }
  },function(error) {
    $(".output2").text(`There was an error processing your request ${error.message}`);
  });

});
});
