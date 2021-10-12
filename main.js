img="";
status ="";
objects=[];
function preload()
{

}
function setup()
{
    canvas=createCanvas(400, 400);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    objectdetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="status:detecting objects";
}
function draw()
{
    image(img, 0, 0, 400, 400);
    if(status != "")
    {
        r=random(255);
        g=random(255);
        b=random(255);
        objectdetector.detect(video, gotresult);
        for(i=0;i<objects.length; i++)
        {
            document.getElementById("status").innerHTML="status: objects detected";
            document.getElementById("vega").innerHTML="Number Of Objects Detected Are" + objects.length;
            fill(r, g, b);
            percent= floor(objects[i].confidence*100);
            text(objects[i].label+""+ percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
    
} 

function modelLoaded()
{
    console.log("model Is Loaded");
    status=true;
    objectdetector.detect(video, gotresult);
}
function gotresult(error, results)
{
   if(error)
   {
       console.log(error);
   }
    console.log(results);
    objects = results;
}