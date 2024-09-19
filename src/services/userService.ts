import { User } from '../entities/User';
import { AppDataSource } from '../config/database';
import { Repository } from 'typeorm';
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

function keyHash(key: string, salt?: string): string {
  if (!salt) {
    salt = randomBytes(16).toString('hex');
  }
  const hashKey = scryptSync(key, salt, 64).toString('hex');
  return salt + hashKey; // Retorna o salt concatenado com o hash
}

function comparePasswords(
  storedPassword: string,
  suppliedPassword: string
): boolean {
  const salt = storedPassword.slice(0, 32); // Extrai o salt da senha armazenada
  const hash = storedPassword.slice(32); // Extrai o hash da senha armazenada
  const hashedSuppliedPassword = keyHash(suppliedPassword, salt).slice(32); // Hasheia a senha fornecida com o salt

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

  async createUser(
    fullname: string,
    nickname: string,
    email: string,
    birthdate: Date,
    password: string
  ): Promise<User> {
    try {
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
        active: true,
        all_points: 0,
        current_points: 0,
      });

      return this.userRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  async loginUser(nickname: string, password: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({ where: { nickname } });

      if (!user) {
        throw new Error('User not found');
      }

      if (!comparePasswords(user.password, password)) {
        throw new Error('Invalid password');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  getUserById = async (id: string): Promise<User | null> => {
    const user = await this.userRepository.findOneBy({ id: Number(id) });
    return user;
  };
}
