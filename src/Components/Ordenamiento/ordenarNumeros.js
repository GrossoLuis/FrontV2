export default function ordenarBublee(arr){
    let bandera=true
    while(bandera){
        bandera=false
        let j
        for(let i=0;i<arr.length-1;i++){
            j=i+1
            if(arr[j]<arr[i]){
                [arr[j],arr[i]]=[arr[i],arr[j]]
                bandera=true
            }
        }
    
    }

    return arr
}