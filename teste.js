vetor=[];
igual=[];
for(var i = 0; i<700000;i++){
    var hash = Math.random().toString(36).substr(2, 9)
    for( var j =0;j<vetor.length;j++){
      if(hash == vetor[j]){
          console.log("criou igual")
          console.log("Hash original: "+ hash )
          console.log("Hash Comparada: " + vetor[j])
          igual.push(hash,vetor[j])

      }
    }
    vetor.push(hash)
    //console.log(vetor.length)
}
console.log(igual)

