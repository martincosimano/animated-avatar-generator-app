document.querySelector('#create').addEventListener('click', apiRequest)

async function apiRequest(){
    const avatarName = document.querySelector('input').value
    try{
        const response = await fetch(`https://api.multiavatar.com/${avatarName}.png?apikey=dr6RpJefscNoOa`)
        const data = await response.url

            document.querySelector('img').src = data
            document.querySelector('#imgLink').href = data
    }catch(error){
        console.log(error)
    }
}

// DELETE FAVORITES

const deleteText = document.querySelectorAll('.fa-trash')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteAvatar)
})

async function deleteAvatar(){
    const aName = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deleteAvatar', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'avatarNameS': aName
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
        
    }catch(err){
        console.log(err)
    }
}

// SUM LIKES

const thumbText = document.querySelectorAll('.fa-thumbs-up')

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

async function addLike(){
    const aName = this.parentNode.childNodes[1].innerText
    const tLikes = Number(this.parentNode.childNodes[3].innerText)
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'avatarNameS': aName,
                'likesS': tLikes
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}