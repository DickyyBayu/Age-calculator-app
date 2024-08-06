const dayInput = document.getElementById('day-input');
const monthInput = document.getElementById('month-input');
const yearInput = document.getElementById('year-input');
const yearOutput = document.getElementById('years');
const monthOutput = document.getElementById('months');
const dayOutput = document.getElementById('days');
const calculateButton = document.getElementById('calculate-button');
const errorStyle = '1px solid var(--Light-red)';

calculateButton.addEventListener('click', (event) => {
    event.preventDefault();
    clearAllErrorMessages();

    yearOutput.innerText = '-- ';
    monthOutput.innerText = '-- ';
    dayOutput.innerText = '-- ';

    let dayVal = parseInt(dayInput.value);
    let monthVal = parseInt(monthInput.value);
    let yearVal = parseInt(yearInput.value);

    if (!validateDay(dayVal, monthVal, yearVal) || !validateMonth(monthVal) || !validateYear(yearVal)) {
        return;
    }

    const birthDate = new Date(yearInput.value, monthInput.value - 1, dayInput.value);
    const currentDate = new Date();
    
    let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
    let ageMonths = currentDate.getMonth() - birthDate.getMonth();
    let ageDays = currentDate.getDate() - birthDate.getDate();

    if (ageMonths < 0) {
        if (ageDays < 0) {  
            ageYears -= 1;
            ageMonths += 12;
            ageDays = getMonthDays(currentDate.getMonth(), currentDate.getFullYear()) - birthDate.getDate() + currentDate.getDate() + 1;
        }
    }

    yearOutput.innerText = ageYears + ' ';
    monthOutput.innerText = ageMonths + ' ';
    dayOutput.innerText = ageDays + ' ';

    dayInput.value = '';
    monthInput.value = '';
    yearInput.value = '';

});

function validateYear(yearValue) {
    let currentYear = new Date().getFullYear();
    if (yearInput.value === '') {
        showErrorMessage(yearInput, 'This field is required');
        return false;
    } else if (yearInput.value.length !== 4) {
        showErrorMessage(yearInput, 'Must be a valid format');
        return false;
    } else if (yearValue > currentYear) {
        showErrorMessage(yearInput, 'Must be in the past');
        return false;
    } else if (yearValue < 1900) {
        showErrorMessage(yearInput, 'Must be above 1900');
        return false;
    }
    return true;
}

function validateMonth(monthValue) {
    if (monthInput.value === '') {
        showErrorMessage(monthInput, 'This field is required');
        return false;
    } else if (monthInput.value.length > 2) {
        showErrorMessage(monthInput, 'Must be a valid format');
        return false;
    } else if (monthValue < 1 || monthValue > 12) {
        showErrorMessage(monthInput, 'Must be a valid month');
        return false;
    }
    return true;
}

function validateDay(dayValue, monthValue, yearValue) {
    if (dayInput.value === '') {
        showErrorMessage(dayInput, 'This field is required');
        return false;
    } else if (dayInput.value.length > 2) {
        showErrorMessage(dayInput, 'Must be a valid format');
        return false;
    } else if (dayValue < 1 || dayValue > getMonthDays(monthValue, yearValue)) {
        showErrorMessage(dayInput, 'Must be a valid day');
        return false;
    }
    return true;

};

function getMonthDays(month, year) {
    let numberOfDays = 0;

    if (month === 1) {
        numberOfDays = daysInFebruary(year);
    } else if (month === 4 || month === 6 || month === 9 || month === 11) {
        numberOfDays = 30;
    } else {
        numberOfDays = 31;
    }
     
    return numberOfDays
}

function daysInFebruary(year) {
    if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
        return 29;
    } else {
        return 28;
    }
}

function showErrorMessage(element, message) {
    element.style.border = errorStyle;
    element.nextElementSibling.innerText = message;
    element.nextElementSibling.classList.add('error-input');
}

function clearErrorMessage(element) {
    if (element.classList.contains('error-input')) {
        element.previousElementSibling.style.border = '1px solid var(--Light-grey)';
        element.innerText = '';
        element.classList.remove('error-input');
    }
}

function clearAllErrorMessages() {
    const errorInputs = document.querySelectorAll('.error-state');
    
    errorInputs.forEach(input => clearErrorMessage(input));
}