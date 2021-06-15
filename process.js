/*

"(p^~q)&((~p&q))"
"(p^~t)-~p&r"
(p ^ ~q) & ((~p & q))
p^~q&(~p&q)
p&(q^r)-(p&q)^(p&r)

prompt("Input the new formula:")

*/
let v = "(~p^t)>(t>p&~r)".split("");
let chars = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
/*26*/"~",/*27*/"-",/*28*/"^",/*29*/"&",/*30*/">","(",")"," "];
let aux = ""

for(let i = 0; i < v.length; i++){
    aux += v[i];
}

document.getElementById("formula").innerHTML = "Fórmula: " + aux;


console.log(v);

function stage1() {

    let spaceIndex = 0;

    for (let i = 0; i < v.length; i++) {
        if (chars.indexOf(v[i]) < 0) {
            
            document.getElementById("stageOneTitle").innerHTML = "Etapa I - Falhou";

            document.getElementById("resultOne").innerHTML = "Lexic Error: The input is invalid.";


            throw new Error("Lexic Error: The input is invalid.");
        }
    }

    while(spaceIndex != -1){
        spaceIndex = v.indexOf(" ");

        if(spaceIndex != -1){
            v.splice(spaceIndex, 1);
        }
    }
    document.getElementById("stageOneTitle").innerHTML = "Etapa I - Concluída";
}

function stage2() {

    if (v[0] == chars[26] || v[0] == chars[27] || v[0] == chars[28] || v[0] == chars[29]){
        
        document.getElementById("stageTwoTitle").innerHTML = "Etapa II - Falhou";
        
        document.getElementById("resultTwo").innerHTML = "Syntax Error: The input is invalid.";
        
        console.log("Syntax error: The input is invalid.");
    }
    if (v[v.length-1] == chars[26] || v[v.length-1] == chars[27] || v[v.length-1] == chars[28] || v[v.length-1] == chars[29] || v[v.length-1] == chars[30]) {
        document.getElementById("stageTwoTitle").innerHTML = "Etapa II - Falhou";
        
        document.getElementById("resultTwo").innerHTML = "Syntax Error: The input is invalid.";
        
        console.log("Syntax error: The input is invalid.");
    }

    parenthesesTester()

    function parenthesesTester(){
        let openedParentheses = 0;
        let closedParentheses = 0;

        for(let i = 0; i < v.length; i++){
            if(v[i] == "("){
                openedParentheses++
            }else if(v[i] == ")"){
                closedParentheses++
            }
        }

        if(openedParentheses != closedParentheses){
            
            document.getElementById("stageTwoTitle").innerHTML = "Etapa II - Falhou";
            
            document.getElementById("results").innerHTML = "Syntax error: The parentheses is not completed.";

            throw new Error("Syntax error: The parentheses is not completed.");
        }

        for(let i = 0; i < v.length; i++){
            if(v[i] == "(" && v[i + 1] == "("){
                v.splice(i, 1);
                for(let j = i; j < v.length; j++){
                    if(v[j] == ")"){
                        v.splice(j, 1);
                        j = v.length;
                        i -= 1
                    }
                }
            }
        }

        for(let i = 0; i < v.length; i++){
            if(v[i] == "("){
                
                console.log(v);
                if((v[i - 1] == "&" || v[i - 1] == "^") && (v[i + 1] == "~")){

                    if(v[i + 3] == "&" || v[i + 3] == "^"){
                        console.log("Necessary parenthesis.");
                    }else{
                        document.getElementById("resultTwo").innerHTML = "Syntax warning: The parentheses is not necessary.";
                        console.log("Syntax warning: The parentheses is not necessary.");
                        console.log(v);
                        v.splice(i, 1);

                        for(let j = i; j < v.length; j++){
                            if(v[j] == ")"){
                                v.splice(j, 1);
                                j = v.length;
                                
                            }
                        }
                    }

                    
                }else if((v[i - 1] == "&" || v[i - 1] == "^")){
                    
                    
                    if(v[i + 2] == "&" || v[i + 2] == "^"){
                        console.log("Necessary parenthesis.");
                    }else{
                        document.getElementById("resultTwo").innerHTML = "Syntax warning: The parentheses is not necessary.";
                        console.log("Syntax warning: The parentheses is not necessary.");
                        console.log(v);
                        v.splice(i, 1);

                        for(let j = i; j < v.length; j++){
                            if(v[j] == ")"){
                                v.splice(j, 1);
                                j = v.length;
                                
                            }
                        }
                    }
                }else if(v[i - 1] == "-" || v[i - 1] == ">" || v[i - 1] == "~"){
                    
                    let aux = "";
                    
                    document.getElementById("resultTwo").innerHTML = "Syntax warning: The parentheses is not necessary.";
                    
                    for(let i = 0; i < v.length; i++){
                        aux += v[i];
                    }

                    document.getElementById("oldFormula").innerHTML = "Old formula: " + aux;
                    
                    console.log("Syntax warning: The parentheses is not necessary.");
                    console.log(v);
                    v.splice(i, 1);
                    
                    for(let j = i; j < v.length; j++){
                        if(v[j] == ")"){
                            v.splice(j, 1);
                            j = v.length;
                            
                        }
                    }

                    aux = "";

                    for(let i = 0; i < v.length; i++){
                        aux += v[i];
                    }
                    
                    document.getElementById("newFormula").innerHTML = "New formula: " + aux;
                }
            }
        }
        console.log(v);
    }

    document.getElementById("stageTwoTitle").innerHTML = "Etapa II - Concluída";
}

function stage3(){
    let letterCount = 0;
    let lines = 0;
    let columns = 0;
    let table;
    let results = [];
    let lettersPosition = []

    function test(){}

    for(let i = 0; i < 24; i++){
        if(v.indexOf(chars[i]) > 0){
            lettersPosition.unshift(chars[i]);
            letterCount++;
        }
    }

    lines = Math.pow(2,letterCount);
    columns = letterCount;

    console.log(lines);
    console.log(columns);
    console.log(lettersPosition);

    table = truthTableGenerator(lines, columns);


    function truthTableGenerator(lines, columns){

        let table = [];
        let counter = 2;

        for(let i = 0; i < columns; i++){
            table[i] = [];

            if(i != 0){
                for(let j = 0; j < lines; j+=counter){
                    for(let w = 0; w < counter; w++){
                        if(table[i][j - 1] == true){
                            table[i].push(false);
                        }else if(table[i][j - 1] == false){
                            table[i].push(true);
                        }else if(table[i][j - 1] == undefined){
                            table[i].push(true);
                        }
                    }
                }
                counter *= 2;
            }else{
                for(let j = 0; j < lines; j++){
                    if(j % 2 == 0){
                        table[i][j] = true;
                    }else{
                        table[i][j] = false;
                    }
                }
            }

            
        }
        return table;
    }

    console.log(table);
    console.log(v);

    formulaResolver();

    function formulaResolver(){
        let letterIndex = [];
        let operationIndexes = [];
        let firstsOperations = 0
        let result = [];
        let usedLetters = [];

        for(let i = 0; i < v.length; i++){
            for(let j = 0; j < 26; j++){
                if(v[i] == chars[j]){
                    letterIndex.push(i);
                }
            }
        }
    
        letterIndex = letterIndex.sort((a, b) => a - b);

        for(let i = v.length - 1; i > 0; i--){
            for(let j = 26; j <= 30; j++){
                if(v[i] == chars[j] && v[i] != "~" && (v[i - 1] != ")" || v[i + 1] != "(")){
                    if(v[i] != chars[27] && v[i] != chars[30]){
                        operationIndexes.unshift(i);
                        firstsOperations++;
                    }else{
                        operationIndexes.push(i);
                    }
                }else if(v[i] == chars[j] && v[i] != "~" && (v[i - 1] == ")" || v[i + 1] == "(")){
                    operationIndexes.push(i);
                }
            }
        }

        console.log(letterIndex);
        console.log(operationIndexes);

        for(let i = 0; i < firstsOperations; i++){
            if(v[operationIndexes[i]] == chars[28]){
                let letter1;
                let letter2;

                if(v[operationIndexes[i] + 1] == "~" && v[operationIndexes[i] - 2] == "~"){
                    letter1 = v[operationIndexes[i] - 2] + v[operationIndexes[i] - 1];
                    letter2 = v[operationIndexes[i] + 1] + v[operationIndexes[i] + 2];

                    usedLetters.push(operationIndexes[i] - 1);
                    usedLetters.push(operationIndexes[i] + 2);

                }else if(v[operationIndexes[i] + 1] != "~" && v[operationIndexes[i] - 2] == "~"){
                    letter1 = v[operationIndexes[i] - 2] + v[operationIndexes[i] - 1];
                    letter2 = v[operationIndexes[i] + 1];

                    usedLetters.push(operationIndexes[i] - 1);
                    usedLetters.push(operationIndexes[i] + 1);

                }else if(v[operationIndexes[i] + 1] == "~" && v[operationIndexes[i] - 2] != "~"){
                    letter1 = v[operationIndexes[i] - 1];
                    letter2 = v[operationIndexes[i] + 1] + v[operationIndexes[i] + 2];

                    usedLetters.push(operationIndexes[i] - 1);
                    usedLetters.push(operationIndexes[i] + 2);

                }else if(v[operationIndexes[i] + 1] != "~" && v[operationIndexes[i] - 2] != "~"){
                    letter1 = v[operationIndexes[i] - 1];
                    letter2 = v[operationIndexes[i] + 1];

                    usedLetters.push(operationIndexes[i] - 1);
                    usedLetters.push(operationIndexes[i] + 1);

                }

                result = orTest1(table, lines, lettersPosition, letter1, letter2);



                console.log(letter1);
                console.log(letter2);
                console.log(result);

            }else if(v[operationIndexes[i]] == chars[29]){
                let letter1;
                let letter2;

                if(v[operationIndexes[i] + 1] == "~" && v[operationIndexes[i] - 2] == "~"){
                    letter1 = v[operationIndexes[i] - 2] + v[operationIndexes[i] - 1];
                    letter2 = v[operationIndexes[i] + 1] + v[operationIndexes[i] + 2];

                    usedLetters.push(operationIndexes[i] - 1);
                    usedLetters.push(operationIndexes[i] + 2);
                }else if(v[operationIndexes[i] + 1] != "~" && v[operationIndexes[i] - 2] == "~"){
                    letter1 = v[operationIndexes[i] - 2] + v[operationIndexes[i] - 1];
                    letter2 = v[operationIndexes[i] + 1];

                    usedLetters.push(operationIndexes[i] - 1);
                    usedLetters.push(operationIndexes[i] + 1);
                }else if(v[operationIndexes[i] + 1] == "~" && v[operationIndexes[i] - 2] != "~"){
                    letter1 = v[operationIndexes[i] - 1];
                    letter2 = v[operationIndexes[i] + 1] + v[operationIndexes[i] + 2];

                    usedLetters.push(operationIndexes[i] - 1);
                    usedLetters.push(operationIndexes[i] + 2);
                }else if(v[operationIndexes[i] + 1] != "~" && v[operationIndexes[i] - 2] != "~"){
                    letter1 = v[operationIndexes[i] - 1];
                    letter2 = v[operationIndexes[i] + 1];

                    usedLetters.push(operationIndexes[i] - 1);
                    usedLetters.push(operationIndexes[i] + 1);
                }

                result = andTest1(table, lines, lettersPosition, letter1, letter2);

                console.log(letter1);
                console.log(letter2);
                console.log(result);
            }
            //table.unshift(result);
            results.unshift(result);
        }

        for(let i = 0; i < firstsOperations; i++){
            operationIndexes.shift();
        }

        for(let i = 0; i < usedLetters.length; i++){
            for(let j = 0; j < letterIndex.length; j++){
                if(usedLetters[i] == letterIndex[j]){
                    letterIndex.splice(j, 1);
                }
            } 
        }

        console.log(letterIndex);
        console.log(table);
        console.log(results);
        console.log(operationIndexes);

        let counter = 0;

        for(let i = 0; i < operationIndexes.length; i++){
            if(v[operationIndexes[i]] == chars[27]){
                result = ifOnlyIfTest(results, lines);
            }else if(v[operationIndexes[i]] == chars[30]){
                if(letterIndex.length == 0){
                    result = ifTest(results, lines);
                    results.unshift(result);
                }else{
                    results.unshift([]);
                    if(v[letterIndex[counter] - 1] == "~"){
                        for(let j = 0; j < lines; j++){
                            if(!(table[lettersPosition.indexOf(v[letterIndex[counter]])][j]) == true && results[results.length - (counter + 1)][j] == true){
                                results[counter][j] = true;
                            }else if(!(table[lettersPosition.indexOf(v[letterIndex[counter]])][j]) == true && results[results.length - (counter + 1)][j] == false){
                                results[counter][j] = false;
                            }else if(!(table[lettersPosition.indexOf(v[letterIndex[counter]])][j]) == false && results[results.length - (counter + 1)][j] == true){
                                results[counter][j] = true;
                            }else if(!(table[lettersPosition.indexOf(v[letterIndex[counter]])][j]) == false && results[results.length - (counter + 1)][j] == false){
                                results[counter][j] = true;
                            }
                        }
                    }else{
                        for(let j = 0; j < lines; j++){
                            if(table[lettersPosition.indexOf(v[letterIndex[counter]])][j] == true && results[results.length - (counter + 1)][j] == true){
                                results[counter][j] = true;
                            }else if(table[lettersPosition.indexOf(v[letterIndex[counter]])][j] == true && results[results.length - (counter + 1)][j] == false){
                                results[counter][j] = false;
                            }else if(table[lettersPosition.indexOf(v[letterIndex[counter]])][j] == false && results[results.length - (counter + 1)][j] == true){
                                results[counter][j] = true;
                            }else if(table[lettersPosition.indexOf(v[letterIndex[counter]])][j] == false && results[results.length - (counter + 1)][j] == false){
                                results[counter][j] = true;
                            }
                        }
                    }
                    counter++;
                    letterIndex.shift();
                    
                    //result = ifTest2(results, lines, results.length - counter, letterTester(letterIndex[counter]));
                }
            }else if(v[operationIndexes[i]] == chars[28]){
                result = orTest2(results, lines);
            }else if(v[operationIndexes[i]] == chars[29]){
                result = andTest2(results, lines);
            }
            
        }

        console.log(results);
    }

    function letterTester(position, value){
        let newValue = value;

        if(v[position - 1] == "~"){
            newValue = !newValue;
        }
        return newValue;
    }

    function orTest1(table, tableLength, letters, letter1, letter2){
        let result = []
        for(let i = 0; i < tableLength; i++){
            if(letter1[0] == "~" && letter2[0] == "~"){
                result.push(!(table[letters.indexOf(letter1[1])][i]) || !(table[letters.indexOf(letter2[1])][i]));
            }else if(letter1[0] != "~" && letter2[0] == "~"){
                result.push(table[letters.indexOf(letter1)][i] || !(table[letters.indexOf(letter2[1])][i]));
            }else if(letter1[0] == "~" && letter2[0] != "~"){
                result.push(!(table[letters.indexOf(letter1[1])][i]) || table[letters.indexOf(letter2)][i]);
            }else if(letter1[0] != "~" && letter2[0] != "~"){
                result.push(table[letters.indexOf(letter1)][i] || table[letters.indexOf(letter2)][i]);
            }
            
        }
        return result;
    }

    function orTest2(table, tableLength){
        let result = []
        for(let j = 0; j < tableLength; j++){
            result.push(table[1][j] || table[0][j]);
        }
        return result;
    }

    function andTest1(table, tableLength, letters, letter1, letter2){
        let result = []
        for(let i = 0; i < tableLength; i++){
            if(letter1[0] == "~" && letter2[0] == "~"){
                result.push(!(table[letters.indexOf(letter1[1])][i]) && !(table[letters.indexOf(letter2[1])][i]));
            }else if(letter1[0] != "~" && letter2[0] == "~"){
                result.push(table[letters.indexOf(letter1)][i] && !(table[letters.indexOf(letter2[1])][i]));
            }else if(letter1[0] == "~" && letter2[0] != "~"){
                result.push(!(table[letters.indexOf(letter1[1])][i]) && table[letters.indexOf(letter2)][i]);
            }else if(letter1[0] != "~" && letter2[0] != "~"){
                result.push(table[letters.indexOf(letter1)][i] && table[letters.indexOf(letter2)][i]);
            }
            
        }
        return result;
    }

    function andTest2(table, tableLength){
        let result = []
        for(let j = 0; j < tableLength; j++){
            result.push(table[1][j] && table[0][j]);
        }
        return result;
    }

    function ifTest(table, tableLength){
        let result = [];

        for(let i = 0; i < tableLength; i++){
            if(table[1][i] == true && table[0][i] == true){
                result.push(true);
            }else if(table[1][i] == true && table[0][i] == false){
                result.push(false);
            }else if(table[1][i] == false && table[0][i] == true){
                result.push(true);
            }else if(table[1][i] == false && table[0][i] == false){
                result.push(true);
            }
        }
        return result;
    }

    function ifOnlyIfTest(table, tableLength){
        let result = [];

        for(let i = 0; i < tableLength; i++){
            if(table[1][i] == true && table[0][i] == true){
                result.push(true);
            }else if(table[1][i] == true && table[0][i] == false){
                result.push(false);
            }else if(table[1][i] == false && table[0][i] == true){
                result.push(false);
            }else if(table[1][i] == false && table[0][i] == false){
                result.push(true);
            }
        }
        return result;
    }
}

stage1();

stage2();

stage3();