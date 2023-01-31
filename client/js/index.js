document.getElementById("comment-area").addEventListener("submit", function(event){
    event.preventDefault()
    event.stopPropagation()
    let newComment = document.getElementById("comment-box").value
    let newUser = document.getElementById("username").value
    console.log(newUser)
    if (newUser.length == 0 || newComment.length == 0){
        return false
    } 
    let computerguy = {
        "Username": newUser, 
        "Comment": newComment
    }
    fetch("/postcomment", 
    {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(computerguy)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        let comment = '<li class="list-group-item" id="comment'+data.commentIndex+'"><strong>'+newUser+': </strong><i>'+newComment+'</i></li>'
        document.getElementById("changeSpace").innerHTML += comment
    })
    .catch(err => {
        console.log(err)
    })
})

// eslint-disable-next-line no-unused-vars
function reloadPosts()
{
    fetch("/getstuff")
    .then(res => res.json())
    .then(data => {
        let nComments = data.commentIndex
        delete data.commentIndex;
        for(let i = 1; i <= nComments; i++)
        {
            let commentData = data["comment"+i]
            if(document.body.contains(document.getElementById("comment"+i)))
            {
                continue
            }
            let comment = '<li class="list-group-item" id="comment'+i+'"><strong>'+commentData["Username"]+': </strong><i>'+commentData["Comment"]+'</i></li>'
            document.getElementById("changeSpace").innerHTML += comment
        }
    })
    .catch(err => {
        console.log(err)
        alert("The server is not functioning. Let it reload please")
    })
}