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
const button = document.createElement('button')
button.classList ="btn"
button.innerText= item.category
 categoryContainer.append(button)

});

}





// create videos

const loadVideos = () =>{

    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(response => response.json())
    .then(data => displayCategoriesVideos(data.videos))
    .catch(error => console.log(error))
    
    }
    

    const displayCategoriesVideos = (videos) =>{

        const categoryContainerVideos = document.getElementById("videos")
        
        videos.forEach(video => {
            console.log(video)
        
            const card = document.createElement("div")
            card.classList= "card card-compact"
            card.innerHTML = `
            
            <figure class="relative ">
    <img class="w-full h-[200px] object-cover"
      src="${video.thumbnail}"
      alt="" />
      <span class="absolute right-2 bottom-2 text-white bg-text p-1 rounded-sm">${video.others.
        posted_date
        }</span>
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

 <p class="text-gray text-xs">${video.others.views}   views</p>

    </div>

  </div>
                 
            `

            categoryContainerVideos.append(card)


        });
        
        }


loadCategories()

loadVideos()
