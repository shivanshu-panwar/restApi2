const express = require('express'),
   router = express.Router()

const service = require('../services/employee.service')

// http://localhost:8080/api/employees/

// it is a one way of accessing database
// router.get('/', (req, res) => {
//     db.query("SELECT * FROM employees")
//     .then(data => res.send(data[0]))
//     .catch(err => console.log(err))

// })


// now we use another method

router.get('/', async (req, res) => {
    const employees = await service.getAllEmployees()
    res.send(employees)

})

router.get('/:id', async (req, res) => {
    const employee = await service.getEmployeeById(req.params.id)
   //  
   if(employee == undefined)
       res.status(404).json('no record with given id : ' + req.params.id)
    else 
       res.send(employee)
})

router.delete('/:id', async (req, res) => {
    const affectedRows = await service.deleteEmployee(req.params.id)
    if(affectedRows == 0)
       res.status(404).json('no record with given id : ' + req.params.id)
    else 
       res.send('deleted successfully.')
})

router.post('/', async (req, res) => {
    await service.addOrEditEmployee(req.body)
    res.status(201).send('created successfully.')
})

router.put('/:id', async (req, res) => {
   const affectedRows = await service.addOrEditEmployee(req.body, req.params.id)
    if (affectedRows == 0)
        res.status(404).json('no record with given id : ' + req.params.id)
    else
        res.send('updated successfully.')
   // const data = await service.addOrEditEmployee(req.body, req.params.id)
   // res.send(data)
})

module.exports = router;
