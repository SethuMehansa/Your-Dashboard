let profilepic = document.getElementById("profpic");
let inputpic = document.getElementById("inputimg");

inputpic.onchange = function () {
  profilepic.src = URL.createObjectURL(inputpic.files[0]);
};

function updateuser() {
  let name = document.getElementById("name").value;
  document.getElementById("username").innerHTML = name;
  localStorage.setItem("User",name);
}

let tasks = [];
let subjects = [];
let numofhrs = []; 

function save() {
  let subject = document.getElementById("subject").value;
  let time = parseInt(document.getElementById("time").value);
  let day = document.getElementById("day").value;

  console.log(subjects);
  console.log(numofhrs);
  console.log(tasks);  

  if (!subject || !time || !day) {
    alert("Please fill all fields...!");
    return;
  }

  let index = subjects.indexOf(subject);

  if (index !== -1) {
    numofhrs[index] += time;
  } else {
    subjects.push(subject);
    numofhrs.push(time);
  }

  let task = {
    subjectname: subject,
    timegiven: time,
    dategiven: day,
  };

  tasks.push(task);

  localStorage.setItem("subjects", JSON.stringify(subjects));
  localStorage.setItem("numofhrs", JSON.stringify(numofhrs));
  localStorage.setItem("tasks", JSON.stringify(tasks));

  let prints = `
     <tr>
         <td>${task.subjectname}</td>
         <td>${task.timegiven} hrs</td>
         <td>${task.dategiven}</td>
         <td>
             <button class="btndone">Done</button>
             <button class="btnstar"><i class="bi bi-star-fill"></i></button>
             <button class="btnclose"><i class="bi bi-x-circle-fill"></i></button>
         </td>
     </tr>
 `;

  document.getElementById("printtasks").innerHTML += prints;

  addEventListeners();
  chartDisplay();

  document.getElementById("subject").value = "";
  document.getElementById("time").value = "";
  document.getElementById("day").value = "";
}

function addEventListeners() {
  document.querySelectorAll(".btndone").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const row = event.target.closest("tr");
      if (btn.textContent === "Done") {
        row.style.textDecoration = "line-through";
        btn.textContent = "Undo";
      } else {
        row.style.textDecoration = "none";
        btn.textContent = "Done";
      }
    });
  });

  document.querySelectorAll(".btnclose").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const row = event.target.closest("tr");
      row.remove();
    });
  });

  document.querySelectorAll(".btnstar").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const row = event.target.closest("tr");
      row.classList.toggle("starred");
    });
  });
}

let chartInstance;
let chartInstancePie;

function chartDisplay() {
  if (chartInstance) {
    chartInstance.data.labels = subjects;
    chartInstance.data.datasets[0].data=numofhrs;
    chartInstance.update();
  } else {
    const ctx = document.getElementById("myChart");
    chartInstance=new Chart(ctx, {
      type: "bar",
      data: {
        labels: subjects,
        datasets: [
          {
            label: "Subject Study Hours",
            data: numofhrs,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
    
  if(chartInstancePie){
    chartInstancePie.data.labels=subjects;
    chartInstancePie.data.datasets[0].data=numofhrs;
    chartInstancePie.update();
  }else{
    const ctx2= document.getElementById('myChart2');
    chartInstancePie=new Chart(ctx2, {
    type: 'pie',
    data: {
      labels: subjects,
      datasets: [{
        label: 'Subjects',
        data: numofhrs,
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
}
  
}

window.onload = function () {
  let savedName=localStorage.getItem("User");
  document.getElementById("username").innerHTML = savedName;
  
  let savedSubjects = localStorage.getItem("subjects");
  let savedNumofhrs = localStorage.getItem("numofhrs");
  let savedTasks = localStorage.getItem("tasks");

  if (savedSubjects) subjects = JSON.parse(savedSubjects);
  if (savedNumofhrs) numofhrs = JSON.parse(savedNumofhrs);
  if (savedTasks) tasks = JSON.parse(savedTasks);

  tasks.forEach((task) => {
    let prints = `
      <tr>
        <td>${task.subjectname}</td>
        <td>${task.timegiven} hrs</td>
        <td>${task.dategiven}</td>
        <td>
          <button class="btndone">Done</button>
          <button class="btnstar"><i class="bi bi-star-fill"></i></button>
          <button class="btnclose"><i class="bi bi-x-circle-fill"></i></button>
        </td>
      </tr>
    `;
    document.getElementById("printtasks").innerHTML += prints;
  });

  addEventListeners();
  chartDisplay();
};



   let chatlistme=[]
let chatlist=[]
let currenttime=new Date()
let texts=document.getElementById("textinput").value
let chatbubble=""
function send(){
 texts=document.getElementById("textinput").value
 chatlistme.push(texts)

let chatbubble2=""
chatbubble+=`<h3 class="me text-end">${texts}<h6 class="time">${currenttime.toLocaleTimeString()}</h6></h3>
`
document.getElementById("chatarea").innerHTML+=chatbubble
document.getElementById("textinput").value=""
 
 const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "contents": [
      {
        "parts": [
          {
            "text": texts
          }
        ]
      }
    ]
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };
  fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=YOUR_API_KEY", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      
      console.log(result.candidates[0].content.parts[0].text);
      chatbubble+=`<h3 class="text-start bot">${result.candidates[0].content.parts[0].text}<h6 class="time text-end">${currenttime.toLocaleTimeString()}</h6></h3>`;
      chatlist.push(chatbubble);
      loadChatBox();
    })
    .catch((error) => console.error(error));
  
  // --------------------------------------------------------------
  loadChatBox();
}

function loadChatBox() {
  document.getElementById("chatarea").innerHTML = "";
  chatlist.forEach(element => {
    document.getElementById("chatarea").innerHTML = element;
  })
}

