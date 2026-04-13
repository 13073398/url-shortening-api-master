// get the shorten button and shorten input
const shorten_button=document.getElementById("shorten_btn");
const shorten_input=document.getElementById("shorten_input");
// get the area where the shortened links will be posted
let post_area=document.getElementById("shorten_url") ;

   mohamed=JSON.parse(window.localStorage.getItem("btn_copy_id"))|| [];
// initialize an empty array to store local storage
let local_store_arry=[];
let btn_copied_id=[]


// create a params object with an empty url
let params={
    "url":""
};

// check if there is already local storage
if(window.localStorage.getItem("shorten_url")){
    // parse the local storage and store it in the local_store_arry
    local_store_arry=JSON.parse(window.localStorage.getItem("shorten_url")) || [];
    // loop through the local_store_arry and add each item to the post_area
    for(let i=0;i<local_store_arry.length;i++){
        post_area.innerHTML+=`
        <div class="container-xl" id='${i+1}'>
            <div class="left"><h6>https://www.Frontendmentor.io</h6></div>
            <div class="right">
              <div class="text" ><h6>${local_store_arry[i]}</h6></div>
              <div class="tool" id='${i+1}'><button ' class="btn btn-secondary ms-3 " title="Copy" id='${i+1}' >Copy</button></div>
            </div>
        </div>
    `
    }
   
}

// add an event listener to the shorten button
shorten_button.addEventListener("click",()=>{
    // set the url of the params object to the value of the shorten input
    params.url=shorten_input.value;
    const proxy = "https://corsproxy.io/?";
    // make a POST request to the proxy
    axios.post(proxy+"https://cleanuri.com/api/v1/shorten",params).then((pass)=>{
        // add the shortened link to the local_store_arry
        local_store_arry.push(pass.data.result_url);
        // update the local storage
        window.localStorage.setItem("shorten_url",JSON.stringify(local_store_arry))
        // add the shortened link to the post_area
        post_area.innerHTML+=`
        <div class="container-xl">
            <div class="left"><h6>https://www.Frontendmentor.io</h6></div>
            <div class="right">
              <div class="text" ><h6>${pass.data.result_url}</h6></div>
              <div class="tool"><button class="btn btn-secondary ms-3 " title="Copy">Copy</button></div>
            </div>
        </div>
    `
    location.reload();
    shorten_input.value="";
    
    
}).catch((error)=>{
    // if there is an error, add an error message to the post_area
    post_area.innerHTML+=`
        <div class="container-xl" style="justify-content:center!important;">
            
            <div class="right">
              <div class="text" style="color:red" ><h6>wrong Error</h6></div>
    
            </div>
        </div>
    `;
});
});


// get all the copy buttons
let copy_buttons = document.querySelectorAll(" [title='Copy']");
// loop through the copy buttons and add an event listener to each one
copy_buttons.forEach((ele) => {
    ele.addEventListener("click", (e) => {
        // get the text of the shortened link
        let text = e.currentTarget.parentElement.previousElementSibling.textContent;
        // copy the text to the clipboard
        navigator.clipboard.writeText(text);
        // add a class of 'copied' to the button
        e.currentTarget.classList.add("copied");
        // update the text of the button to 'Copied!'
        e.currentTarget.innerHTML="Copied!";
         e.currentTarget.style.disabled=false;
        // store the id of the copied button in the btn_copied_id array
        e.currentTarget.id=e.currentTarget.parentElement.id;
        btn_copied_id=JSON.parse(window.localStorage.getItem("btn_copy_id"))|| [];
        btn_copied_id.push(e.currentTarget.parentElement.id)    
        window.localStorage.setItem("btn_copy_id", JSON.stringify(btn_copied_id));
    }); 
});

// loop through all the copy buttons and check if their id is in the btn_copied_id array
window.addEventListener("DOMContentLoaded", () => {
  const btn_copy_id = JSON.parse(window.localStorage.getItem("btn_copy_id")) || [];
   document.querySelectorAll(".right .tool .btn").forEach((ele)=>{
        for(let i=0;i<btn_copy_id.length;i++){
           
            if(ele.id===btn_copy_id[i]){
                ele.classList.add("copied");
                ele.innerHTML="copied !"
                
            }   
        }
   })
});

