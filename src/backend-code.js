


 export let doctorNames = (doctorsName, condition) => {   
   return new Promise(function(resolve,reject){
      //search doctors by name
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${doctorsName}&query=${condition}&skip=0&user_key=${process.env.exports.apiKey}`;
  
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

 } 