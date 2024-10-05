// fetch, load and show categories on html

const loadCategories = () =>{

  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
  .then(response => response.json())
  .then(data => displayCategories(data.categories))
  .catch(error => console.log(error))
  
  }
  
  
  // display categories
  
  const displayCategories = (categories) =>{
  
  const categoryContainer = document.getElementById("categories")
  
  categories.forEach(item => {
      console.log(item)
  
      // create a btn
  const buttonContainer = document.createElement('div')
  buttonContainer.innerHTML= 
  `
  <button id="btn-${item.category_id}" onclick="loadCategoriesVideos(${item.category_id})" class="btn category-btn">
  ${item.category}
  </button>
  
  `;
  
   categoryContainer.append(buttonContainer)
  
  });
  
  }
  
  
  
  
  
  // create videos
  
  const loadVideos = (searchText ="") => {
  
      fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
      .then(response => response.json())
      .then(data => displayCategoriesVideos(data.videos))
      .catch(error => console.log(error))
      
      }
       const loadCategoriesVideos  =(id)=>{
        // alert(id)
  
        fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(response => response.json())
        .then((data) =>{
// remove active class from every btn
removeActiveClass();

// active the btn
          const activeBtn = document.getElementById(`btn-${id}`);
activeBtn.classList.add('active');
// activeBtn.style.backgroundColor ="red";
// activeBtn.style.color ="white";

          // console.log(activeBtn)

          displayCategoriesVideos(data.category)

        })
        .catch(error => console.log(error));
      
       };
  
       const loadDetails= async(videoId) =>{
console.log(videoId)

const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`)
const data = await res.json()
displayDetails(data.video)

       }
  
       const displayDetails =(video) =>{
console.log(video)
const detailContainer = document.getElementById("modal-content")

document.getElementById("showModalData").click();

detailContainer.innerHTML = `

<img src=${video.thumbnail} />
<p class="mt-2">${video.description}</p>


`

       }
  
      const displayCategoriesVideos = (videos) =>{
  
          const categoryContainerVideos = document.getElementById("videos")
          
          categoryContainerVideos.innerHTML=""
  
  if(videos.length ==0){
    categoryContainerVideos.classList.remove("grid")
    categoryContainerVideos.innerHTML = `<div class="min-h-[300px] flex flex-col mt-5 justify-center items-center gap-5"><img class="mb-3" src="./Icon.png" alt="">
    <p class="text-3xl text-black text-extrabold ">NO CONTENT HERE</p>
    </div>`;
  
  return;
  }
  
  else{
    categoryContainerVideos.classList.add("grid")
  
  }
  
          videos.forEach(video => {
              // console.log(video)
          
              const card = document.createElement("div")
              card.classList= "card card-compact"
              card.innerHTML = `
              
              <figure class="relative ">
      <img class="w-full h-[200px] object-cover"
        src="${video.thumbnail}"
        alt="" />
  
        ${video.others.posted_date?.length == 0 ? "" : `<span class="absolute right-2 bottom-2 text-xs text-white bg-text p-1 rounded-sm">
        ${getTimeString(video.others.posted_date)
          }</span>` }
  
        
    </figure >
    <div class="px-0 py-2 flex gap-2">
      <div> 
  <img class="w-10 h-10 rounded-xl object-cover" src="${video.authors[0].profile_picture
  }" alt="">
      </div>
   <div> 
   <h2 class="font-bold text-text text-xl">${video.title}</h2>
  <div class="flex gap-3"> <p class="text-gray text-sm">${video.authors[0].profile_name}</p>
  
  ${video.authors[0].verified == true ? `<img class="w-5 h-5 " src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png">
  ` : ""}
  
  </div>
  
<div class="flex gap-3 mt-3 items-center">   <p class="text-gray text-xs">${video.others.views}   views</p>
<button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">Details</button>

</div>  
      </div>
  
    </div>
                   
              `
  
              categoryContainerVideos.append(card)
  
  
          });
          
          }
        
  
  
  loadCategories()
  
  // convert time
  
  function getTimeString(time){
  
    const hour = parseInt(time/3600)
    let second = time%3600
    const min = parseInt(second/60)
    second = second%60
    return `${hour} hours ${min} minutes ${second} seconds ago`
  }
  
  const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-btn")
// console.log(buttons)
for(let btn of buttons){
  btn.classList.remove("active")
}


  }

  document.getElementById("search-input").addEventListener("keyup", (e)=>{
loadVideos(e.target.value)
  })
  loadVideos()
