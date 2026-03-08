import { useEffect, useState } from "react"

function InstallPrompt(){

const [deferredPrompt,setDeferredPrompt] = useState(null)

useEffect(()=>{

const handler = (e)=>{
e.preventDefault()
setDeferredPrompt(e)
}

window.addEventListener("beforeinstallprompt",handler)

return ()=>{
window.removeEventListener("beforeinstallprompt",handler)
}

},[])

async function install(){

if(!deferredPrompt) {
alert("Use browser menu → Install App")
return
}

deferredPrompt.prompt()

await deferredPrompt.userChoice

setDeferredPrompt(null)

}

return(

<div className="install-popup">

<p>Install Quro App</p>

<button onClick={install}>
Install
</button>

</div>

)

}

export default InstallPrompt