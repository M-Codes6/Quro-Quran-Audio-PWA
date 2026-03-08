import { useEffect, useState } from "react"

function InstallPrompt(){

const [deferredPrompt,setDeferredPrompt] = useState(null)
const [show,setShow] = useState(false)

useEffect(()=>{

if (window.matchMedia('(display-mode: standalone)').matches) {
  return
}

const handler = (e)=>{
e.preventDefault()
setDeferredPrompt(e)
setShow(true)
}

window.addEventListener("beforeinstallprompt",handler)

return ()=>{
window.removeEventListener("beforeinstallprompt",handler)
}

},[])

async function install(){

if(!deferredPrompt) return

deferredPrompt.prompt()

const { outcome } = await deferredPrompt.userChoice

if(outcome === "accepted"){
console.log("App installed")
}

setDeferredPrompt(null)
setShow(false)

}

function close(){
setShow(false)
}

if(!show) return null

return(

<div className="install-popup">

<p>Install Quro App</p>

<div>

<button onClick={install}>Install</button>
<button onClick={close}>Later</button>

</div>

</div>

)

}

export default InstallPrompt