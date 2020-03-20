# unbox-schema-plugin

## How to add a new collection on reaction's context

- Open register.js (./server/no-meteor/register.js)
- Inside the 'register' function we have the app.registerPlugin, where we basically pass a JSON object with all the plugin's settings in the params;
- Find (or add in case it doesn't exist) the object/json key 'collections' -> this is where we add a new collection into reaction's context
- Example of how your new collection should be added:

<pre><code>
      CollectionName: {
        name: "Table.Name",
        indexes: [
          [{ shopId: 1 }],
          [{ erpCode: 1 }],
          [{ isDeleted: 1 }]
        ]
      }
</code></pre>

- To change the collection's NAME on MONGO DB you must change the value of the key 'name'.
- The 'indexes' key is an array of required fields to be persisted in the collection.
