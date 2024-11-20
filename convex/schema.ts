import {v} from 'convex/values'
import {defineTable,defineSchema} from 'convex/server'

export default defineSchema({
    boards:defineTable({
        title:v.string(),
        orgId:v.string(),
        authorId:v.string(),
        authorName:v.string(),
        imageUrl:v.string(),
    })
        .index("by_org",["orgId"])      //secondary index, indexing kar diye hai,primary index to uska default _id hai
        .searchIndex("search_title",{
            searchField:'title',
            filterFields:['orgId']
        }),
    
    userFavorites:defineTable({
        orgId:v.string(),
        userId:v.string(),
        boardId:v.id("boards")
    })
    .index("by_board",["boardId"])      //SELECT * FROM userFavorites WHERE boardId = ?
    .index("by_user_org",["userId","orgId"])    //SELECT * FROM userFavorites WHERE userId = ? AND orgId = ?
    .index("by_user_board",["userId","boardId"])     //SELECT * FROM userFavorites WHERE boardId = ? AND userId = ?
    .index("by_user_board_org",["userId","boardId","orgId"]),       //SELECT * FROM userFavorites WHERE userId = ? AND boardId = ? AND orgId = ?

});