import { Request, Response } from "express";
import { MovieModel } from "../models/Movie";
import Logger from "../../config/logger";


export async function createMovie(req: Request, res: Response){
    try{
        const data = req.body;
        const movie = await MovieModel.create(data);
        return res.status(201).json(movie);
    }catch(e: any){
        Logger.error(`Erro no sistema: ${e?.message}`);
        return res.status(500).json({error: "Por favor, tente mais tarde"});
    }
}

export async function findMovieById(req: Request, res: Response){
    try{
        const id = req.params.id;
        const movie = await MovieModel.findById(id);

        if(!movie){
            return res.status(404).json({ error: "Filme não encontrado."})
        }
        return res.status(200).json(movie);
    }catch(e: any){
        Logger.error(`Erro no sistema: ${e?.message}`);
        return res.status(500).json({error: "Por favor, tente mais tarde"});
    }
}

export async function getAllMovies(req: Request, res: Response){
    try{
        const movies = await MovieModel.find()
        return res.status(200).json(movies);
    }catch(e: any){
        Logger.error(`Erro no sistema: ${e?.message}`);
        return res.status(500).json({error: "Por favor, tente mais tarde"});
    }
}

export async function deleteMovie(req: Request, res: Response){
    try{
        const id = req.params.id;
        const movie = await MovieModel.findById(id);

        if(!movie){
            return res.status(404).json({ error: "Filme não encontrado."})
        }

        await movie.deleteOne();

        return res.status(200).json({msg: "Filme excluido com sucesso!"});
    }catch(e: any){
        Logger.error(`Erro no sistema: ${e?.message}`);
        return res.status(500).json({error: "Por favor, tente mais tarde"});
    }
}

export async function updateMovie(req: Request, res: Response){
    try{
        const id = req.params.id;
        const data = req.body;
        const movie = await MovieModel.findById(id);

        if(!movie){
            return res.status(404).json({ error: "Filme não encontrado."})
        }

        await MovieModel.updateOne({_id: id}, data);

        return res.status(200).json(data);

    }catch(e: any){
        Logger.error(`Erro no sistema: ${e?.message}`);
        return res.status(500).json({error: "Por favor, tente mais tarde"});
    }
}
