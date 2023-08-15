document.addEventListener("DOMContentLoaded", () => {
    const taskTable = document.querySelector("#taskTable");
    const taskTableBody = taskTable.querySelector("tbody");
    const addTaskBtn = document.querySelector("#addTaskBtn");

    let schedules = JSON.parse(localStorage.getItem("entries")) || [];

    const refreshScheduleList = () => {
        taskTableBody.innerHTML = "";
        schedules.forEach((schedule, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${schedule.taskUs}</td><td>${schedule.scheDate}</td><td><button>Delete</button></td>`;
            row.querySelector("button").addEventListener("click", () => {
                schedules.splice(index, 1);
                localStorage.setItem("entries", JSON.stringify(schedules));
                refreshScheduleList();
            });
            taskTableBody.appendChild(row);
        });
    };

    addTaskBtn.addEventListener("click", () => {
        const taskUs = document.querySelector("#taskUs").value;
        const scheDate = document.querySelector("#scheDate").value;

        if (taskUs.trim() !== "" && scheDate.trim() !== "") {
            schedules.push({ taskUs, scheDate });
            localStorage.setItem("entries", JSON.stringify(schedules));
            refreshScheduleList();
       
            document.querySelector("#taskUs").value = "";
            document.querySelector("#scheDate").value = "";
        } else {
            alert("Please fill out both Task and Scheduled Date fields.");
        }
    });

    refreshScheduleList();
});
