const asyncHandler=require("express-async-handler");
const Contact = require("../models/contactModel");
const getContacts=asyncHandler(async(req,res)=>{
    const contacts=await Contact.find();

    res.status(200).json(contacts);
});
const createContact=asyncHandler(async(req,res)=>{
     console.log("the request is",req.body);
     const{name,email,phone}=req.body;
     if(!name||!email||!phone){
        res.status(400);
        throw new Error("All fields are needed");
     }
     const contact=await Contact.create({
        name,
        email,
       phone,
     });
    res.status(201).json(contact);
});
const getContact=asyncHandler(async(req,res)=>{
     const contact= await Contact.findById(req.params.id);
     if(!contact){
        res.status(404);
        throw new Error("Contact not found");
     }

    res.status(200).json(contact);
});
const updateContact=asyncHandler(async(req,res)=>{
    const contact= await Contact.findById(req.params.id);
    if(!contact){
       res.status(404);
       throw new Error("Contact not found");
    }
    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,{
            new:true
        }
    );
    res.status(200).json(updatedContact);
});
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    await contact.deleteOne(); 
    res.status(200).json({ message: "Contact deleted", contact });
});
module.exports={getContacts,createContact,updateContact,deleteContact,getContact};
