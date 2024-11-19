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
        .index("by_org",["orgId"])      //secondary index, indexing kar diye hai
        .searchIndex("search_title",{
            searchField:'title',
            filterFields:['orgId']
        })
})