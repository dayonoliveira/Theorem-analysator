/*

"(p^~q)&((~p&q))"
(p ^ ~q) & ((~p & q))
p^~q&(~p&q)
p&(q^r)-(p&q)^(p&r)

prompt("Input the new formula:")

*/
let v = "(p^~q)^((~p&q))".split("");
let chars = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
/*26*/">",/*27*/"-",/*28*/"^",/*29*/"&",/*30*/"~","(",")"," "];
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


            throw new Error("Lexic Error: The input is invalid.")
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
    
}

stage1();

stage2();