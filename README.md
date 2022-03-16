# origin
 
## model design

Player
```js
{
  base: [34, 12],
  agents: {
    NAME1: Agent1,
    NAME2: Agent2
  },
  entropy: Number
}
```

Agent
```js
{
  position: [12, 34],
  type: Number
}
```

Node
```js
{
  id: Number,
  type: Number,
  position: [11, 22],
  entropy: Number,
  status: [id, docking] // id = -1 for available
  // collapse: Number // timestamp
}
```