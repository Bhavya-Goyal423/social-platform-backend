import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(
      password,
      +process.env.SALT_ROUNDS
    );
    return { success: true, pass: hashedPassword };
  } catch (error) {
    return { success: false, error };
  }
};
