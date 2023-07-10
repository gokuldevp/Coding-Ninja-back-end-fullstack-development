array = [1,2,3,4,5,6]

array.forEach(element => {
    console.log(element);
});

let add = (arr) => {
    // Function to return the sum of all elements in a array
    let total = 0;
    arr.forEach(element => {
        total += element;
    })
    return total;
}

console.log(add(array));

let argument = process.argv; // function to get the current directary along with the argument given during execution of the file
let new_arg = argument.slice(2) // Slice the argument in the string

let argument_int = () => {
    // function to convert the int to string and return a arr of intergers
    for(i in new_arg){
        new_arg[i] = parseInt(new_arg[i])
    }
    return new_arg;
}

console.log(add(argument_int()))
