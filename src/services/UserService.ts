import { User } from '../entities/User';
import { AppDataSource } from '../config/database';
import { MoreThan, Repository } from 'typeorm';
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

function keyHash(key: string, salt?: string): string {
  if (!salt) {
    salt = randomBytes(16).toString('hex');
  }
  const hashKey = scryptSync(key, salt, 64).toString('hex');
  return salt + hashKey;
}

function comparePasswords(
  storedPassword: string,
  suppliedPassword: string
): boolean {
  const salt = storedPassword.slice(0, 32);
  const hash = storedPassword.slice(32);
  const hashedSuppliedPassword = keyHash(suppliedPassword, salt).slice(32);

  return timingSafeEqual(
    Buffer.from(hash, 'hex'),
    Buffer.from(hashedSuppliedPassword, 'hex')
  );
}

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  // Criação de novo usuário
  async createUser(
    fullname: string,
    nickname: string,
    email: string,
    birthdate: Date,
    password: string,
    profile_picture: string
  ): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: [{ email }, { nickname }],
    });

    if (existingUser) {
      throw new Error('Email or nickname already in use');
    }

    const hashedPassword = keyHash(password);
    const user = this.userRepository.create({
      fullname,
      nickname,
      email,
      birthdate,
      password: hashedPassword,
      profile_picture,
      active: true,
      all_points: 0,
      current_points: 0,
    });

    return this.userRepository.save(user);
  }

  // Login de usuário
  async loginUser(nickname: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { nickname } });

    if (!user || !comparePasswords(user.password, password)) {
      return null;
    }

    return user;
  }

  // Buscar usuário por ID
  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id: Number(id) });
  }

  // Atualizar dados do usuário
  async updateUser(id: number, userData: Partial<User>): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id: Number(id) });

    if (!user) return null;

    Object.assign(user, userData);
    return this.userRepository.save(user);
  }

  // Desativar usuário (trocar active para false)
  async deactivateUser(id: number): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id: Number(id) });

    if (!user) return null;

    user.active = false;
    return this.userRepository.save(user);
  }

  // Dentro do UserService
  async getUsersByPoints(): Promise<User[]> {
    return this.userRepository.find({
      where: {
        all_points: MoreThan(0),
      },
      order: {
        all_points: 'DESC',
      },
    });
  }
}
