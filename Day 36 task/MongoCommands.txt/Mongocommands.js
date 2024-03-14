//I have two folders ,one for users and another one for mentors within the same Database 

//1.Find all the topics and tasks which are thought in the month of October

db.users.aggregate([
    {
        $match: {
            "Date": {
                $elemMatch: {
                    "Topics": { $exists: true }
                }
            }
        }
    }
])

//2.Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020

db.collection.find({
    "Company_drivers": {
        $elemMatch: {
            $or: [
                { "TCS": "Attended" },
                { "Wipro": "Attended" }
            ]
        }
    },
    "date": {
        $gte: new Date("2023.10.15"),
        $lt: new Date("2023.10.15")
    }
})

//3.Find all the company drives and students who are appeared for the placement.
db.mentors.find({
    "mentors.students.Company_drivers": {
        $elemMatch: {
            $or: [
                { "TCS": "Attended" },
                { "Wipro": "Attended" }
            ]
        }
    }
})

//4.Find the number of problems solved by the user in codekata
db.users.aggregate([
    {
      $group: {
        id: "$name", 
        Codekata: { $sum: { $size: "$Codekata" } } 
      }
    }
  ])

//5.Find all the mentors with who has the mentee's count more than 15
db.Mentors.aggregate([
    {
      $project: {
        mentorName: "$name", 
        menteeCount: { $size: "$Students" } 
      }
    },
    {
      $match: {
        menteeCount: { $gt: 15 } 
      }
    }
  ])

  //6.Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020
db.users.aggregate([
    {
      $match: {
        "Date.Date": {
          $gte: new Date("2020-10-15T00:00:00Z"),
          $lte: new Date("2020-10-31T23:59:59Z")
        },
        "Date.Attendance": "absent",
        "Date.Task": { $ne: "Submitted" }
      }
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 }
      }
    }
  ])
  
  



