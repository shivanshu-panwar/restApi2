const db = require('../db')

module.exports.getAllEmployees = async () => {
    const [records] =  await db.query("SELECT * FROM employees")            // [rows] it is destructuring of array
    return records;
}

module.exports.getEmployeeById = async (id) => {
    // const [rows] =  await db.query("SELECT * FROM employees WHERE id = " + id)  
    const [[record]] =  await db.query("SELECT * FROM employees WHERE id = ?", [id])          
    return record;
}

module.exports.deleteEmployee = async (id) => {
    // const [record] =  await db.query("DELETE FROM employees WHERE id = ?", [id])            // [rows] it is destructuring of array
   // OR we use instead of above line of code another way
    const [{affectedRows}] =  await db.query("DELETE FROM employees WHERE id = ?", [id]) 
    return affectedRows;
}

module.exports.addOrEditEmployee = async (obj, id = 0) => {
    const [{affectedRows}] =  await db.query("CALL usp_employee_add_or_edit(?,?,?,?))" , 
        [id, obj.name, obj.employee_code, obj.salary ]) 
    return affectedRows;
}