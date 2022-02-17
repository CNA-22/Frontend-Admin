export default function checkJWT () {
  let jwt = document.cookie
  console.log(jwt.split('=')[1]);
  if(jwt.split('=')[1] === ''){
    return false
  }
  var data = jwt.split('.')[1];
  var jsonPayload = decodeURIComponent(atob(data).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
    let valid = false
    if(JSON.parse(jsonPayload).userLevel === "admin"){
      valid = jwt.split("=")[1]
    }
    return valid
}

