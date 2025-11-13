import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import bcrypt from "bcryptjs";
import { z } from "zod";

// --- SCHEMAS ---
export const UserSchema = z.object({
    username: z.string().min(2, 'El nombre de usuario no es lo suficientemente largo'),
    email: z.string().email('El correo es inválido'),
    password: z.string().min(6, 'La contraseña no es lo suficientemente larga')
});

const updateUserSchema = UserSchema.partial();

type CreateUserInput = z.infer<typeof UserSchema>;
type UpdateUserInput = z.infer<typeof updateUserSchema>;

// --- GET ALL USERS ---
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find().select("-password");
        if (!users || users.length === 0) {
            return res.status(404).json({
                success: false,
                errors: [{ message: 'No se encontraron usuarios' }]
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Lista de usuarios',
            users
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            errors: [{
                message: 'Error interno al llamar usuarios',
                error: (error as Error).message
            }]
        });
    }
};

// --- GET USER BY ID ---
export const getUserData = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findById(id).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                errors: [{ field: 'id', message: 'No se encontró la id' }]
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Usuario encontrado',
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            errors: [{
                message: 'Error interno al buscar al usuario por id',
                error: (error as Error).message
            }]
        });
    }
};

// --- CREATE USER ---
export const createUser = async (req: Request<{}, {}, CreateUserInput>, res: Response) => {
    try {
        const parsed = UserSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                success: false,
                errors: parsed.error.issues.map(issue => ({
                    field: issue.path.join('.'),
                    message: issue.message
                }))
            });
        }

        const { username, email, password } = parsed.data;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                errors: [{ field: 'email', message: 'Este correo ya está en uso' }]
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: 'Usuario creado exitosamente',
            user: { username, email }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            errors: [{
                message: 'Error interno al crear el usuario',
                error: (error as Error).message
            }]
        });
    }
};

// --- UPDATE USER ---
export const updateUser = async (req: Request<{ id: string }, {}, UpdateUserInput>, res: Response) => {
    try {
        const parsed = updateUserSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                success: false,
                errors: parsed.error.issues.map(issue => ({
                    field: issue.path.join('.'),
                    message: issue.message
                }))
            });
        }

        const toUpdate = parsed.data;
        const { id } = req.params;

        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                errors: [{ message: 'No se encontró la id del usuario a actualizar' }]
            });
        }

        Object.assign(user, toUpdate);
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Datos del usuario actualizados correctamente',
            updatedUser: user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            errors: [{
                message: 'Error interno al actualizar datos del usuario',
                error: (error as Error).message
            }]
        });
    }
};

// --- DELETE USER ---
export const deleteUserById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                errors: [{ field: 'id', message: 'No se encontró la id del usuario' }]
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Usuario eliminado exitosamente'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            errors: [{
                message: 'Error interno al borrar un usuario',
                error: (error as Error).message
            }]
        });
    }
};
