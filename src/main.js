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

    let request = new XMLHttpRequest();
    let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${doctorName}&query=${condition}&skip=0&limit=10&user_key=9b646921fe3bcf87002beb619881b7af`;
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
    $(".output1").text(`All results for ${doctorName}: <br>`);

    for (let i = 0; i < 200; i++) {
    $('.output1').append(`${result.message.body} <br>`);
  }
}, function (error) {
  $(".output2").text(`There was an error processing your request ${error.message}`);
});
