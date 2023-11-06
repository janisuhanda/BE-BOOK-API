const Book = require("../models/book.model");

exports.create =  async (req,res)=>{
    try {
        const{title,author,summary,publisher} = req.body;
        const book = await Book.create({
            title,
            author,
            summary,
            publisher,
        });

        return res.status(201).json({
            status : 201,
            success : true,
            message : "new book created",
            data : {
                book : book,
            },
            error : null,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status : 500,
            success : false,
            message : "Internal Server Error",
            data : null,
            error : error,
        });
    }
}

exports.all = async (req,res) => {
    try {
        const books = await Book.findAll();
        return res.status(200).json({
            status : 200,
            success : true,
            message : "ok ok aja",
            data : {
                books,
            },
            error : null,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status : 500,
            success : false,
            message : "Internal Server Error",
            data : null,
            error : error,
        });
    }
}

exports.find = async (req,res) => {
    try {
        const {id} = req.params;
        const book = await Book.findOne({
            where: {
                id : id,
            },
        });
        

        if (!book){
            return res.status(404).json({
                status : 404,
                success : false,
                message : "book not found",
                data : null,
                error : "data tdk ada",
            }); 
        }

        return res.status(200).json({
            status : 200,
            success : true,
            message : "ok ok aja",
            data : {
                booknya : book,
                idnya : id
            },
            error : null,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status : 500,
            success : false,
            message : "Internal Server Error",
            data : null,
            error : error,
        });
    }
}

exports.update = async (req,res) =>{
    try {
        const {id}= req.params;
        const updated = await Book.update(req.body,{
            where:{
                id : id,
            },
        });

        if (!updated[0]){
            return res.status(400).json({
                status : 400,
                success : false,
                message : "gagal update",
                data : null,
                error : "gagal update",
            });
        }

        const book = await Book.findOne({
            where: {
                id : id,
            },
        });

        return res.status(200).json({
            status : 200,
            success : true,
            message : "berhasil update",
            data : {
                book : book,
            },
            error : null,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status : 500,
            success : false,
            message : "Internal Server Error",
            data : null,
            error : error,
        });
    
    }
}

exports.destroy = async (req,res) => {
    try {
        const {id}= req.params;
        const destroyed = await Book.destroy({
            where:{
                id : id,
            },
        });

        if (!destroyed){
            return res.status(400).json({
                status : 400,
                success : false,
                message : "gagal delete",
                data : null,
                error : "gagal delete",
            });
        }

        return res.status(200).json({
            status : 200,
            success : true,
            message : "berhasil update",
            data : null,
            error : null,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status : 500,
            success : false,
            message : "Internal Server Error",
            data : null,
            error : error,
        });
    }
}