import { User } from '../entities/User';
import { AppDataSource } from '../config/database';

export const getUserById = async (id: string): Promise<User | null> => {
  const userRepository = AppDataSource.getRepository(User); // Novo padrão
  const user = await userRepository.findOneBy({ id });
  return user;
};
