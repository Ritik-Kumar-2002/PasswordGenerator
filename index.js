const password_length = document.querySelector("[password-length]");
const UpperCase = document.getElementById("UpperCase");
const LowerCase = document.getElementById("LowerCase");
const NumberCase = document.getElementById("NumberCase");
const SpecialCase = document.getElementById("SpecialCase");
const PASSWORD  = document.querySelector("[password]");
const Copy_Content = document.querySelector("[Copy-Content]");
const PasswordStrength = document.querySelector("[PasswordStength]");

const SetPassWordLength = (val) => {
    password_length.innerHTML = val;
    // console.log(`Upper case ${UpperCase.checked}`);

}


let hasUpperCase = true;
let hasLowerCase = false;
let hasNumber = false;
let hasSymbol = false;

// =============== || FUNCTION CHECK WHICH CHECKBOX IS SELECT OR NOT || ==================

const selectCheckBox = (value) => {
    // console.log(`value is ${value}`);
    { UpperCase.checked ? hasUpperCase = true : hasUpperCase = false }
    { LowerCase.checked ? hasLowerCase = true : hasLowerCase = false }
    { NumberCase.checked ? hasNumber = true : hasNumber = false }
    { SpecialCase.checked ? hasSymbol = true : hasSymbol = false }

    console.log(`${hasUpperCase} ${hasLowerCase} ${hasNumber} ${hasSymbol}`);
}

const GetRandomNumber = (min, max) => {
    let random_number = Math.floor(Math.random() * (max - min) + min);

    return random_number;
}
const GenerateUpperCaseCharacter = () => {
    let random_number = GetRandomNumber(65, 91);
    let letter = String.fromCharCode(random_number);

    // console.log(`letter is: ${letter} and random number is ${random_number}`)
    return letter;
}

const GenerateLowerCaseCharacter = () => {
    let random_number = GetRandomNumber(97, 123);
    let letter = String.fromCharCode(random_number);

    // console.log(`letter is: ${letter} and random number is ${random_number}`)
    return letter;
}

const GenerateNumberCharacter = () => {
    let random_number = GetRandomNumber(0, 10);
    return random_number;
}

// GenerateSpecialCharacter();

const GenerateSpecialCharacter = () => {
    const random_sequence = "@#$%&(){}[]?";
    let length = random_sequence.length;
    let random_number = GetRandomNumber(0, length);
    return random_sequence.charAt(random_number);
}

// ================== || CALCULATE STRENGTH || =================== 

const CalculateStrength = (Password) =>{
    console.log(Password);
    // If Password contain Uppercase, LowerCase, Number and Special Case and length should be greater than or equal to 8 
    let UpperCaseCount=0, LowerCaseCount=0, NumberCaseCount=0, SpecialCaseCount=0;
    let Passwordlength = Password.length;
    for(let index in Password){
        let char = Password[index];
        if(char >= "A" && char <='Z') UpperCaseCount++;
        else if(char >= "a" && char <='z')  LowerCaseCount++;
        else if(char >= '1' && char <='9') NumberCaseCount++;
        else SpecialCaseCount++;
    }
    console.log(`upper ${UpperCaseCount} lower ${LowerCaseCount} number ${NumberCaseCount} special ${SpecialCaseCount}`);
    if(UpperCaseCount>0 && LowerCaseCount>0 
        && NumberCaseCount >0 && SpecialCaseCount > 0 && Passwordlength > 7) return true;

    return false;
}

// ================== || GENEARATE A RANDOM PASSWORD || ===================

const GeneratePassword = () => {
    let password = "";
    let length = password_length.innerHTML;
    while(password.length <  length){
        let choice = GetRandomNumber(1,5);
        
        switch(choice){
            case 1: { hasUpperCase ? password = password.concat(GenerateUpperCaseCharacter()) : password += "" }
                break;
            case 2: { hasLowerCase ? password = password.concat(GenerateLowerCaseCharacter()) : password += "" }
                break;
            case 3: { hasNumber ? password = password.concat(GenerateNumberCharacter()) : password += "" }
                break;
            case 4: { hasSymbol ? password = password.concat(GenerateSpecialCharacter()) : password += "" }
                break;
            default : // Nothing to code 

        }
    }
    console.log(`passwor ${password} and length ${password.length}`)
    PASSWORD.innerHTML = password;

    const boolean = CalculateStrength(password);
    { boolean ? PasswordStrength.style.background="#0df624": PasswordStrength.style.background="red" }
}

// ================== || COPY CONTENT || ====================

// console.log(Copy_Content);
// console.log(Copy_Content.innerHTML);

const CopyContent = async () =>{
    let copiedtext= "";
    try{
        copiedtext = await PASSWORD.innerHTML;
        Copy_Content.innerHTML = "Copied";
    }catch(error) {
        Copy_Content.innerHTML = "Failed";
    }
    Copy_Content.style.display = "block";

    setTimeout(()=> {
        console.log("calling");
        Copy_Content.style.display = "none";
    } , 5000)
 
    
}