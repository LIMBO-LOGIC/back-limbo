import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

function parseDate(dateString: string): Date {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year ?? 0, (month ?? 0) - 1, day); // Mês começa do zero
}

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  // POST: Registrar usuário
  async register(req: Request, res: Response): Promise<Response> {
    try {
      const {
        fullname,
        nickname,
        email,
        birthdate,
        password,
        type_user,
        profile_picture,
      } = req.body;

      console.log(req.body); // Log do corpo da requisição

      if (!fullname || !nickname || !email || !birthdate || !password) {
        console.log({ fullname, nickname, email, birthdate, password }); // Log dos campos
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const birthdateFormatted = parseDate(birthdate);
      const user = await this.userService.createUser(
        fullname,
        nickname,
        email,
        birthdateFormatted,
        password,
        type_user,
        profile_picture
      );

      return res
        .status(201)
        .json({ message: 'User created successfully!', user });
    } catch (error) {
      return res.status(500).json({
        message: 'Error registering user!',
        error: (error as Error).message,
      });
    }
  }

  // POST: Login de usuário

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { nickname, password } = req.body;

      if (!nickname || !password) {
        return res
          .status(400)
          .json({ error: 'Nickname and password are required' });
      }

      if (nickname.length < 3) {
        return res.status(400).json({
          error: 'Nickname must be at least 3 characters',
        });
      }

      const user = await this.userService.loginUser(nickname, password);

      if (!user) {
        return res.status(401).json({ error: 'Invalid nickname or password' });
      }

      return res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      return res.status(500).json({
        message: 'An unexpected error occurred. Please try again later.',
      });
    }
  }

  async getAllUser(_req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.userService.getAllUser();
      return res.json(users);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Error fetching all users' });
    }
  }

  // GET: Buscar usuário por ID
  async getUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId = Number(req.params.id);
      const user = await this.userService.getUserById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching user by id' });
    }
  }

  // PUT: Atualizar usuário
  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId = Number(req.params.id);
      const { fullname, nickname, birthdate, password, profile_picture } =
        req.body;

      if (!fullname && !nickname && !birthdate && !password) {
        return res
          .status(400)
          .json({ message: 'At least one field is required to update' });
      }

      const parsedBirthdate = birthdate ? new Date(birthdate) : undefined;

      const updatedUser = await this.userService.updateUser(userId, {
        fullname,
        nickname,
        birthdate: parsedBirthdate,
        password,
        profile_picture,
      });

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Formata o campo birthdate no formato dd/mm/yyyy
      const formattedUser = {
        ...updatedUser,
        birthdate: updatedUser.birthdate
          ? new Date(updatedUser.birthdate).toLocaleDateString('pt-BR')
          : null,
      };

      return res.json({
        message: 'User updated successfully',
        updatedUser: formattedUser,
      });
    } catch (error) {
      if ((error as Error).message === 'Nickname already in use') {
        return res.status(400).json({ message: 'Nickname already in use' });
      }
      return res.status(500).json({
        message: 'Error updating user',
        error: (error as Error).message,
      });
    }
  }

  async changePassword(req: Request, res: Response): Promise<Response> {
    try {
      const userId = Number(req.params.id);
      const { oldPassword, newPassword } = req.body;

      if (!oldPassword || !newPassword) {
        return res
          .status(400)
          .json({ message: 'Both old and new passwords are required' });
      }

      // Chama o serviço para alterar a senha
      const user = await this.userService.changePassword(
        userId,
        oldPassword,
        newPassword
      );

      if (!user) {
        return res
          .status(401)
          .json({ message: 'Old password is incorrect or user not found' });
      }

      return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      return res.status(500).json({
        message: 'Error changing password',
        error: (error as Error).message,
      });
    }
  }

  // Método para atualizar os pontos do usuário
  async updateUserPoints(req: Request, res: Response): Promise<Response> {
    try {
      const userId = Number(req.params.id);
      const { allPoints, currentPoints } = req.body;

      // Validação simples para garantir que os pontos estão presentes
      if (allPoints === undefined || currentPoints === undefined) {
        return res.status(400).json({
          message: 'Missing required fields: allPoints and currentPoints',
        });
      }

      // Chama o serviço para atualizar os pontos do usuário
      const updatedUser = await this.userService.updatePoints(
        userId,
        allPoints,
        currentPoints
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.json({
        message: 'User points updated successfully',
        updatedUser,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error updating user points',
        error: (error as Error).message,
      });
    }
  }

  // DELETE: Desativar usuário (troca `active` para false)
  async deactivateUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId = Number(req.params.id);
      const deactivatedUser = await this.userService.deactivateUser(userId);

      if (!deactivatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.json({
        message: 'User deactivated successfully',
        deactivatedUser,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error deactivating user',
        error: (error as Error).message,
      });
    }
  }

  async getUsersByPoints(_req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.userService.getUsersByPoints();
      console.log(users);
      if (users.length === 0) {
        return res.status(404).json({ message: 'No users with points found' });
      }

      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({
        message: 'Error fetching users by points',
      });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId = Number(req.params.id);
      const deletedUser = await this.userService.deleteUser(userId);

      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.json({ message: 'User deleted successfully' });
    } catch (error) {
      return res.status(500).json({
        message: 'Error deleting user',
        error: (error as Error).message,
      });
    }
  }
}
