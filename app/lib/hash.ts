import bcrypt from 'bcrypt'

/**
 * Hash a password using bcrypt
 * Cost factor: 10 (good balance of security and performance)
 * Higher number = more secure but slower
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

/**
 * Verify a password against a bcrypt hash
 * Returns true if password matches, false otherwise
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}
