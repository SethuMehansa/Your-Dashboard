let tasks=[];
let importanttasks=[];
let print;
let printimp;
let workedcount=0;
let breakcount=0;

function save(){
 let subject=document.getElementById("subject").value;
let time=document.getElementById("time").value;
let day=document.getElementById("day").value;
    let task=[{
        subjectname:subject,
        timegiven:time,
        dategiven:day
    }]
   
    tasks.push(task);
    console.log(tasks);
    console.log(subject);
    
    
     print=`
    <tr>
   <td></td>
   </tr> `
    task.forEach(element=>{
        localStorage.setItem("subjectname",subject);
        localStorage.setItem("timegiven",time);
        localStorage.setItem("dategiven",day);
        print=`
        <div class="card" style="width: 40rem;border-radius: 10px;margin: 20px;" data-aos="fade-right" >
          <div class="card-body">
            <h5 class="tabledata">${element.subjectname}</h5>
            <h5 class="tabledata">${element.timegiven}</h5>
            <h5 class="tabledata">${element.dategiven}</h5>
             <div class="checkbox-wrapper-2">
  <input type="checkbox" id="check">
</div>
          </div>
        </div>
`
    })
    document.getElementById("printtasks").innerHTML+=print
    checked();    
}

function checked(){
    console.log(document.getElementById("check").checked);
    document.getElementById("check").addEventListener("change",function(){
    if(this.checked){
        workedcount=workedcount+1;
        localStorage.setItem("status","checked");
        console.log("Checked");
        console.log(workedcount);  
    }else{
        breakcount=breakcount+1;
        localStorage.setItem("status","unchecked");
        console.log("unChecked");
        console.log(breakcount);
        
    }})
    
}

    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ["Work","Breaks"],
        datasets: [{
          label: "Progress",
          data: [60,40],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });


function addTask(){
    let title=document.getElementById("tasktitle").value;
   let desc=document.getElementById("description").value;
   
       let imptask=[{
           tasktitle:title,
           tastdesc:desc,
           
       }]
      
       importanttasks.push(imptask);
       console.log(importanttasks);
       
        printimp=`
       <tr>
      <td></td>
      </tr> `
      imptask.forEach(taskelement=>{
           localStorage.setItem("tasktitle",title);
           localStorage.setItem("desc",desc);
           printimp=`
           <div class="card" style="width: 40rem;border-radius: 10px;margin: 20px;" data-aos="fade-right" >
             <div class="card-body">
               <h5 class="tabledata">${taskelement.tasktitle}</h5>
               <h5 class="tabledata">${taskelement.tastdesc}</h5>
                <div class="checkbox-wrapper-2">
     <input type="checkbox" id="check">
   </div>
             </div>
           </div>
   `
       })
       document.getElementById("printimptasks").innerHTML+=printimp
       
      
       checked();
       
       
   }
  
   
   