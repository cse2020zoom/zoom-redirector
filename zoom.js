const zoom = {
    monday: [
        {
            endTime: 950,
            url: "https://zoom.us/j/91861853076?pwd=QmJqNm8zRWFWdHpFL1RvVzU1Rk44QT09"
        },
        {
            endTime: 1050,
            url: "https://zoom.us/j/91861853076?pwd=QmJqNm8zRWFWdHpFL1RvVzU1Rk44QT09"
        },
        {
            endTime: 1150,
            url: "https://zoom.us/meeting/register/tJwrcuGopz4uGdXMQJvoMDsDvfR98cMYF02G"
        },
        {
            endTime: 1250,
            url: "https://zoom.us/meeting/register/tJwrcuGopz4uGdXMQJvoMDsDvfR98cMYF02G"
        }
    ],
    tuesday: [
        {
            endTime: 1050,
            url: "https://zoom.us/j/91861853076?pwd=QmJqNm8zRWFWdHpFL1RvVzU1Rk44QT09"
        },
        {
            endTime: 1150,
            url: "https://zoom.us/j/91474685444?pwd=MjJ3S2wwMzF5UUpTY1l6aDc0OXhSZz09"
        },
        {
            endTime: 1250,
            url: "https://zoom.us/j/91474685444?pwd=MjJ3S2wwMzF5UUpTY1l6aDc0OXhSZz09"
        },
        {
            endTime: 1650,
            url: "https://zoom.us/j/91474685444?pwd=MjJ3S2wwMzF5UUpTY1l6aDc0OXhSZz09"
        },
        {
            endTime: 1750,
            url: "https://zoom.us/j/91474685444?pwd=MjJ3S2wwMzF5UUpTY1l6aDc0OXhSZz09"
        },
    ],
    wednesday: [
        {
            endTime: 950,
            url: ""
        },
        {
            endTime: 1050,
            url: ""
        },
        {
            endTime: 1150,
            url: ""
        },
    ],
    thursday: [
        {
            endTime: 950,
            url: ""
        },
        {
            endTime: 1050,
            url: ""
        },
        {
            endTime: 1150,
            url: ""
        },
        {
            endTime: 1250,
            url: "https://zoom.us/j/91474685444?pwd=MjJ3S2wwMzF5UUpTY1l6aDc0OXhSZz09"
        },
    ],
    friday: [
        {
            endTime: 950,
            url: "https://zoom.us/meeting/register/tJMsde6qrDkjE9Bad_ah1vwHgnGEsqcCEJ0w"
        },
        {
            endTime: 1050,
            url: ""
        },
        {
            endTime: 1150,
            url: ""
        }
    ],
}

var today = new Date();
var date = today.getMonth()+1 + "/" + today.getDate() + "/" + today.getFullYear();
var time = today.getHours() + "";
time += (today.getMinutes()+"").length === 1 ? "0"+today.getMinutes() : today.getMinutes();

function getDayName(dateStr, locale)
{
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });
}

var day = getDayName(date, "en-US").toLocaleLowerCase();

var url = null;

zoom[day].map(item => {
    if(item.endTime - parseInt(time) >0 && item.endTime - parseInt(time) <= 100 && url === null){
        console.log("şu anki dersin: " + item.url)
        url = item.url;
    }
})

let countdown = 3;
let warningText = url ? "You are directing in " + countdown + " sec... Please wait..." : "You have not any lesson right now";

document.getElementById("mainText").innerText = warningText

if(url !== null && window.location.href.includes("?auto-redirect")) window.location.replace(url);
else if (url !== null) {
    var button = document.createElement('BUTTON');
    button.appendChild(document.createTextNode("Stop Redirecting"));
    document.getElementsByTagName('body')[0].insertBefore(button, document.getElementsByClassName('container')[0]);
    button.onclick = function(){
        countdown = countdown ? null : 3;
        document.getElementsByTagName('button')[0].innerText = (countdown ? "Stop" : "Resume") + " Redirecting";
    };
    setInterval(() => {
        if(countdown === null) {
            document.getElementById("mainText").innerText = "Redirecting Stopped!"
        }
        else {
            countdown--;
            document.getElementById("mainText").innerText = "You are directing in " + countdown + " sec... Please wait..."
            countdown <= 0 && window.location.replace(url);
        }
    }, 1000)
}
