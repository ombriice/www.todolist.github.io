
let lightBtnImg=document.querySelector("[data-img]")
let input=document.querySelector("input")
let form=document.querySelector("form")
let active = document.querySelector(".items")
let footer = document.querySelector(".footer")
let article = document.querySelector(".todoList")
let itemsLeft = document.querySelector(".itemNumber")
let clearCompleted = document.querySelector(".clearall")
let h4 = document.querySelectorAll(".items h4")
let LOCAL_STORAGE_LIST = "tasks.list"
let LOCAL_STORAGE_ID = "taskId.list"
let LOCAL_STORAGE_ACTIVE = "activve.item"
let LOCAL_STORAGE_MODE = {mode : "mode.item",img:"modeimg.item",class:"modeclass.item"}
let lists= JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST)) || []
let activeId = localStorage.getItem(LOCAL_STORAGE_ID) || "1"
let mode = localStorage.getItem(LOCAL_STORAGE_MODE.mode) || "dark.css"
let modeImg = localStorage.getItem(LOCAL_STORAGE_MODE.img) || "/images/icon-sun.svg"
let modeClass = localStorage.getItem(LOCAL_STORAGE_MODE.class) || "moon"


localstr()

function theme(mod,img) {
    mode = `${mod}.css`
    modeImg = `/images/icon-${img}.svg`
    document.querySelector("[data-img]").src=modeImg
    document.querySelector("[data-mode]").href=mode
    document.querySelector('body').classList.add('body') 
}

//change to dark/light mode
lightBtnImg.addEventListener("click",()=>{
    if(lightBtnImg.classList.contains("moon")){
       theme("light","moon")
    }
    else{
      theme("dark","sun")
    }
    setTimeout(() => {
        document.querySelector('body').classList.remove('body')
    }, 800);
    lightBtnImg.classList.toggle("moon")
    modeClass = lightBtnImg.className
    save()
})

class listObject {
    constructor(value){
        this.content=`<div>
        <span class="circle" data-id='check'></span>
        <p>${value}</p> 
        <span class="delete flex"><img src="/images/icon-cross.svg" alt="" data-id='delete'></span>
        </div>`
        this.complete=false
        this.id= new Date().getTime().toString()
    }
}

form.addEventListener('submit',e => {
    e.preventDefault()
    let inputValue=input.value
    if(inputValue){
    let item = new listObject(inputValue)
    lists.push(item)
    input.value=null
    anonymous()
    }
})


//trash button/check button

article.addEventListener('click',e=>{
    let checkElementId
    let removedElementId
    let element = e.target
    if(element.dataset.id==='delete'){
        removedElementId = element.parentElement.parentElement.parentElement.dataset.idList
        let idx = lists.indexOf(lists.find(item=> item.id===removedElementId))
        lists.splice(idx,1)
        document.querySelectorAll('.listStyle')[idx].classList.add('deleteAnimation')
        setTimeout(() => {
            anonymous()
        }, 300);
        
    }
     if(element.dataset.id==='check'){
        checkElementId = element.parentElement.parentElement.dataset.idList
        let idx = lists.indexOf(lists.filter(item=> item.id===checkElementId)[0])
        lists[idx].complete ? lists[idx].complete=false : lists[idx].complete=true
        anonymous()
    }

})

// clear completed 

clearCompleted.addEventListener('click',e=>{
    lists = notCompletedElements()
    anonymous()
})

//active items

active.addEventListener('click',e=>{
    activeId=e.target.dataset.id
    if(activeId==='1'){
        activeItem(e.target)
    }
    else if(activeId==='2'){
        activeItem(e.target)
    }
    else{
        activeItem(e.target) 
    }

})

// functions 

function activeItem(element){
    activeColor()
    element.classList.add('blue')
    activeClass()
}
function activeClass(){
    article.classList.add('activeChange')
    setTimeout(() => {
        article.classList.remove('activeChange')
        anonymous()
    }, 200);
}

function activeColor(){
    document.querySelectorAll('.items h4').forEach(e=>{
        e.classList.remove('blue')
    })
}

function CompletedElementClass(arr){
    arr.forEach((e,i)=>{
        if(e.complete){
            document.querySelectorAll('.listStyle p')[i].classList.toggle('checkpar')
            document.querySelectorAll('.listStyle .circle')[i].classList.toggle('check')
    }
})
}

function itemsCount(arr,type){
    let counter = arr.length
    let t = counter>1 ? `${type}s` : `${type}`
    itemsLeft.innerHTML=`${counter} ${t}`

}

function render(arr){
clearElements()
arr.forEach(e=>{
let listArticle = document.createElement('article')
listArticle.classList.add('listStyle')
article.append(listArticle)
listArticle.innerHTML=e.content
listArticle.dataset.idList=e.id
})
if(lists.length===0){
    setTimeout(() => {
        footer.classList.add('hide')
        active.classList.add('hide')
    }, 200)
    activeId='1'
    activeItem(h4[0])
}
else{
    footer.classList.remove('hide')
    active.classList.remove('hide')
}
CompletedElementClass(arr)
}

function clearElements(){
    while(article.firstChild){
        article.firstChild.remove()
    }
}

function completedElements(){
    return lists.filter(e=>e.complete===true)
}

function notCompletedElements(){
    return lists.filter(e=>e.complete===false)
}

function anonymous(){
    if(activeId==='2'){
        render(notCompletedElements())
        itemsCount(notCompletedElements(),'active item')
    }
    else if(activeId==='3'){
        render(completedElements())
        itemsCount(completedElements(),'completed item')
    }
    else{
        render(lists)
        itemsCount(notCompletedElements(),'item left')
    }
    save()
}



function lightDark() {
    document.querySelector("[data-img]").src=modeImg
    document.querySelector("[data-mode]").href=mode  
    document.querySelector("[data-img]").className=modeClass
}
//saving to localstorage
function save() {
    localStorage.setItem(LOCAL_STORAGE_LIST,JSON.stringify(lists))
    localStorage.setItem(LOCAL_STORAGE_ID,activeId)
    localStorage.setItem(LOCAL_STORAGE_MODE.mode,mode)
    localStorage.setItem(LOCAL_STORAGE_MODE.img,modeImg)
    localStorage.setItem(LOCAL_STORAGE_MODE.class,modeClass)
}

function localstr() {
    lightDark()
    anonymous()
    activeItem(h4[parseInt(activeId)-1]) 
}