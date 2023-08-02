
var name_field = document.querySelector('.name-field')
var num_field = document.querySelector('.num-field')
var month_field = document.querySelector('.month-field')
var year_field = document.querySelector('.year-field')
var cvc_field = document.querySelector('.cvc-field')

name_field.addEventListener('input',input_change)
num_field.addEventListener('input',input_change)
month_field.addEventListener('input',input_change)
year_field.addEventListener('input',input_change)
cvc_field.addEventListener('input',input_change)

name_field.addEventListener('keypress',ev=>{
    if(ev.key==='Enter'){num_field.focus()}
})
num_field.addEventListener('keypress',inputKeyPress)
month_field.addEventListener('keypress',inputKeyPress)
year_field.addEventListener('keypress',inputKeyPress)
cvc_field.addEventListener('keypress',inputKeyPress)


function confirmBtnClick(ev) {
    // Reset error styles
    name_field.style.borderColor = '#6A5ACD';
    num_field.style.borderColor = '#6A5ACD';
    month_field.style.borderColor = '#6A5ACD';
    year_field.style.borderColor = '#6A5ACD';
    cvc_field.style.borderColor = '#6A5ACD';

    // Reset error messages
    document.querySelector('.name-warn').style.display = 'none';
    document.querySelector('.number-warn').style.display = 'none';
    document.querySelector('.release-month-year-warn').style.display = 'none';
    document.querySelector('.cvc-warn').style.display = 'none';

    // Check name field
    if (name_field.value === '') {
        document.querySelector('.name-warn').style.display = 'initial';
        name_field.style.borderColor = 'hsl(0, 100%, 66%)';
    }

    // Check number field
    if (num_field.value === '' || num_field.value.length < 16) {
        document.querySelector('.number-warn').style.display = 'initial';
        num_field.style.borderColor = 'hsl(0, 100%, 66%)';
    } else {
        // Check if the card number is numeric and has 16 digits
        const cardNumber = num_field.value.replace(/\s+/g, ''); // Remove any spaces
        if (isNaN(cardNumber) || cardNumber.length !== 16) {
            document.querySelector('.number-warn').style.display = 'initial';
            num_field.style.borderColor = 'hsl(0, 100%, 66%)';
        }
    }

    // Check month field
    const inputMonth = parseInt(month_field.value);
    if (month_field.value === '' || isNaN(inputMonth) || inputMonth < 1 || inputMonth > 12) { 
        document.querySelector('.release-month-year-warn').style.display = 'initial';
        month_field.style.borderColor = 'hsl(0, 100%, 66%)';
    } else {
        // If the month is valid, hide the warning
        document.querySelector('.release-month-year-warn').style.display = 'none';
        month_field.style.borderColor = '#6A5ACD';
    }

    // Check year field
    const currentYear = new Date().getFullYear();
    const inputYear = parseInt(year_field.value);
    if (year_field.value === '' || isNaN(inputYear) || inputYear < currentYear) { 
        document.querySelector('.release-month-year-warn').style.display = 'initial';
        year_field.style.borderColor = 'hsl(0, 100%, 66%)';
    } else {
        // If the year is valid, hide the warning
        document.querySelector('.release-month-year-warn').style.display = 'none';
        year_field.style.borderColor = '#6A5ACD';
    }

    // Check CVC field
    if (cvc_field.value === '' || cvc_field.value <1) { 
        document.querySelector('.cvc-warn').style.display = 'initial';
        cvc_field.style.borderColor = 'hsl(0, 100%, 66%)';
    } else if (cvc_field.value.length < 3) {
        document.querySelector('.cvc-warn').style.display = 'initial';
        cvc_field.style.borderColor = 'hsl(0, 100%, 66%)';
    }

    // Check if all fields are valid, if yes, hide the form and show the completion message
    if (
        name_field.value !== '' &&
        num_field.value.length === 16 &&
        month_field.value !== '' &&
        month_field.value !== '00' && 
        year_field.value !== '' &&
        year_field.value !== '00' && 
        cvc_field.value.length === 3 &&
        cvc_field.value !== '000'
    ) {
        document.querySelector('.form').style.display = 'none';
        document.querySelector('.completion-message').style.display = 'flex';
    }
}

name_field.addEventListener('keypress', function (ev) {
  const charCode = ev.charCode;
  if (charCode >= 48 && charCode <= 57) {
    ev.preventDefault();
  }
  const invalidCharacters = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '[', ']', '{', '}', '|', '\\', ';', ':', '\'', '"', '<', '>', ',', '.', '/', '?', '`', '~'];
  if (invalidCharacters.includes(ev.key)) {
    ev.preventDefault();
  }
});

cvc_field.addEventListener('input', function (ev) {
    const value = cvc_field.value;
    const numericValue = parseInt(value, 10);
    
    if (isNaN(numericValue) || numericValue <= 0) {
      document.querySelector('.cvc-warn').style.display = 'initial';
      cvc_field.style.borderColor = 'hsl(0, 100%, 66%)';
    } else {
      document.querySelector('.cvc-warn').style.display = 'none';
      cvc_field.style.borderColor = '#6A5ACD';
    }
  });
  
function input_change(ev){
    if(ev.currentTarget===name_field){
        document.querySelector('.holder-name').innerHTML = name_field.value
    }
    else if(ev.currentTarget===num_field){
        num_field_process_value()
    }
    else if(ev.currentTarget===month_field){
        document.querySelector('.release-date').innerHTML = month_field.value+'/'+year_field.value
    }
    else if(ev.currentTarget===year_field){
        document.querySelector('.release-date').innerHTML = month_field.value+'/'+year_field.value
    }
    else if(ev.currentTarget===cvc_field){
        document.querySelector('.cvc').innerHTML = cvc_field.value
    }
}
function inputKeyPress(ev){
if(ev.key==='0' || ev.key==='1' || ev.key==='2' || ev.key==='3' || ev.key==='4' || 
ev.key==='5' || ev.key==='6' || ev.key==='7' || ev.key==='8' || ev.key==='9' || ev.key==='.' || ev.key==='Enter'){

if(ev.currentTarget===num_field && num_field.value.length===16){
ev.preventDefault()
}

if(ev.currentTarget===month_field && month_field.value.length===2){
ev.preventDefault()
}

if(ev.currentTarget===year_field && year_field.value.length===2){
ev.preventDefault()
}

if(ev.currentTarget===cvc_field && cvc_field.value.length===3){
ev.preventDefault()
}

if(ev.currentTarget===num_field && ev.key==='Enter'){
    month_field.focus()
}
if(ev.currentTarget===month_field && ev.key==='Enter'){
    year_field.focus()
}
if(ev.currentTarget===year_field && ev.key==='Enter'){
    cvc_field.focus()
}
if(ev.currentTarget===cvc_field && ev.key==='Enter'){
    confirmBtnClick()
}

}
else{
    ev.preventDefault()
}
}
function num_field_process_value(ev){
    var value = num_field.value
    var newValue = value

    if(value.length > 4 && value.length <= 8){
    newValue = value.slice(0, 4) + ' ' + value.slice(4)
}
else if(value.length > 8 && value.length <= 12){
    newValue = value.slice(0, 4) + ' ' + value.slice(4, 8) + ' ' + value.slice(8)
    }

    else if(value.length > 12 && value.length <= 16){
    newValue = value.slice(0, 4) + ' ' + value.slice(4, 8) + ' ' + value.slice(8, 12) + ' ' + value.slice(12)
    }


    document.querySelector('.card-num').innerHTML = newValue
    


}
function continueBtn(){
    location.reload();
    document.querySelector('.completion-message').style.display = 'none'
    document.querySelector('.form').style.display = 'flex'

    num_field.value = ''
    name_field.value = ''
    month_field.value = ''
    year_field.value = ''
    cvc_field.value = ''

    num_field.style.borderColor = '#6A5ACD';
    name_field.style.borderColor = '#6A5ACD';
    month_field.style.borderColor = '#6A5ACD';
    year_field.style.borderColor = '#6A5ACD';
    cvc_field.style.borderColor = '#6A5ACD';

    // Ẩn cảnh báo
    document.querySelector('.name-warn').style.display = 'none';
    document.querySelector('.number-warn').style.display = 'none';
    document.querySelector('.release-month-year-warn').style.display = 'none';
    document.querySelector('.cvc-warn').style.display = 'none';
}