import * as constants from "./constants.js";

function getUserOptions() {
  var pwLength = parseInt(
    prompt("How many characters should the password contain?"),
    10
  );
  if(Number.isNaN(pwLength)){
    alert("Provide a number");
    return null;
  }
  if(pwLength < 8){
    alert("Provide a number larger than 7.");
    return null;
  }
  if(pwLength > 128){
    alert("Provide a number smaller than 129.");
    return null;
  }

  var hasSpecialCharacters = confirm("Click OK to confirm special characters in generated password.")
  var hasNumericCharacters = confirm("Click OK to confirm numeric characters in generated password.")
  var hasLowerCharacters = confirm("Click OK to confirm lowercase characters in generated password.")
  var hasUpperCharacters = confirm("Click OK to confirm uppercase characters in generated password.")
  if(!hasSpecialCharacters && !hasNumericCharacters && !hasLowerCharacters && !hasUpperCharacters){
    alert("Select at least one character type.");
    return null;
  }

  var passwordOptions = {
    length: pwLength,
    hasSpecialCharacters: hasSpecialCharacters,
    hasNumericCharacters: hasNumericCharacters,
    hasLowerCharacters: hasLowerCharacters,
    hasUpperCharacters, hasUpperCharacters
  };

  return passwordOptions;
}

function getRandom(arr) {
  var valPosition = Math.floor(Math.random() * arr.length)
  var randElement = arr[valPosition];

  return randElement;
}

function generatePassword() {
  var options = getUserOptions();
  var result = [];
  var possibleCharacters = [];
  //create list of possible characters, along side a short list of characters we know we must include, just in case.
  //after a list has been created that matches the length, replace the first few items with our guaranteed chars
  //this way we know we will meet requirements set by user
  var guaranteedCharacters = [];
  if (!options)
    return null;
  if (options.hasSpecialCharacters) {
    possibleCharacters = possibleCharacters.concat(constants.specialCharacters);
    guaranteedCharacters.push(getRandom(constants.specialCharacters));
  }
  if (options.hasNumericCharacters) {
    possibleCharacters = possibleCharacters.concat(constants.numericCharacters);
    guaranteedCharacters.push(getRandom(constants.numericCharacters));
  }
  if (options.hasLowerCharacters) {
    possibleCharacters = possibleCharacters.concat(constants.lowerCasedCharacters);
    guaranteedCharacters.push(getRandom(constants.lowerCasedCharacters));
  }
  if (options.hasUpperCharacters) {
    possibleCharacters = possibleCharacters.concat(constants.upperCasedCharacters);
    guaranteedCharacters.push(getRandom(constants.upperCasedCharacters));
  }
  for (var i = 0; i < options.length; i++) {
    var possibleCharacter = getRandom(possibleCharacters);

    result.push(possibleCharacter);
  }
  for (var i = 0; i < guaranteedCharacters.length; i++) {
    result[i] = guaranteedCharacters[i];
  }

  return result.join('');
}

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
