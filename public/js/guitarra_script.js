const botonTabChico = document.querySelector(".botonTabChico");
const botonTabGrande = document.querySelector(".botonTabGrande");

function resolveF (){
    return new Promise(resolve => {
        setTimeout(() => {
          resolve('resolved');
        }, 2000);
    });
}

async function funcionEscala(){
    const result = await resolveF ();
    console.log (result);
    let VexDiv = document.querySelector(".vex-tabdiv");
    if (VexDiv){
        var EscalaActual = JSON.parse(localStorage.getItem("VEXTABscale"));
        
        if (EscalaActual === null){
            EscalaActual = VexDiv.getAttribute("scale");
            console.log(EscalaActual);
            console.log(VexDiv);
            VexDiv.setAttribute("scale",EscalaActual);
        }
        else
            VexDiv.setAttribute("scale",EscalaActual);

        botonTabChico.onclick = function(){
            EscalaActual = EscalaActual - 0.1
            //VexDiv.setAttribute("scale","0.1");
            localStorage.setItem("VEXTABscale",JSON.stringify("0.1"));
            console.log("menos");
            console.log(EscalaActual);
        }
        botonTabGrande.onclick = function(){
            console.log("mas");
            VexDiv.setAttribute("scale","1.0");
            localStorage.setItem("VEXTABscale",JSON.stringify("1.0"));
            console.log(VexDiv);
        }
    }
}

funcionEscala();




