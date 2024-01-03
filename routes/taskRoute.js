const express = require("express");
const mongoose = require("mongoose");
const Task=require("../models/taskModels")

const router=express.Router()

router.get("/", async(req, res) => {
    try {
        const showAll=await Task.find()
    res.status(200).json(showAll)        
    } catch (error) {
        console.log(error)
        res.send(500).json({error:error.message})
    }
  
});

router.get("/:id", async(req, res) => {
    const {id}=req.params;
    try {
        const singleTask=await Task.findById({_id:id})
    res.status(200).json(singleTask)        
    } catch (error) {
        console.log(error)
        res.send(500).json({error:error.message})
    }
  
});

router.delete("/:id", async(req, res) => {
    const {id}=req.params;
    try {
        const singleTask=await Task.findByIdAndDelete({_id:id})
    res.status(200).json(singleTask)        
    } catch (error) {
        console.log(error)
        res.send(500).json({error:error.message})
    }
  
});

router.patch("/:id", async(req, res) => {
    const {id}=req.params;
    const {task}=req.body;
    try {
        const updateTask=await Task.findByIdAndUpdate(id,req.body,{new:true})
    res.status(200).json(updateTask)        
    } catch (error) {
        console.log(error)
        res.send(500).json({error:error.message})
    }
  
});

router.post("/", async (req, res) => {
  const { task } = req.body;
 
  try {
    // check task is already added or not 
    let oldTask = await Task.findOne({ task });
    if (oldTask) return res.status(409).json({ error: "This task is already added" });
        // create new task and save it into the database
    const taskAdded = await Task.create({
    task:task
    });
    res.status(201).json(taskAdded);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports=router