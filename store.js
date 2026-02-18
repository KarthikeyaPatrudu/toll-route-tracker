Route API Error: CastError: Cast to date failed for value "Invalid Date" (type Date) at path "readerReadTime" for model "TollLog"
    at SchemaDate.cast (C:\Users\LEAP_02\Desktop\toll-route-tracker\backend\node_modules\mongoose\lib\schema\date.js:379:11)
    at SchemaDate.handleSingle (C:\Users\LEAP_02\Desktop\toll-route-tracker\backend\node_modules\mongoose\lib\schema\date.js:391:15)
    at SchemaDate.castForQuery (C:\Users\LEAP_02\Desktop\toll-route-tracker\backend\node_modules\mongoose\lib\schema\date.js:443:18)
    at cast (C:\Users\LEAP_02\Desktop\toll-route-tracker\backend\node_modules\mongoose\lib\cast.js:363:39)
    at Query.cast (C:\Users\LEAP_02\Desktop\toll-route-tracker\backend\node_modules\mongoose\lib\query.js:5040:12)
    at Query._castConditions (C:\Users\LEAP_02\Desktop\toll-route-tracker\backend\node_modules\mongoose\lib\query.js:2374:10)
    at model.Query._find (C:\Users\LEAP_02\Desktop\toll-route-tracker\backend\node_modules\mongoose\lib\query.js:2401:8)
    at model.Query.exec (C:\Users\LEAP_02\Desktop\toll-route-tracker\backend\node_modules\mongoose\lib\query.js:4652:80)
    at process.processTicksAndRejections (node:internal/process/task_queues:103:5)
    at async C:\Users\LEAP_02\Desktop\toll-route-tracker\backend\server.js:41:18 {
  stringValue: '"Invalid Date"',
  messageFormat: undefined,
  kind: 'date',
  value: Invalid Date,
  path: 'readerReadTime',
  reason: AssertionError [ERR_ASSERTION]: The expression evaluated to a falsy value:

    assert.ok(!isNaN(value.valueOf()))

      at castDate (C:\Users\LEAP_02\Desktop\toll-route-tracker\backend\node_modules\mongoose\lib\cast\date.js:13:12)
      at SchemaDate.cast (C:\Users\LEAP_02\Desktop\toll-route-tracker\backend\node_modules\mongoose\lib\schema\date.js:377:12)
      at SchemaDate.handleSingle (C:\Users\LEAP_02\Desktop\toll-route-tracker\backend\node_modules\mongoose\lib\schema\date.js:391:15) 
      at SchemaDate.castForQuery (C:\Users\LEAP_02\Desktop\toll-route-tracker\backend\node_modules\mongoose\lib\schema\date.js:443:18) 
      at cast (C:\Users\LEAP_02\Desktop\toll-route-tracker\backend\node_modules\mongoose\lib\cast.js:363:39)
      at Query.cast (C:\Users\LEAP_02\Desktop\toll-route-tracker\backend\node_modules\mongoose\lib\query.js:5040:12)
      at Query._castConditions (C:\Users\LEAP_02\Desktop\toll-route-tracker\backend\node_modules\mongoose\lib\query.js:2374:10)        
      at model.Query._find (C:\Users\LEAP_02\Desktop\toll-route-tracker\backend\node_modules\mongoose\lib\query.js:2401:8)
      at model.Query.exec (C:\Users\LEAP_02\Desktop\toll-route-tracker\backend\node_modules\mongoose\lib\query.js:4652:80)
      at process.processTicksAndRejections (node:internal/process/task_queues:103:5) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: false,
    expected: true,
    operator: '==',
    diff: 'simple'
  },
  valueType: 'Date'
}
