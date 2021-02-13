const form = document.getElementById('formId');
const cameras = document.getElementById('cameras');
const currentTime = document.getElementById('currentTime');
const currentDate = Date.now

let num = 0;

const getDisplayTime = (dateTimeStemp) => {

    const date = new Date(dateTimeStemp);
    const sec = (date.getSeconds()<10?'0':'') + date.getSeconds()
    const minute = (date.getMinutes()<10?'0':'') + date.getMinutes()
    const hour = (date.getHours()<10?'0':'') + date.getHours()

    return `${hour}:${minute}:${sec}`

}

// const interval = () => {
//     setInterval(() => 
//         currentTime.innerHTML = getDisplayTime()
//     ,1);
// }

// interval();



const createOneElement = (lblText, inputType, id, borderColor) => {
    const div = document.createElement("div");  
    const lbl = document.createElement("label");  
    const inp = document.createElement("input");

    lbl.innerText = lblText;
    inp.type = inputType;
    inp.id =  id;
    inp.step="1"
    inp.style.border = `1px solid ${borderColor}`;
    inp.style.marginRight = '10px';

    div.appendChild(lbl);
    div.appendChild(inp);
    return div;
}


const createSumCalcElement = (gapText, realCalTimeText, gapId, realId) => {
    const container = document.createElement("div");

    const br = document.createElement('br');


    const lblRealCalTimeTitle = document.createElement("label");
    lblRealCalTimeTitle.innerText = 'זמן מחושב:'
    const lblRealCalTime = document.createElement("label");
    lblRealCalTime.id = realId;


    container.appendChild(lblRealCalTimeTitle);
    container.appendChild(br);
    container.appendChild(lblRealCalTime);

    return container

}

const createCameraElemet = () => {
    const theNum = num;
    const div = document.createElement("div");  
    const element1 = createOneElement('הזן שם מצלמה', 'text');
    element1.className = 'inpTime';
    const inp = createOneElement('הזן זמן מצלמה', 'time', `inp${theNum}`, 'red');
    inp.className = 'inpTime';
    const inpReal = createOneElement('הזן זמן אמת', 'time', `inpReal${theNum}`, 'orange');
    inpReal.className = 'inpTime';
    const inpTimeCalc = createOneElement('הזן זמן רצוי', 'time', `inpTimeCalc${theNum}`, 'green');
    inpTimeCalc.className = 'inpTime';
    const sumElement = createSumCalcElement('4:10:05-', '20:10:53', `gap${theNum}`, `real${theNum}`);
    sumElement.className = 'inpTime';

    const okBtn = document.createElement('button');
    okBtn.innerText = 'חשב';


    const calc = (inp, inpReal, inpTimeCalc) => {
        const final = document.getElementById(`real${theNum}`);
        final.style.fontWeight = 'bold'
        const difference = inpReal - inp;

        const theTime =getDisplayTime(inpTimeCalc + difference);
        final.innerText = theTime;
    }


    okBtn.addEventListener('click', (e) => {

        e.preventDefault();

        const inpValue = document.getElementById(`inp${theNum}`).value;
        const inpTs = convertToTS(inpValue);

        const inpRealValue = document.getElementById(`inpReal${theNum}`).value;
        const inpRealTs = convertToTS(inpRealValue);
        
        const inpTimeCalcValue = document.getElementById(`inpTimeCalc${theNum}`).value;
        const inpTimeCalcTs = convertToTS(inpTimeCalcValue);

        console.log('inpTs', inpTs);
        console.log('inpRealTs', inpRealTs);
        console.log('inpTimeCalcTs', inpTimeCalcTs);

        calc(inpTs, inpRealTs, inpTimeCalcTs);

    });


    div.appendChild(element1);
    div.appendChild(inp);
    div.appendChild(inpReal);
    div.appendChild(inpTimeCalc);
    div.appendChild(sumElement);
    div.appendChild(okBtn);

    div.className = 'element'
    return div;

}


const numOfCamerasInput = document.getElementById('numOfCameras');
const formCam = document.getElementById('cameras');
const confirmBtn = document.getElementById('confirmBtn');

numOfCamerasInput.addEventListener('change', (e) => {
    const numberOfCameras = e.target.value;

    if (numberOfCameras < 0 ) {
        numOfCamerasInput.value = 0; 
        return;
    }

    numberOfCameras > num
        ? formCam.appendChild( createCameraElemet())
        : formCam.removeChild(formCam.lastChild);

        num = numberOfCameras;
});


const convertToTS = (timeValue) => {
    if (!timeValue) return;

    const time = timeValue.split(':');

    if (time?.length < 3) {
        time.push('00');
    }

    const d = Date.now();
    const dat = new Date(d);
    dat.setHours(time[0]);
    dat.setMinutes(time[1]);
    dat.setSeconds(time[2]);
    
    return dat.getTime();
}

confirmBtn.addEventListener('click', () => {
    const currentTimeValue = currentTime.value;
    const actualTs = convertToTS(currentTimeValue);


    const camerasLength = cameras.childNodes.length;

    for (let i = 0; i < camerasLength; i++) {
        const inpValue = document.getElementById(`inp${i}`).value;
        const gap = document.getElementById(`gap${num}`);
        const real = document.getElementById(`real${num}`);
        
        const actualSelectedDate = convertToTS(inpValue);

        let res = actualTs - actualSelectedDate;
        let sine = '-';

        console.log(actualTs);
        console.log('actualSelectedDate',  actualSelectedDate);

        if (actualTs > actualSelectedDate) {
            sine = '+'
            res = actualTs - actualSelectedDate
        }

        console.log(sine + " " + getDisplayTime(res));
        // resultArr.push();
    }



});




