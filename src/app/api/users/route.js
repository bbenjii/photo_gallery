// import db from "@/lib/core/mongodb";
//
//
// export async function GET(req, res) {
//     const collection = db.collection("users");
//
//     const query = {}
//     const options = {}
//
//     const fetched_users = collection.find(query, options);
//     let users = [
//         {"name":"user number 1"}
//     ]
//
//     console.log(fetched_users);
//
//     return new Response(JSON.stringify(users), {
//         status: 200,
//         headers: { 'Content-Type': 'application/json' }
//     });
// }