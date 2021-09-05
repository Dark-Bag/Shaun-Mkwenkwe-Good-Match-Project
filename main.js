
const csv = require('csv-parser')
const fs = require('fs')
const results = [];

males = {}
females = {}

fs.createReadStream('test.csv')
  .pipe(csv())
  .on('data', (data) => /*results.push(data.name)*/{
      if((data.gender).toLowerCase() == 'm'){
        males[data.name] = data.name
      }
      else if((data.gender).toLowerCase() == 'f'){
        females[data.name] = data.name
      }
        
  } )
  .on('end', () => {
    // console.log(males);
    // console.log(females);

    for(var key in males){
        for(var key2 in females){

            // console.log(`${key.toLowerCase()} matches ${key2.toLowerCase()}`);
            main( key.toLowerCase(), key2.toLowerCase() )

        }
    }
    
    percentageSort()

    writeToFile()

  });


const matches = "matches"



var dict = {};

var resultsOutput = ''
var resultsOutputArr = []

// main('Jack','Jill')

function main(name1 , name2)
{
    str = (name1 + matches + name2)
    strArr = (name1 + matches + name2).split('')

    // console.log(str);

    for (let i = 0; i < strArr.length; i++) {

        // console.log('\n\n');
        // console.log(strArr[i]);
        // console.log(countString(str, strArr[i]));

        dict[strArr[i]] = countString(str, strArr[i]);
        
    }


    // console.log(dict);
    // console.log(matchesNumber(dict));

    // console.log(`${name1} ${matches} ${name2} ${result(matchesNumber(dict))}%`);
    var percent = result(matchesNumber(dict))
    // console.log(percent);

    if( percent >= 80 )
        resultsOutputArr.push(`{"text": "${name1.charAt(0).toUpperCase() + name1.slice(1)} ${matches} ${name2.charAt(0).toUpperCase() + name2.slice(1)} ${percent}%, good match", "percentage": ${percent}}`)
    else
        resultsOutputArr.push(`{"text": "${name1.charAt(0).toUpperCase() + name1.slice(1)} ${matches} ${name2.charAt(0).toUpperCase() + name2.slice(1)} ${percent}%", "percentage": ${percent}}`)
    // console.log(resultsOutputArr);

    dict = {};
}


//***************************************************************
function percentageSort() // Sorts Alphabetically and Percetage as well
{
    resultsOutputArr.sort() // Sort Alphabetically
    resultsOutputArr.sort(function(a, b){ // Sort Percentage
        a = JSON.parse(a)
        b = JSON.parse(b)
        return b.percentage - a.percentage
    });

    for(var i=0;i<resultsOutputArr.length;i++){
        resultsOutput = resultsOutput + `\n${JSON.parse(resultsOutputArr[i]).text}`
        // console.log(resultsOutput);
    }

    // console.log(resultsOutputArr);
}
//***************************************************************




//***************************************************************
function writeToFile(){

    fs.writeFile('output.txt', resultsOutput, function (err) {
        if (err) return console.log(err);
        // console.log('Hello World > helloworld.txt');
    });

    // console.log(resultsOutput);
    resultsOutput = ''

}
//***************************************************************



//***************************************************************
function countString(str, letter) {
    var count = 0;

    // looping through the items
    for (var i = 0; i < str.length; i++) {

        // check if the character is at that position
        if (str.charAt(i) == letter) {
            count += 1;
        }
    }
    return count;
}

//***************************************************************






//***************************************************************

function matchesNumber(dict){ // Gives you the output of the matches
    var matchesNum = ''

    for (var key in dict) {
        matchesNum = matchesNum + dict[key];                
    }
    return matchesNum;
}
//***************************************************************










//***************************************************************

function result(number){ // Gives you the percentage of the two name matches

    var resultArr = ''
    var length = ''
    var middlemost = ''
    var newresult = ''
    
    resultArr = number.toString().split('')

    if(resultArr.length % 2 == 0) {
        length = resultArr.length / 2
        middlemost = ''
    }
    else {
        // console.log("The number is odd.");
        // console.log(resultArr);
        length = (resultArr.length - 1) / 2
        middlemost = resultArr[ ((resultArr.length - 1) / 2) ]

        // console.log(middlemost);
        // delete resultArr[ ((resultArr.length - 1) / 2) ]
        resultArr.splice( ((resultArr.length - 1) / 2), 1 )
    }
    

    for (let i = 0; i < length; i++) {
        
        // console.log(( parseInt(resultArr[i]) + parseInt(resultArr[resultArr.length - i]) ).toString());
        newresult = newresult + ( parseInt(resultArr[i]) + parseInt(resultArr[(resultArr.length - 1) - i]) ).toString()
        
    }



    newresult = newresult + middlemost

    // console.log(newresult);

    resultArr = newresult

    if( parseInt(resultArr) > 100 ){
        // console.log('recursion ' +  parseInt(resultArr) + '\n MiddleMost ' + middlemost);
        return result(parseInt(resultArr))
    }
    else{
        // console.log("Done with " + parseInt(resultArr));
        return parseInt(resultArr);
    }
    
}

//***************************************************************
