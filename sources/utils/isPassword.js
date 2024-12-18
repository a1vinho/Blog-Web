
function isSymbol(password) {
    const symbols = ['!','@','#','&','%','*','(',')','$','-','+'];
    for (const char of password) {
        if (symbols.includes(char)) {
            return true;
        };
    };
    return false;
}
function isNumber(password) {
    const numbers = [0,1,2,3,4,5,6,7,8,9];
    for (const num of password) {
        if (numbers.includes(+num)) {
            return true;
        }
    };
    return false;
};

function isUpperCase(password) {
    const split = password.split('');
    for (const char of split) {
        if (password.includes(char.toUpperCase())) {
            return true;
        };
    };
    return false;
};

export default function isPassword (password,password2) {
    if (isNumber(password) && isUpperCase(password) && isSymbol(password) && password.length >= 8 && password === password2) {
        return true;
    } 
    return false;
};

console.log(isPassword('Se@nha','Se@nha'))