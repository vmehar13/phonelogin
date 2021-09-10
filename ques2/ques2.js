// Assume data in mongoDB

//Customers
// {
//     _id: 1,
//     name: ravi,
//     email: ravi123@gamil.com
// }
// {
//     _id: 2,
//     name: kishan,
//     email: kishan@gamil.com
// }
// {
//     _id: 3,
//     name: sameer,
//     email: sameer44@gamil.com
// }


//Subjects
// {
//     _id: 1,
//     subjectName: "english"
// }
// {
//     _id: 2,
//     subjectName: "Hindi"
// }
// {
//     _id: 3,
//     subjectName: "Maths"
// }

//Solution
//db.customers.aggregate([{
//     $lookup: {
//         from: "Subjects",
//         localField: "_id",
//         foreignField: "_id",
//         as: "subjects"
//     }
// }])

