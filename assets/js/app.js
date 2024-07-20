const cl = console.log;

const cardContainer = document.getElementById("cardContainer")
const postforms =document.getElementById("postform");
const titleControl =document.getElementById("title");
const contentControl =document.getElementById("content");
const submitBn = document.getElementById("submitBn");



let postArr =[]

const generateUuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;

        return value.toString(16);
    });
};

const onPostAdd =(eve)=>{
    eve.preventDefault();
    let newPost ={
        title:titleControl.value,
        content:contentControl.value,
        postId: generateUuid()
    }
    cl(newPost )
    postforms.reset()
    createPost(newPost)
    .then((res)=>{
        cl(res)
        return fetchAllBlogs()
    })
    .then((res)=>{
        cl(res)
        return createBlogCard(res)
    })
    .catch(err =>{
       
        Swal.fire({
            title:err,
            timer:2500,
            icon:`error`
        })
    })
    }
    

const createBlogCard =(arr)=>{

    if(arr.length == 0){
        alert(`plz provide valid DATA`)
    }

    let result =``;
    arr.forEach(ele=>{
        result+=`
            <div class ="col-md-4 mb-4">
                <div class ="card">
                    <div class ="card-header">
                        <h2 class ="m-0">${ele.title}</h2>
                    </div>
                    <div class ="card-body">
                        <p class ="m-0">
                            ${ele.content}
                        </p>
                    </div>
                    <div class ="card-footer">
                        <button class="btn btn-sm btn-outline-info">Edit</button>
                        <button class="btn btn-sm btn-outline-danger">Remove</button>
                    </div>
                </div>
            </div>         
        `
    });
    cardContainer.innerHTML = result;
}


let createPost =(newPost)=>{

    return new Promise ((resolve, reject)=>{
        setTimeout(()=>{
           let error = Math.random() >= .5?false:true;
           if(!error){
                postArr.push(newPost);
                resolve(`New blog is created successfully`)
           }else{
                reject(`Something went wrong while creating new blog!!!!`)
           }
        }, 2500);
    })
    
}


const fetchAllBlogs =()=>{
    
    return new Promise ((resolve, reject)=>{
        
        setTimeout(()=>{
            let error = Math.random() >= .5 ? false:true;
            if(!error){
                    resolve(postArr)
               }else{
                    reject(`Something went wrong while fetching new blog!!!!`)
               }
        }, 1500);
    })
}





postforms.addEventListener("submit", onPostAdd)
