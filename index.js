
//Init after Dom loads
document.addEventListener('DOMContentLoaded',init);

//Class
class TypeWriter{
    constructor(textelement,words,wait=400) {
        this.textelement=textelement;
        this.text='';
        this.words=words;
        this.wordIndex = 0;
        this.wait=parseInt(wait,10);
        this.type();
        this.isDeleting=false;   
    }
    type(){
        const currentIndex = this.wordIndex % this.words.length;
    
    //Get the fulltext
    const role=this.words[currentIndex];
    // console.log(role);

    //Check if it is deleting
    if (this.isDeleting) {
        //remove character
        this.text=role.substring(0,this.text.length-1);
    } else {
        //add char
        this.text=role.substring(0,this.text.length+1);
    }
    //Insert text into element
    this.textelement.innerHTML = `<span class="rtext">${this.text}</span>`;
    
    //Type Speed 
    //we are using let here as the variable will be dyanamic
    let typeSpeed = 300;
    if (this.isDeleting) {
        typeSpeed=typeSpeed / 2;
    }
    //check if the word is complete
    if(!this.isDeleting && this.text === role){
        //pause at the end
        typeSpeed=this.wait;
        this.isDeleting=true;
    }
    else if (this.isDeleting && this.text === '') {
        this.isDeleting=false;
        this.wordIndex++;
        typeSpeed=300;
    }
    // console.log("Hello");
    setTimeout(()=> this.type(),typeSpeed)
    }
}
//Init app
function init() {
    const textelement = document.querySelector('.txt-type');
    const words = JSON.parse(textelement.getAttribute('data-words'));
    const wait = textelement.getAttribute('data-waiting-time');
    //Init Typewriter
    new TypeWriter(textelement,words,wait);
}