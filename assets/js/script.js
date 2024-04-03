// declare global variables

let width =700,
    height =0,
    filter= "none",
    streaming=false,
    autoCaptureInterval;

// fetching elements from dom

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photos = document.getElementById('photos');
const clearButton = document.getElementById('clear-button');
const photoButton = document.getElementById('photo-button');
const photoFilter = document.getElementById('photo-filter');
const autoButton = document.getElementById('auto-button')


// get the webcam onto the browser

navigator.mediaDevices.getUserMedia({video:true,audio:false}
)
.then(function(stream){
     video.srcObject = stream;
     video.play(); 
})
.catch(function(err){
    console.log(`Error: ${err}`);
});

// play when ready

video.addEventListener('canplay',function(e){

     if(!streaming){
        
        height = video.videoHeight / (video.videoWidth/width);

        video.setAttribute('width',width);
        video.setAttribute('height',height);
        canvas.setAttribute('width',width);
        canvas.setAttribute('height',height);

        streaming = true;

     }


},false);

// attaching event to photo button

photoButton.addEventListener('click',function(e){

   takePicture();

   e.preventDefault();


},false);

// attaching event to photo filter section

photoFilter.addEventListener('change',function(e){

    filter = e.target.value;

    video.style.filter = filter;

    e.preventDefault();

});

// event to clear out the photos

clearButton.addEventListener('click',function(e){

     photos.innerHTML = '';
     filter = 'none';

     video.style.filter = filter;

     photoFilter.selectedIndex=0;

     if(autoCaptureInterval) 
     clearInterval(autoCaptureInterval); // 자동 촬영 중지
});

autoButton.addEventListener('click', function() {
    if (autoCaptureInterval) {
        // 이미 자동 촬영이 실행 중이면 중지
        clearInterval(autoCaptureInterval);
        autoCaptureInterval = null;
        this.textContent = 'Make Timeline'; // 버튼 텍스트 변경
    } else {
        // 자동 촬영 시작
        autoCaptureInterval = setInterval(takePicture, 1000); // 1초마다 takePicture 함수 실행
        this.textContent = 'Stop'; // 사용자가 자동 촬영 중지를 할 수 있도록 버튼 텍스트 변경
    }
});

// function to take picture

function takePicture()
{
    const context = canvas.getContext('2d');

    if(width && height)
    {
        canvas.width = width;
        canvas.height = height;

        // draw the image of the webcam on the canvas

        context.drawImage(video,0,0,width,height);

        const imgUrl = canvas.toDataURL('image/png');

        // create image element

        const img = document.createElement('img');

        // set img src

        img.setAttribute('src',imgUrl);

        img.style.filter = filter;

        photos.appendChild(img);


    }
}


// Selecting all of the css classes on which 
// we want to apply functionalities 
const hr = document.querySelector('.hr') 
const min = document.querySelector('.min') 
const sec = document.querySelector('.sec') 

// Setting up the period of working 
setInterval(() => { 

    // Extracting the current time 
    // from DATE() function 
    let day = new Date() 
    let hour = day.getHours() 
    let minutes = day.getMinutes() 
    let seconds = day.getSeconds() 

    // Formula that is explained above for 
    // the rotation of different hands 
    let hrrotation = (30 * hour) + (0.5 * minutes); 
    let minrotation = 6 * minutes; 
    let secrotation = 6 * seconds; 

    hr.style.transform = 
        `translate(-50%,-100%) rotate(${hrrotation}deg)` 
    min.style.transform = 
        `translate(-50%,-100%) rotate(${minrotation}deg)` 
    sec.style.transform = 
        `translate(-50%,-85%) rotate(${secrotation}deg)` 
});
