import { useEffect, useState } from "react"

function InstallPrompt(){

const [deferredPrompt,setDeferredPrompt] = useState(null)
const [show,setShow] = useState(false)

useEffect(()=>{

// if app is already installed
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
setShow(false)
}

setDeferredPrompt(null)

}

function close(){
setShow(false)
}

if(!show) return null

return(

<div className="install-popup">

<p>Install Quro App</p>

<div className="install-buttons">
<button onClick={install}>Install</button>
<button onClick={close}>Later</button>
</div>

</div>

)

}

export default InstallPrompt