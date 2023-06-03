
let baseUrl = "http://localhost:7080"
let form = document.forms.add
let firstA = document.querySelector('.first-age')
let secondA = document.querySelector('.second-age')
let thirdA = document.querySelector('.third-age')




const getUser = () => {
    fetch(baseUrl + "/user")
    .then(res => res.json())
    .then(data => reload(data))
}

getUser()


   function reload(arr) {
     firstA.innerHTML = ''
     secondA.innerHTML = ''
     thirdA.innerHTML = ''
      
   for(let item of arr) {
    let userB = document.createElement('div')
    let h1Name =  document.createElement('h1')
    let infoB = document.createElement('div')
    let p =  document.createElement('p')
    let span =  document.createElement('span')

    userB.classList.add('user-block')
    infoB.classList.add('info-block')

    h1Name.innerHTML = item.name
    p.innerHTML = 'Age'
    span.innerHTML = item.age


    userB.append(h1Name, infoB)
   infoB.append(p, span)
   if(span.innerHTML <= 25) {
     firstA.append(userB)
   } else if(span.innerHTML <= 50) {
    secondA.append(userB)
   } else {
    thirdA.append(userB)
   }

   
   }

   }


   form.onsubmit = (e) => {
    e.preventDefault();

    let userInfo = {
        id: Math.random()
    }

    let formData = new FormData(form);

    for (let [key, value] of formData.entries()) {
        userInfo[key] = value;
    }

    let json = JSON.stringify(userInfo);


    creatUser(json);

    form.reset()

}

const creatUser = (body) => {
    fetch(baseUrl + "/user", {
        method: "post",
        body: body,
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        if(res.status === 201 || res.status === 200) {
           getUser()
        }
    })
}