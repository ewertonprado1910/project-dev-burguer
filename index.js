const express = require("express")
const uuid = require("uuid")

const port = 3000
const app = express()
app.use(express.json())


const pedidos = []

app.get("/order", (request, response) => {
    return response.status(201).json(pedidos)

})

app.post("/order", (request, response) => {
    const {pedido, name} = request.body
    const user = {id: uuid.v4(), pedido, name}

    pedidos.push(user)

    return response.status(201).json(user)

})

app.put("/order/:id", (request, response) => {
    const {id} = request.params
    const {pedido, name} = request.body

    const upadteOrder = {id, pedido, name} 

    const index = pedidos.findIndex(item => item.id === id)

    if(index < 0) {
        return response.status(404).json({menssage: "Not found order"})
    }

    pedidos[index] = upadteOrder

     return response.status(201).json(upadteOrder)

})



app.listen(port, () => {
    console.log(`🚀 Server, starting port ${port}`)
})
