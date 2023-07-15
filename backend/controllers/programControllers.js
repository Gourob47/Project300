const Program= require("../models/programModel");
const User= require("../models/userModel");

const Service = require("../models/serviceModel");

const ErrorHandler= require("../utils/errorHandler");
const catchAsynceError= require("../middleware/catchAsyncError");
const sendEmail = require("../utils/sendEmail");






//Create Program

exports.newProgram = catchAsynceError(async(req,res,next)=>{

    

 
    const{
       // programPlace,
        // paymentInfo,
        // cost,
        // taxPrice,
        package,
        totalCost,

    }= req.body;
    date=req.body.package[0].date;
    const program= await Program.create({ 
        package,
        totalCost,
        date,
        user: req.user._id,
    });


    res.status(201).json({
        success:true,
        program,
    })
})


//Date Verification

exports.dateVerification= catchAsynceError(async(req,res,next)=>{
 

    
 
    const date= await Program.find({date:req.body.date});
  

    if(date.length<5)
    {

      
        const user= await Program.find({user:req.body.user._id, date:req.body.date});
       

        if(user.length==0)
        {
            res.status(201).json({
                message:'Blank'
            })
        }
        else
        {
            res.status(201).json({
                message:'userExist'
            })
        }     
       
    }
    else
    {
        res.status(200).json({
            message:"Fill"
        })
    }
   
   
})






//Get single Program
exports.getSingleProgram= catchAsynceError(async(req,res,next)=>{

   
    const program= await Program.findById(req.params.id).populate("user","name email");

    if(!program)
    {
        return next(new ErrorHandler("Program not found in this ID",404));

    }

    res.status(200).json({
        success:true,
        program
    })
})

//Get logged in User program

exports.myProgram= catchAsynceError(async(req,res,next)=>{
    const program= await Program.find({user: req.user._id});


    res.status(200).json({
        success:true,
        program,
    })
})

//Get all program from users---ADMIN

exports.getAllProgram= catchAsynceError(async(req,res,next)=>{
  
    const programs= await Program.find();


    let totalAmount= 0;

    programs.forEach((program)=>{
        totalAmount+=program.totalCost;
    })


    res.status(200).json({
        success:true,
        totalAmount,
        programs,
    })
})

//update program status---ADMIN *****

exports.updateProgramStatus= catchAsynceError(async(req, res,next)=>{

    const program= await Program.findById(req.params.id);
    const user= await User.findById(program.user);
   

    if(!program)
    {
        return next(new ErrorHandler("Program not found in this ID",404));
    }


    program.confirmProgram= req.body.status;




    if(program.confirmProgram==="Confirm")
    {
        
const message=`Congratulations, sir! We are delighted to inform you that your booking request has been approved.Our dedicated team will arrive at the venue one day prior to the event to meticulously arrange and decorate everything. We kindly request your cooperation throughout this process. If you have any specific design preferences or additional requirements, please don't hesitate to share your ideas with our team. They will assist you in organizing those elements to perfection. Our team is fully prepared and eager to commence. Are you ready to embark on this journey with us?`;
        
    
   try {

 
    await sendEmail({
        email: user.email,
        subject: `Unlocked_Creations Password Recovery`,
        message,
    })
 

    await program.save({validateBeforeSave: false});

    return res.status(200).json({
        success:true,
    })
    
    return next(new ErrorHandler("Program is Confirmed",200));
    
   } catch (error) {
    
    return next(new ErrorHandler(error,500));
   }

     
     
    }
    else if(program.confirmProgram==="Cancel")
    {
     const message=`Thank you for your interest in us but we regret to inform you that we are unable to offer you the service as we have many other services booked on the same day...`

         
        
           try {
            await sendEmail({
                email: user.email,
                subject: `Unlocked Creations Program Cancellation`,
                message,
            })
    
         
            await program.save({validateBeforeSave: false});
              return res.status(200).json({
                success:true,
                 })
            return next(new ErrorHandler("Program Cancelled",400));
            
           } catch (error) {
            return next(new ErrorHandler(error,500));
            
           }

    }
    else if(program.confirmProgram==="Cancel1")
    {
     
        const message=`Thank you for expressing your interest in our services. We deeply regret to inform you, sir, that we currently face a staffing shortage on your desired booking date, preventing us from organizing the event as planned. However, please be assured that you hold a special place on our priority list, and we will make every effort to ensure a seamless and efficient event once we have an adequate staff in place. We sincerely apologize for any inconvenience caused and appreciate your understanding.`;

        try {

            await sendEmail({
                email: user.email,
                subject: `Unlocked Creations Program Cancellation`,
                message,
            })
    
          
            program.confirmProgram= "Insufficient Staff";
            await program.save({validateBeforeSave: false});
            return res.status(200).json({
                success:true,
                 })
            return next(new ErrorHandler("Program Cancel Due to Insufficient Staff",400));
            
        } catch (error) {
            return next(new ErrorHandler(error,500));
        }


    
        
    
      
    
    }
    else if(program.confirmProgram==="Cancel2")
    {
        const message=`Thank you for expressing interest in our services. Unfortunately, we must regretfully inform you that we are unable to provide the requested services on that particular day. This is due to a conflict with several other scheduled programs, as well as the unavailability of our decorator's equipment. To ensure a flawless organization of your event, we currently face a shortage of equipment, which is why we are unable to approve your booking request at this time. We sincerely apologize for any inconvenience caused and deeply regret the situation.`;
        
       try {
        
        await sendEmail({
            email: user.email,
            subject: `Unlocked Creations Program Cancellation`,
            message,
        })

        
        program.confirmProgram= "Insufficient Tools";
        await program.save({validateBeforeSave: false});
        return res.status(200).json({
            success:true,
             })
     
        return next(new ErrorHandler("Program Cancel Due to Insufficient Infrastructure",400));
       } catch (error) {
        return next(new ErrorHandler(error,500));
       }
    
    }
 
        
    

    // if(req.body.status==="Confirmed"||req.body.status==="Cancel"||req.body.status=== "Cancel1"||req.body.status==="Cancel2")
    // {
       
    //     program.deliveredAt= Date.now();
        
    // }

    // await program.save({validateBeforeSave: false});

    // res.status(200).json({
    //     success:true,
    // })

})

//delete program---ADMIN
exports.deleteProgram= catchAsynceError(async(req,res,next)=>{
    const program= await Program.findById(req.params.id);

    if(!program)
    {
        return next(new ErrorHandler("Program not found in this ID",404));
    }

     await program.remove();


    res.status(200).json({
        success:true,
        message:"Program Deleted Successfully",
        program,
    })
})




