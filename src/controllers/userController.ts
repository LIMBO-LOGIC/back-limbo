// src/controllers/userController.ts
import { Request, Response } from 'express';
import { UserService } from '../services/userService';

function parseDate(dateString: string): Date {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day); // Mês começa do zero
}

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async register(req: Request, res: Response): Promise<Response> {
    try {
      console.log('req.body:', req.body);
      const {
        fullname = '',
        nickname = '',
        email = '',
        birthdate = '',
        password = '',
      } = req.body;

      // Valida os dados recebidos
      if (!fullname || !nickname || !email || !birthdate || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const birthdateFormatted = parseDate(birthdate);

      const user = await this.userService.createUser(
        fullname,
        nickname,
        email,
        birthdateFormatted,
        password
      );

      return res
        .status(201)
        .json({ message: 'Usúario criado com sucesso!', user });
    } catch (error) {
      console.error('Error registering user:', (error as Error).message);
      return res.status(500).json({
        message: 'Erro ao registrar usuário!',
        error: (error as Error).message,
      });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { nickname = '', password = '' } = req.body;

      if (!nickname || !password) {
        return res
          .status(400)
          .json({ error: 'Nickname and password are required' });
      }

      const user = await this.userService.loginUser(nickname, password);

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      return res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      console.error('Error logging in:', (error as Error).message);
      return res
        .status(500)
        .json({ message: 'Login failed', error: (error as Error).message });
    }
  }

  getUser = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const user = await this.userService.getUserById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Error fetching user by id' });
    }
  };
}
