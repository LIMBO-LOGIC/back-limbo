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
    type_user: string,
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
      type_user,
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

  async getAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Buscar usuário por ID
  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id: Number(id) });
  }

  // Atualizar dados do usuário
  async updateUser(id: number, userData: Partial<User>): Promise<User | null> {
    // Verifica se o usuário existe
    const user = await this.userRepository.findOneBy({ id: Number(id) });
    if (!user) return null;

    // Verifica se o nickname já está em uso por outro usuário
    if (userData.nickname) {
      const existingUserWithSameNickname = await this.userRepository.findOne({
        where: { nickname: userData.nickname },
      });

      if (
        existingUserWithSameNickname &&
        existingUserWithSameNickname.id !== id
      ) {
        throw new Error('Nickname already in use');
      }
    }

    if (
      userData.profile_picture != null &&
      userData.profile_picture != '' &&
      userData.profile_picture != undefined
    ) {
      // Atualiza somente fullname, nickname e birthdate
      const { fullname, nickname, birthdate, profile_picture } = userData;
      Object.assign(user, { fullname, nickname, birthdate, profile_picture });
    } else {
      // Atualiza somente fullname, nickname e birthdate
      const { fullname, nickname, birthdate } = userData;
      Object.assign(user, { fullname, nickname, birthdate });
    }

    return this.userRepository.save(user);
  }

  async saveUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async changePassword(
    id: number,
    oldPassword: string,
    newPassword: string
  ): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id: Number(id) });

    if (!user) {
      return null; // Usuário não encontrado
    }

    // Verifica se a senha antiga está correta
    const isOldPasswordCorrect = comparePasswords(user.password, oldPassword);
    if (!isOldPasswordCorrect) {
      return null; // Senha antiga incorreta
    }

    // Gera uma nova senha criptografada
    const hashedNewPassword = keyHash(newPassword);

    // Atualiza a senha do usuário
    user.password = hashedNewPassword;

    return this.userRepository.save(user);
  }

  async updatePoints(
    id: number,
    allPoints: number,
    currentPoints: number
  ): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      return null;
    }

    user.all_points = allPoints;
    user.current_points = currentPoints;

    return this.userRepository.save(user);
  }

  // Desativar usuário (trocar active para false)
  async deactivateUser(id: number): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id: Number(id) });

    if (!user) return null;

    user.active = false;
    return this.userRepository.save(user);
  }

  async getUsersByPoints(): Promise<User[]> {
    const users = await this.userRepository.find({
      where: {
        all_points: MoreThan(0),
      },
      order: {
        all_points: 'DESC',
      },
    });
    console.log(users);
    return users;
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: Number(id) });

    if (!user) {
      throw new Error('User not found');
    }

    return this.userRepository.remove(user);
  }
}
