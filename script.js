const userInput=document.getElementById("search-input");
const form=document.querySelector("form")
const searchBtn=document.getElementById("search-button");
const creatureName=document.getElementById("creature-name");
const creatureId=document.getElementById("creature-id");
const weight=document.getElementById("weight");
const height=document.getElementById("height");
const types=document.getElementById("types");

const hp=document.getElementById("hp");
const attack=document.getElementById("attack");
const defense=document.getElementById("defense");
const specialAttack=document.getElementById("special-attack");
const specialDefense=document.getElementById("special-defense");
const speed=document.getElementById("speed");

//display the creature 
const displayCreature=data=>{
  
  const {name, id, weight:w, height:h, types:typesList, stats}=data;

//display basic info
  creatureName.textContent=name;
  creatureId.textContent=`#${id}`;
  weight.textContent=`Weight: ${w}`;
  height.textContent=`Height: ${h}`;

  types.innerHTML="Types:";
  typesList.forEach(t =>{
    const typeEl = document.createElement("div");
    typeEl.innerHTML+=`<br><span> ${t.name.toUpperCase()} </span>`;
    types.appendChild(typeEl);
  })
  
  //types.innerHTML=`Types: <span>${ typesList.map(t =>t.name).join(`<span class="space"></span>`) }</span>`;


//display stats
  const getStat=(statName)=>{
    const statObj=stats.find(s=>s.name===statName);
    return statObj ? statObj.base_stat : "N/A";
  }

  
  hp.textContent=getStat("hp");
  attack.textContent=getStat("attack");
  defense.textContent=getStat("defense");
  specialAttack.textContent=getStat("special-attack");
  specialDefense.textContent=getStat("special-defense");
  speed.textContent=getStat("speed");

}




const fetchCreature= async (query)=>{
  try{
    const res= await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${query}`);
    if(!res.ok)throw new Error("Creature not found")
    const data=await res.json();
    displayCreature(data)

  }
  catch(error){
    alert(error.message)
  }
};



/*searchBtn.addEventListener("click", ()=>{
fetchCreature(userInput.value)
});*/


form.addEventListener("submit", (e)=>{
  e.preventDefault()//stops reload
fetchCreature(userInput.value.toLowerCase().trim());
userInput.value="";
})