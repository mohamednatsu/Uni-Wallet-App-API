const {sql} = require("../config/db");

exports.getExposesByUserId = async (req,res) => {
    try {
        const user_id = req.params.user_id;

        const transactions = await sql`SELECT * FROM transactions WHERE user_id = ${user_id}`;
        res.status(200).json(transactions);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({message: e.message})
    }
}

exports.deleteExpose =  async (req,res) => {
    try {
        const id = req.params.id;
        if(isNaN(parseInt(id)))
        {
            res.status(400).json({message: "Invalid ID"})
        }
        const result = await sql`DELETE FROM transactions WHERE id = ${id}`;


        if(result.length == 0)
        {
            res.status(404).json({message: "Transaction not found"})
        }
        else {
            res.status(200).json({message: "Transaction deleted successfully"})
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({message: e.message})
    }
}

exports.addExpose = async (req,res) => {
    try {
        const {title, amount, category, user_id} = req.body;
        if(!title || amount == undefined || !user_id || !category) {
            res.status(400).json({message: "Please provide all the required fields"})
        }
        else {
            const transiction =
                await sql`INSERT INTO transactions (title, amount, category, user_id) 
            VALUES (${title}, ${amount}, ${category}, ${user_id}) RETURNING *`;
            res.status(201).json(transiction[0]);
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({message: e.message})
    }
}


exports.summaryExpose = async (req,res) => {
    try {
        const user_id = req.params.user_id;
        const summary = await sql`SELECT COALESCE(SUM(amount), 0) AS total FROM transactions WHERE user_id = ${user_id}`;

        const incomeResult = await sql`
        SELECT COALESCE(SUM(amount), 0) AS income FROM transactions 
        WHERE user_id = ${user_id} AND amount > 0`;

        const expenseResult = await sql`
        SELECT COALESCE(SUM(amount), 0) AS expense FROM transactions 
        WHERE user_id = ${user_id} AND amount < 0`;


        res.status(200).json({
            balance: summary[0].total,
            income: incomeResult[0].income,
            expense: expenseResult[0].expense,
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({message: e.message})
    }
}
