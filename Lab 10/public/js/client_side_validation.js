// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!
let registration_form = document.getElementById('signup-form');
let error_msg = document.getElementById("error")

if(registration_form){
    registration_form.addEventListener('submit', (event) => {
      console.log('Form submission fired');
      event.preventDefault();
      
      error_msg.innerHTML = '';
      let firstName = document.getElementById('firstName').value.trim()
      let lastName = document.getElementById('lastName').value.trim()
      let reg_username = document.getElementById('username').value.trim()
      let reg_password = document.getElementById('password').value.trim()
      let reg_conf_password = document.getElementById('confirmpassword').value
      let favoriteQuote = document.getElementById('favoriteQuote').value
      let themePreference = document.getElementById('themePreference').value.trim()
      let role = document.getElementById('role').value.trim()
        
     let isValifform = true;

      if(firstName === "" || lastName ==="" || reg_username ==="" ||  reg_password === "" ||  reg_conf_password === "" || favoriteQuote === "" || themePreference === "" || role ==="" ){
        let p = document.createElement('p');
        p.innerHTML = "No field should not be empty";
        error_msg.appendChild(p);
        isValifform = false;
        event.preventDefault();
      }

      if(firstName.length<2 || lastName.length<2 || firstName.length>25 || lastName.length>25){
        let p = document.createElement('p');
        p.innerHTML = "Firstname and Lastname should be between 2 and 25 characters";
        error_msg.appendChild(p);
        isValifform = false;
        event.preventDefault();
      }

      if(reg_username.length<5 || reg_username.length>10){
        let p = document.createElement('p');
        p.innerHTML = "Username should be more than 5 characters and less than 10 characters";
        error_msg.appendChild(p);
        isValifform = false;
        event.preventDefault();
      }

      if(/\d/.test(firstName) || /\d/.test(lastName) || /\d/.test(reg_username)){
        let p = document.createElement('p');
        p.innerHTML = "First Name, Last Name, Username should not contain a number";
        error_msg.appendChild(p);
        isValifform = false;
        event.preventDefault();
      }

      if(reg_password.length<8){
            let p = document.createElement('p');
            p.innerHTML = "Password should be 8 characters minimum";
            error_msg.appendChild(p);
            isValifform = false;
            event.preventDefault();
      }
      for(let i=0;i<reg_password.length;i++){
        if(reg_password[i] == ' '){
            let p = document.createElement('p');
            p.innerHTML = "Password should not contain a space";
            error_msg.appendChild(p);
            isValifform = false;
            event.preventDefault();
        }
      }
      if(!/[A-Z]/.test(reg_password) || !/\d/.test(reg_password)){
            let p = document.createElement('p');
            p.innerHTML = "Password should contain atleast one uppercase character, one numeric character";
            error_msg.appendChild(p);
            isValifform = false;
            event.preventDefault();
      }
      if(!/[^a-zA-Z0-9\s]/.test(reg_password)){
            let p = document.createElement('p');
            p.innerHTML = "Password should contain atleast one special character";
            error_msg.appendChild(p);
            isValifform = false;
            event.preventDefault();
      }
      if(reg_password!== reg_conf_password){
        let p = document.createElement('p');
        p.innerHTML = "Password and Confirm Password fields should be equal";
        error_msg.appendChild(p);
        isValifform = false;
        event.preventDefault();
      }
      if(favoriteQuote.length<20 || favoriteQuote.length>255){
        let p = document.createElement('p');
        p.innerHTML = "Should contain more than 20 and less than 255 characters";
        error_msg.appendChild(p);
        isValifform = false;
        event.preventDefault();
        }
        themePreference = themePreference.toLowerCase()
        let themes = ['light','dark'];
        if(!themes.includes(themePreference)){
            let p = document.createElement('p');
            p.innerHTML = "Theme preference should be dark or light";
            error_msg.appendChild(p);
            isValifform = false;
            event.preventDefault();
        }
        role = role.toLowerCase();
        let roles = ['user','admin'];
        if(!roles.includes(role)){
            let p = document.createElement('p');
            p.innerHTML = "Role should be user or admin";
            error_msg.appendChild(p);
            isValifform = false;
            event.preventDefault();
        }
        if(isValifform){
            event.target.submit();
        }else{
            event.preventDefault();
        }       
        
        
    })
}

let login_form = document.getElementById('signin-form');
let login_error_msg = document.getElementById("error_login")
if(login_form){
    login_form.addEventListener('submit', (event) => {
      console.log('Form submission fired');
      event.preventDefault();
      
      login_error_msg.innerHTML = '';

      let isValifloginform = true;
      let reg_username = document.getElementById('username').value.trim()
      let reg_password = document.getElementById('password').value.trim()

      if(!reg_username || !reg_password){
        let p = document.createElement('p');
        p.innerHTML = "Username or Password missing";
        login_error_msg.appendChild(p);
        isValifloginform = false;
        event.preventDefault();
      }
    
    if(isValifloginform){
        event.target.submit();
    }else{
        event.preventDefault();
    }       
    })
}