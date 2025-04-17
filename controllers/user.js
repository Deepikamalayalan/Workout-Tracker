const mysql = require("mysql2");
const express = require('express');
const router=express.Router();  

const db=mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE,
})



exports.edit=async (req,res)=>{
    let id=req.params.id;
    let exersice='exersice';
    const globalUsername = req.app.get('globalUsername');
    console.log(id,globalUsername);
    db.query("select * from ?? where id=?",[exersice,id],(err,out)=>{
       if(err){
        console.log(err)
       }
       else{
        console.log(out)
        res.render("edit",{out})
       }
    })
}

exports.editwork=async (req,res)=>{
    let id=req.params.id;
    let exersice='workout';
    const globalUsername = req.app.get('globalUsername');
    console.log(id,globalUsername);
    db.query("select * from ?? where id=?",[globalUsername+exersice,id],(err,out)=>{
       if(err){
        console.log(err)
       }
       else{
        console.log(out)
        res.render("editwork",{out})
       }
    })
}

exports.editdata=async(req,res)=>{
    let id=req.params.id;
    let exersice='exersice';
    let workout='workout'; 
    const {myselect,ttime,stime,weight,date}=req.body;
    const metvalues={'Running':8.0,'Cycling':7.5,'Jocking':7,'Walking':2.3,'Yoga':3.3,'Stretching':2.8,'Aerobics':7.3,'Dance':7.2,'Swimming':13.3,'Pushups':4}
    const timepart=ttime.split(':');
    const total = parseInt(timepart[0])*60+parseInt(timepart[1])+parseInt(parseInt(timepart[2])/60)
    const met=metvalues[myselect];
    const calories=parseInt(total*(met*3.5*weight)/200)
    const globalUsername = req.app.get('globalUsername');
    db.query("update ?? set exersice_name=?,total_time=?,starting_time=?,date=?,calories=? where id=?",[exersice,myselect,ttime,stime,date,calories,id],(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log("Updated record")
            db.query("select * from ??",[exersice],(err,result)=>{
                if(!err){
                    db.query("select * from ??",[workout],(err,result1)=>{
                        if(!err){
                            db.query("select  COALESCE(hour(sum_time),00) as hour, COALESCE(minute(sum_time),00) as min, COALESCE(second(sum_time),00) as sec from (select sec_to_time(sum(time_to_sec(total_time))) as sum_time from ??) as subquery;",[exersice],(err,out)=>{
                                if(!err){
                                    db.query("select sum(calories) as sum_calories from ??",[exersice],(err,sum)=>{
                                    db.query("select  COALESCE(hour(sum_time),00) as hour, COALESCE(minute(sum_time),00) as min, COALESCE(second(sum_time),00) as sec from (select sec_to_time(sum(time_to_sec(total_time))) as sum_time from ??) as subquery;",[workout],(err,out1)=>{
                                        if(!err){
                                           db.query("select sum(calories) as sum_calories from ??",[workout],(err,sum1)=>{
                                            if (!err){
                                                res.render("home",{result,result1,out,out1,sum,sum1})
                                            }
                                           }) 
                                        }
                                    })
                                })
                                }
                            })
                        }
                    })
                }
                else{
                    console.log(err)
                }
            })
        }
    })
}

exports.editworkdata=async(req,res)=>{
    let id=req.params.id;
    let exersice='exersice';
    let workout='workout'; 
    const {myselect,ttime,stime,weight,date,steps}=req.body;
    const timepart=ttime.split(':');
    const metvalues={'Pilates':3,'Lunge':3.8,'OverHead Press':4.5,'Pullups':8,'Bench Press':6,'Dumbells':5,'Bicep curl':4,'Jump rope':11.8,'Barel curl':4,'cabel crossover':4}
    const total = parseInt(timepart[0])*60+parseInt(timepart[1])+parseInt(parseInt(timepart[2])/60)
    const met=metvalues[myselect];
    const calories=parseInt(total*(met*3.5*weight)/200)
    const globalUsername = req.app.get('globalUsername');
    db.query("update ?? set workout_name=?,total_time=?,starting_time=?,date=?,steps=?,calories=? where id=?",[workout,myselect,ttime,stime,date,steps,calories,id],(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log("Updated record")
            db.query("select * from ??",[exersice],(err,result)=>{
                if(!err){
                    db.query("select * from ??",[workout],(err,result1)=>{
                        if(!err){
                            db.query("select  COALESCE(hour(sum_time),00) as hour, COALESCE(minute(sum_time),00) as min, COALESCE(second(sum_time),00) as sec from (select sec_to_time(sum(time_to_sec(total_time))) as sum_time from ??) as subquery;",[exersice],(err,out)=>{
                                if(!err){
                                    db.query("select sum(calories) as sum_calories from ??",[exersice],(err,sum)=>{
                                    db.query("select  COALESCE(hour(sum_time),00) as hour, COALESCE(minute(sum_time),00) as min, COALESCE(second(sum_time),00) as sec from (select sec_to_time(sum(time_to_sec(total_time))) as sum_time from ??) as subquery;",[workout],(err,out1)=>{
                                        if(!err){
                                           db.query("select sum(calories) as sum_calories from ??",[workout],(err,sum1)=>{
                                            if (!err){
                                                res.render("home",{result,result1,out,out1,sum,sum1})
                                            }
                                           }) 
                                        }
                                    })
                                })
                                }
                            })
                        }
                    })
                }
                else{
                    console.log(err)
                }
            })
        }
    })
}

exports.delete=async(req,res)=>{
    let id=req.params.id;
    let exersice='exersice';
    let workout='workout';
    db.query("delete from ?? where id=?",[exersice,id],(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            db.query("select * from ??",[exersice],(err,result)=>{
                if(!err){
                    db.query("select * from ??",[workout],(err,result1)=>{
                        if(!err){
                            db.query("select  COALESCE(hour(sum_time),00) as hour, COALESCE(minute(sum_time),00) as min, COALESCE(second(sum_time),00) as sec from (select sec_to_time(sum(time_to_sec(total_time))) as sum_time from ??) as subquery;",[exersice],(err,out)=>{
                                if(!err){
                                    db.query("select sum(calories) as sum_calories from ??",[exersice],(err,sum)=>{
                                    db.query("select  COALESCE(hour(sum_time),00) as hour, COALESCE(minute(sum_time),00) as min, COALESCE(second(sum_time),00) as sec from (select sec_to_time(sum(time_to_sec(total_time))) as sum_time from ??) as subquery;",[workout],(err,out1)=>{
                                        if(!err){
                                           db.query("select sum(calories) as sum_calories from ??",[workout],(err,sum1)=>{
                                            if (!err){
                                                res.render("home",{result,result1,out,out1,sum,sum1})
                                            }
                                           }) 
                                        }
                                    })
                                })
                                }
                            })
                        }
                    })
                }
                else{
                    console.log(err)
                }
            })
        }
    })
}
exports.deletework=async(req,res)=>{
    let id=req.params.id;
    let exersice='exersice';
    let workout='workout';
    db.query("delete from ?? where id=?",[workout,id],(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            db.query("select * from ??",[exersice],(err,result)=>{
                if(!err){
                    db.query("select * from ??",[workout],(err,result1)=>{
                        if(!err){
                            db.query("select  COALESCE(hour(sum_time),00) as hour, COALESCE(minute(sum_time),00) as min, COALESCE(second(sum_time),00) as sec from (select sec_to_time(sum(time_to_sec(total_time))) as sum_time from ??) as subquery;",[exersice],(err,out)=>{
                                if(!err){
                                    db.query("select sum(calories) as sum_calories from ??",[exersice],(err,sum)=>{
                                    db.query("select  COALESCE(hour(sum_time),00) as hour, COALESCE(minute(sum_time),00) as min, COALESCE(second(sum_time),00) as sec from (select sec_to_time(sum(time_to_sec(total_time))) as sum_time from ??) as subquery;",[workout],(err,out1)=>{
                                        if(!err){
                                           db.query("select sum(calories) as sum_calories from ??",[workout],(err,sum1)=>{
                                            if (!err){
                                                res.render("home",{result,result1,out,out1,sum,sum1})
                                            }
                                           }) 
                                        }
                                    })
                                })
                                }
                            })
                        }
                    })
                }
                else{
                    console.log(err)
                }
            })
        }
    })
}

exports.search=async (req,res)=>{
    let exersice='exersice';
    let workout='workout';
    const {search}=req.body;
    db.query("select * from ??",[exersice],(err,result)=>{
        if(!err){
            db.query("select * from ??",[workout],(err,result1)=>{
                if(!err){
                    db.query("select  COALESCE(hour(sum_time),00) as hour, COALESCE(minute(sum_time),00) as min, COALESCE(second(sum_time),00) as sec from (select sec_to_time(sum(time_to_sec(total_time))) as sum_time from ??) as subquery;",[exersice],(err,out)=>{
                        if(!err){
                            db.query("select sum(calories) as sum_calories from ??",[exersice],(err,sum)=>{
                            db.query("select  COALESCE(hour(sum_time),00) as hour, COALESCE(minute(sum_time),00) as min, COALESCE(second(sum_time),00) as sec from (select sec_to_time(sum(time_to_sec(total_time))) as sum_time from ??) as subquery;",[workout],(err,out1)=>{
                                if(!err){
                                   db.query("select sum(calories) as sum_calories from ??",[workout],(err,sum1)=>{
                                    if (!err){
                                        db.query("select * from ?? where date=?",[exersice,search],(err,ser)=>{
                                            if(!err){
                                                db.query("select * from ?? where date=?",[workout,search],(err,ser1)=>{
                                                    res.render("home",{result,result1,out,out1,sum,sum1,ser,ser1})
                                                })
                                            }
                                        })
                                        
                                    }
                                   }) 
                                }
                            })
                        })
                        }
                    })
                }
            })
        }
        else{
            console.log(err)
        }
    })
}