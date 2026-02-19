function login(){
    var email=document.getElementById("email").value;
    var pass=document.getElementById("password").value;

    if(email!="" && pass!=""){
        window.location.href="booking.html";
    }else{
        alert("Enter Email & Password");
    }
}

function checkSlot(){

    var vehicleNo=document.getElementById("vehicleNumber").value;
    var phone=document.getElementById("ownerPhone").value;
    var vehicleType=document.getElementById("vehicleType").value;
    var hours=parseInt(document.getElementById("hours").value);
    var returnTime=document.getElementById("returnTime").value;
    var result=document.getElementById("slotResult");

    if(vehicleNo=="" || phone=="" || vehicleType=="" || !hours || returnTime==""){
        alert("Fill All Details");
        return;
    }

    var status=Math.floor(Math.random()*3);

    if(status==0){
        result.innerHTML="Parking Full ❌";
        result.style.color="red";
        return;
    }
    else if(status==1){
        result.innerHTML="Waiting List ⏳";
        result.style.color="orange";
        return;
    }
    else{
        result.innerHTML="Slot Available ✅";
        result.style.color="green";
    }

    var slotID="SLOT-"+Math.floor(100+Math.random()*900);

    var baseRate24=0;
    var extraRate=0;

    if(vehicleType=="Bike"){ baseRate24=200; extraRate=10; }
    if(vehicleType=="Car"){ baseRate24=500; extraRate=25; }
    if(vehicleType=="Van"){ baseRate24=800; extraRate=40; }
    if(vehicleType=="Bus"){ baseRate24=1000; extraRate=50; }

    var total=0;

    if(hours<=24){
        total=baseRate24;
    }else{
        total=baseRate24 + ((hours-24)*extraRate);
    }

    var now=new Date();
    var date=now.toLocaleDateString();
    var intime=now.toLocaleTimeString();

    // Save data in localStorage
    localStorage.setItem("parkingData", JSON.stringify({
        vehicleNo,
        phone,
        vehicleType,
        hours,
        returnTime,
        slotID,
        baseRate24,
        extraRate,
        total,
        date,
        intime
    }));

    window.location.href="bill.html";
}

window.onload=function(){
    if(document.getElementById("billDetails")){
        var data=JSON.parse(localStorage.getItem("parkingData"));

        if(data){
            document.getElementById("billDetails").innerHTML=
            "Parking Name: Next Gen AI Smart Parking <br>"+
            "Date: "+data.date+"<br>"+
            "In Time: "+data.intime+"<br>"+
            "Out Time: "+data.returnTime+"<br>"+
            "Slot ID: "+data.slotID+"<br>"+
            "Vehicle No: "+data.vehicleNo+"<br>"+
            "Owner Phone: "+data.phone+"<br>"+
            "Vehicle Type: "+data.vehicleType+"<br>"+
            "24 Hours Base Amount: ₹"+data.baseRate24+"<br>"+
            "Extra Per Hour: ₹"+data.extraRate+"<br>"+
            "<hr><b>Total Amount: ₹"+data.total+"</b>";
        }
    }
}

function goHome(){
    window.location.href="booking.html";
}
