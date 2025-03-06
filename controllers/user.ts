import { NextFunction, Request, Response } from 'express';

const NAMESPACE = "User";

interface IUser{
    email: string;
    motDePasse: string;
}

const register = async (req: Request, res: Response, next: NextFunction) => {

    console.log(req.body)
    const user = req.body as IUser;
    console.log(user.email, user.motDePasse);
    res.status(200).json({
        reponse: "ok"
    })

}

const login = async  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
}


export {
    register,
    login
}